/**
 * Cloudflare Pages Function: GET /api/batch
 * Verifies lot numbers and retrieves laboratory CoA assays from Cloudflare D1
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const lot = url.searchParams.get('lot');
  const productId = url.searchParams.get('product_id');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=300'
  };

  if (!env.DB) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_NOT_AVAILABLE',
      message: 'Cloudflare D1 SQLite database binding env.DB not available.'
    }), { status: 503, headers });
  }

  try {
    let stmt;
    if (lot) {
      stmt = env.DB.prepare('SELECT * FROM batch_records WHERE lot_number = ?').bind(lot);
    } else if (productId) {
      stmt = env.DB.prepare('SELECT * FROM batch_records WHERE product_id = ? ORDER BY test_date DESC LIMIT 1').bind(productId);
    } else {
      stmt = env.DB.prepare('SELECT * FROM batch_records ORDER BY test_date DESC LIMIT 10');
    }

    if (lot || productId) {
      const record = await stmt.first();
      if (!record) {
        return new Response(JSON.stringify({
          success: false,
          error: 'BATCH_NOT_FOUND',
          message: 'No analytical laboratory assay found for this lot.'
        }), { status: 404, headers });
      }
      return new Response(JSON.stringify({
        success: true,
        batch: formatBatch(record)
      }), { status: 200, headers });
    }

    const { results } = await stmt.all();
    return new Response(JSON.stringify({
      success: true,
      count: (results || []).length,
      batches: (results || []).map(formatBatch)
    }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'D1_QUERY_ERROR',
      message: err.message
    }), { status: 500, headers });
  }
}

function formatBatch(row) {
  return {
    lotNumber: row.lot_number,
    productId: row.product_id,
    productName: row.product_name,
    supplier: {
      id: row.supplier_id,
      name: row.supplier_name,
      origin: row.harvest_region
    },
    lab: {
      name: row.lab_name,
      reportNumber: row.lab_report_number,
      testDate: row.test_date
    },
    assays: {
      leadPpm: row.lead_ppm,
      arsenicPpm: row.arsenic_ppm,
      cadmiumPpm: row.cadmium_ppm,
      mercuryPpm: row.mercury_ppm,
      microbialStatus: row.microbial_status
    },
    qcDecision: row.qc_decision,
    cryptographicHash: row.cryptographic_hash,
    verifiedAt: row.created_at
  };
}
