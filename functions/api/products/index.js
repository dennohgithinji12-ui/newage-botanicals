/**
 * Cloudflare Pages Function: GET /api/products
 * Queries Cloudflare D1 (SQLite) at the Edge
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const category = url.searchParams.get('category');
  const illness = url.searchParams.get('illness');
  const query = url.searchParams.get('q');
  const id = url.searchParams.get('id');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 200);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);

  // Headers with CORS and Edge Caching
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'public, max-age=60, s-maxage=300'
  };

  if (!env.DB) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_BINDING_NOT_CONFIGURED',
      message: 'Cloudflare D1 SQLite database binding env.DB not available.'
    }), { status: 503, headers });
  }

  try {
    let sql = 'SELECT * FROM products WHERE in_stock = 1';
    const params = [];

    if (id) {
      sql += ' AND id = ?';
      params.push(id);
    }
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (illness) {
      sql += ' AND illnesses LIKE ?';
      params.push(`%${illness}%`);
    }
    if (query) {
      sql += ' AND (name LIKE ? OR botanical_name LIKE ? OR description LIKE ? OR herbs LIKE ?)';
      const qWildcard = `%${query}%`;
      params.push(qWildcard, qWildcard, qWildcard, qWildcard);
    }

    sql += ' ORDER BY price_kes DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const stmt = env.DB.prepare(sql).bind(...params);
    const { results } = await stmt.all();

    // Parse JSON string columns back to arrays
    const formatted = (results || []).map(row => ({
      id: row.id,
      name: row.name,
      botanicalName: row.botanical_name,
      category: row.category,
      categoryName: row.category_name,
      priceKES: row.price_kes,
      rating: row.rating,
      reviewCount: row.review_count,
      tag: row.tag,
      image: row.image,
      images: safeJsonParse(row.images, [row.image]),
      herbs: safeJsonParse(row.herbs, []),
      illnesses: safeJsonParse(row.illnesses, []),
      rituals: safeJsonParse(row.rituals, []),
      benefits: safeJsonParse(row.benefits, []),
      ingredients: safeJsonParse(row.ingredients, []),
      ritualGuide: row.ritual_guide,
      whatItDoes: row.what_it_does,
      description: row.description,
      inStock: Boolean(row.in_stock)
    }));

    return new Response(JSON.stringify({
      success: true,
      count: formatted.length,
      limit,
      offset,
      products: formatted
    }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_QUERY_ERROR',
      message: err.message
    }), { status: 500, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

function safeJsonParse(str, fallback) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}

