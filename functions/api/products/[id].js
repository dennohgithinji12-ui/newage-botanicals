/**
 * Cloudflare Pages Function: GET /api/products/:id
 * Fetches single remedy by slug/ID from Cloudflare D1 (SQLite)
 */

export async function onRequestGet(context) {
  const { params, env } = context;
  const productId = params.id;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=120, s-maxage=600'
  };

  if (!env.DB) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_NOT_AVAILABLE',
      message: 'Cloudflare D1 SQLite database binding env.DB not available.'
    }), { status: 503, headers });
  }

  try {
    const stmt = env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(productId);
    const row = await stmt.first();

    if (!row) {
      return new Response(JSON.stringify({
        success: false,
        error: 'NOT_FOUND',
        message: `Remedy with ID '${productId}' not found in D1 pharmacopoeia.`
      }), { status: 404, headers });
    }

    const product = {
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
    };

    return new Response(JSON.stringify({
      success: true,
      product
    }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_QUERY_ERROR',
      message: err.message
    }), { status: 500, headers });
  }
}

function safeJsonParse(str, fallback) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}

