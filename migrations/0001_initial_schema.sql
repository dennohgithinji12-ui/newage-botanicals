-- ============================================================================
-- NEWAGE HEALTH BOTANICALS & RITUALS
-- Cloudflare D1 (SQLite) Edge Database Schema
-- Migration: 0001_initial_schema.sql
-- ============================================================================

-- 1. PRODUCTS TABLE (168 Master Remedies)
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    botanical_name TEXT NOT NULL,
    category TEXT NOT NULL,
    category_name TEXT NOT NULL,
    price_kes INTEGER NOT NULL,
    rating REAL DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    tag TEXT,
    image TEXT NOT NULL,
    images TEXT,           -- JSON array string
    herbs TEXT,            -- JSON array string
    illnesses TEXT,        -- JSON array string
    rituals TEXT,          -- JSON array string
    benefits TEXT,         -- JSON array string
    ingredients TEXT,      -- JSON array string
    ritual_guide TEXT,
    what_it_does TEXT,
    description TEXT,
    in_stock INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_instock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price_kes);

-- 2. ORDERS TABLE (Frictionless 1-Click & Discreet Delivery)
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    delivery_region TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    items TEXT NOT NULL,         -- JSON array of ordered items
    subtotal_kes INTEGER NOT NULL,
    delivery_fee_kes INTEGER NOT NULL,
    total_kes INTEGER NOT NULL,
    currency TEXT DEFAULT 'KES',
    payment_method TEXT NOT NULL, -- 'paystack_mpesa', 'paystack_card', etc.
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    payment_ref TEXT,
    fulfillment_status TEXT DEFAULT 'dispatched_plain_box',
    is_discreet_packaging INTEGER DEFAULT 1,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

-- 3. BATCH RECORDS & CERTIFICATES OF ANALYSIS (CoA)
CREATE TABLE IF NOT EXISTS batch_records (
    lot_number TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    supplier_id TEXT,
    supplier_name TEXT,
    harvest_region TEXT,
    lab_name TEXT,
    lab_report_number TEXT,
    test_date TEXT,
    lead_ppm REAL,
    arsenic_ppm REAL,
    cadmium_ppm REAL,
    mercury_ppm REAL,
    microbial_status TEXT,
    qc_decision TEXT DEFAULT 'RELEASE_FOR_SALE',
    cryptographic_hash TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_batch_product ON batch_records(product_id);

-- 4. INQUIRIES & CONSULTATION LEADS (WhatsApp & AI Master Herbalist)
CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    phone TEXT NOT NULL,
    preferred_channel TEXT DEFAULT 'whatsapp',
    symptoms_or_condition TEXT,
    recommended_product_id TEXT,
    status TEXT DEFAULT 'open',
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_inquiries_phone ON inquiries(phone);

-- 5. VERIFIED BOTANICAL REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    reviewer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_title TEXT,
    review_text TEXT NOT NULL,
    verified_buyer INTEGER DEFAULT 1,
    location TEXT DEFAULT 'Nairobi, Kenya',
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
