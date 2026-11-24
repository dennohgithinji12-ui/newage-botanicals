/**
 * Cloudflare Pages Function: /api/verify-payment
 * Server-side Paystack transaction verification using env.PAYSTACK_SECRET_KEY
 * Updates order record in Cloudflare D1 (SQLite) upon verified settlement
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const reference = url.searchParams.get('reference');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (!reference) {
    return new Response(JSON.stringify({
      success: false,
      error: 'REFERENCE_REQUIRED',
      message: 'Payment reference query parameter is required (?reference=...)'
    }), { status: 400, headers });
  }

  const secretKey = env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return new Response(JSON.stringify({
      success: false,
      error: 'SECRET_NOT_CONFIGURED',
      message: 'PAYSTACK_SECRET_KEY environment variable is not configured on Cloudflare Pages.'
    }), { status: 503, headers });
  }

  try {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await paystackRes.json();

    if (!paystackRes.ok || !data.status) {
      return new Response(JSON.stringify({
        success: false,
        error: 'VERIFICATION_FAILED',
        message: data.message || 'Paystack verification unsuccessful'
      }), { status: 400, headers });
    }

    const tx = data.data;
    const isPaid = tx.status === 'success';

    // If D1 is available, update orders table
    if (env.DB && isPaid) {
      try {
        await env.DB.prepare(`
          UPDATE orders 
          SET payment_status = 'paid', 
              payment_ref = ?,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ? OR payment_ref = ?
        `).bind(tx.reference, tx.reference, tx.reference).run();
      } catch (dbErr) {
        console.warn('D1 payment status update note:', dbErr.message);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      verified: isPaid,
      status: tx.status,
      reference: tx.reference,
      amountKES: tx.currency === 'KES' ? tx.amount / 100 : tx.amount,
      currency: tx.currency,
      channel: tx.channel,
      paidAt: tx.paid_at,
      customer: {
        email: tx.customer?.email,
        phone: tx.customer?.phone
      }
    }), { status: 200, headers });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), { status: 500, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
