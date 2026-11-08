/**
 * Cloudflare Pages Function: /api/orders
 * Stores and retrieves orders from Cloudflare D1 (SQLite)
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (!env.DB) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_NOT_AVAILABLE',
      message: 'Cloudflare D1 SQLite database binding env.DB not available.'
    }), { status: 503, headers });
  }

  try {
    const body = await request.json();

    // Required field validation
    if (!body.customerName || !body.customerPhone || !body.items || !body.totalKES) {
      return new Response(JSON.stringify({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'customerName, customerPhone, items, and totalKES are required.'
      }), { status: 400, headers });
    }

    const orderId = body.orderId || `ORD-NAB-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsJson = typeof body.items === 'string' ? body.items : JSON.stringify(body.items);

    const stmt = env.DB.prepare(`
      INSERT INTO orders (
        id, customer_name, customer_phone, customer_email,
        delivery_region, delivery_address, items,
        subtotal_kes, delivery_fee_kes, total_kes, currency,
        payment_method, payment_status, payment_ref,
        fulfillment_status, is_discreet_packaging, notes
      ) VALUES (
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?
      )
    `).bind(
      orderId,
      body.customerName,
      body.customerPhone,
      body.customerEmail || null,
      body.deliveryRegion || 'Nairobi Metro',
      body.deliveryAddress || 'Doorstep Delivery',
      itemsJson,
      body.subtotalKES || body.totalKES,
      body.deliveryFeeKES || 0,
      body.totalKES,
      body.currency || 'KES',
      body.paymentMethod || 'paystack_mpesa',
      body.paymentStatus || 'pending',
      body.paymentRef || null,
      'dispatched_plain_box',
      body.isDiscreetPackaging !== false ? 1 : 0,
      body.notes || null
    );

    await stmt.run();

    return new Response(JSON.stringify({
      success: true,
      orderId,
      totalKES: body.totalKES,
      currency: body.currency || 'KES',
      message: 'Order recorded in Cloudflare D1 SQLite database with 100% discreet packaging guarantee.',
      discreetDelivery: true
    }), { status: 201, headers });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_INSERT_ERROR',
      message: err.message
    }), { status: 500, headers });
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const phone = url.searchParams.get('phone');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (!env.DB) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_NOT_AVAILABLE'
    }), { status: 503, headers });
  }

  try {
    if (id) {
      const order = await env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first();
      if (!order) {
        return new Response(JSON.stringify({ success: false, error: 'NOT_FOUND' }), { status: 404, headers });
      }
      return new Response(JSON.stringify({ success: true, order: formatOrder(order) }), { status: 200, headers });
    }

    if (phone) {
      const { results } = await env.DB.prepare('SELECT * FROM orders WHERE customer_phone = ? ORDER BY created_at DESC LIMIT 10').bind(phone).all();
      return new Response(JSON.stringify({ success: true, orders: (results || []).map(formatOrder) }), { status: 200, headers });
    }

    return new Response(JSON.stringify({ success: false, message: 'Please provide ?id= or ?phone=' }), { status: 400, headers });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers });
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

function formatOrder(row) {
  let items = [];
  try { items = JSON.parse(row.items); } catch (e) { items = []; }
  return {
    orderId: row.id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    deliveryRegion: row.delivery_region,
    deliveryAddress: row.delivery_address,
    items,
    totalKES: row.total_kes,
    paymentStatus: row.payment_status,
    fulfillmentStatus: row.fulfillment_status,
    createdAt: row.created_at
  };
}

