/**
 * Cloudflare Pages Function: GET /api/db-status
 * Health check & diagnostic inspector for Cloudflare D1 (SQLite)
 */

export async function onRequestGet(context) {
  const { env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (!env.DB) {
    return new Response(JSON.stringify({
      status: 'offline',
      database: 'Cloudflare D1 (SQLite)',
      error: 'D1_NOT_BOUND',
      message: 'Cloudflare D1 binding env.DB is not configured in this environment.'
    }), { status: 503, headers });
  }

  try {
    // 1. Check SQLite version
    const versionRow = await env.DB.prepare('SELECT sqlite_version() as version').first();

    // 2. Query table counts
    const productCountRow = await env.DB.prepare('SELECT COUNT(*) as count FROM products').first();
    const orderCountRow = await env.DB.prepare('SELECT COUNT(*) as count FROM orders').first();
    const batchCountRow = await env.DB.prepare('SELECT COUNT(*) as count FROM batch_records').first();
    const reviewCountRow = await env.DB.prepare('SELECT COUNT(*) as count FROM reviews').first();

    return new Response(JSON.stringify({
      status: 'healthy',
      database: 'Cloudflare D1',
      engine: 'SQLite at the Edge',
      sqliteVersion: versionRow?.version || 'unknown',
      tables: {
        products: productCountRow?.count || 0,
        orders: orderCountRow?.count || 0,
        batch_records: batchCountRow?.count || 0,
        reviews: reviewCountRow?.count || 0
      },
      timestamp: new Date().toISOString()
    }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({
      status: 'error',
      database: 'Cloudflare D1 (SQLite)',
      error: err.message
    }), { status: 500, headers });
  }
}
