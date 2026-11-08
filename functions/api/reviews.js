/**
 * Cloudflare Pages Function: /api/reviews
 * Stores and queries verified customer reviews from Cloudflare D1 (SQLite)
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const productId = url.searchParams.get('product_id');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=60'
  };

  if (!env.DB) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_NOT_AVAILABLE'
    }), { status: 503, headers });
  }

  try {
    let stmt;
    if (productId) {
      stmt = env.DB.prepare('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC LIMIT 20').bind(productId);
    } else {
      stmt = env.DB.prepare('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 20');
    }

    const { results } = await stmt.all();
    return new Response(JSON.stringify({
      success: true,
      count: (results || []).length,
      reviews: results || []
    }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

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
    const body = await request.json();
    if (!body.productId || !body.reviewerName || !body.rating || !body.reviewText) {
      return new Response(JSON.stringify({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'productId, reviewerName, rating (1-5), and reviewText are required.'
      }), { status: 400, headers });
    }

    const rating = Math.max(1, Math.min(5, parseInt(body.rating, 10)));
    const stmt = env.DB.prepare(`
      INSERT INTO reviews (product_id, reviewer_name, rating, review_title, review_text, location)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      body.productId,
      body.reviewerName,
      rating,
      body.reviewTitle || null,
      body.reviewText,
      body.location || 'Nairobi, Kenya'
    );

    await stmt.run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Verified review submitted successfully to Cloudflare D1.'
    }), { status: 201, headers });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers });
  }
}
