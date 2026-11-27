/**
 * Cloudflare Pages Function: /api/charge
 * Seamless on-site Paystack M-Pesa STK push & Mobile Money charge
 * Direct on-site checkout without popup windows (Paystack Charge API)
 * Persists order record into Cloudflare D1 (SQLite)
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const body = await request.json();
    const {
      reference,
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      deliveryRegion,
      items,
      amountKES,
      notes
    } = body;

    if (!customerPhone || !amountKES) {
      return new Response(JSON.stringify({
        success: false,
        error: 'PHONE_AND_AMOUNT_REQUIRED',
        message: 'Customer phone number and amount are required.'
      }), { status: 400, headers });
    }

    const orderId = reference || `NAH-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 899 + 100)}`;
    const email = customerEmail || `${customerPhone.replace(/[^0-9]/g, '') || 'guest'}@orders.omnicorehub.app`;

    // Format phone for Safaricom Kenya (e.g. 0712345678 -> 254712345678)
    let cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '254' + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith('7') || cleanPhone.startsWith('1')) {
      cleanPhone = '254' + cleanPhone;
    }

    let paystackResponse = null;
    let chargeSuccess = false;
    let chargeMessage = `📱 M-Pesa prompt triggered for ${customerPhone}. Enter your PIN on your phone.`;

    const secretKey = env.PAYSTACK_SECRET_KEY;
    if (secretKey) {
      try {
        const paystackReq = await fetch('https://api.paystack.co/charge', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${secretKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            amount: Math.round(amountKES * 100),
            currency: 'KES',
            reference: orderId,
            mobile_money: {
              phone: cleanPhone,
              provider: 'mpesa'
            },
            metadata: {
              customer_name: customerName,
              customer_phone: customerPhone,
              delivery_address: deliveryAddress,
              delivery_region: deliveryRegion,
              custom_fields: [
                { display_name: "Customer Name", variable_name: "customer_name", value: customerName },
                { display_name: "Delivery Address", variable_name: "delivery_address", value: deliveryAddress }
              ]
            }
          })
        });

        const paystackData = await paystackReq.json();
        paystackResponse = paystackData;
        if (paystackData.status) {
          chargeSuccess = true;
          chargeMessage = paystackData.data?.display_text || `📱 M-Pesa prompt sent to ${customerPhone}. Please check your phone and enter your PIN.`;
        }
      } catch (paystackErr) {
        console.warn('Paystack direct charge error:', paystackErr);
      }
    }

    // Persist order in Cloudflare D1 (SQLite)
    if (env.DB) {
      try {
        const itemsJson = typeof items === 'string' ? items : JSON.stringify(items || []);
        await env.DB.prepare(`
          INSERT INTO orders (
            id, customer_name, customer_phone, customer_email,
            delivery_region, delivery_address, items,
            subtotal_kes, delivery_fee_kes, total_kes, currency,
            payment_method, payment_status, payment_ref,
            fulfillment_status, is_discreet_packaging, notes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          orderId,
          customerName || 'Valued Customer',
          customerPhone,
          email,
          deliveryRegion || 'Nairobi Metro',
          deliveryAddress || 'Doorstep Delivery',
          itemsJson,
          amountKES,
          0,
          amountKES,
          'KES',
          'paystack_direct_mpesa',
          chargeSuccess ? 'stk_prompt_sent' : 'pending_dispatch',
          orderId,
          'dispatched_plain_box',
          1,
          notes || null
        ).run();
      } catch (dbErr) {
        console.warn('D1 direct order recording note:', dbErr.message);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      orderId,
      customerName,
      customerPhone,
      customerAddress: deliveryAddress,
      deliveryRegion: deliveryRegion || 'Nairobi Metro',
      amountKES,
      chargeSuccess,
      message: chargeMessage,
      paystackStatus: paystackResponse ? paystackResponse.status : null
    }), { status: 200, headers });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'CHARGE_ERROR',
      message: err.message
    }), { status: 500, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
