"""
Convert all product packaging images to high-quality JPG files,
clean up product.js catalog to point exclusively to JPG images,
and completely eliminate all secondary flat herb/cover drawings.
"""

import os
import re
import json
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_IMG_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'products')
PRODUCTS_JS_PATH = os.path.join(BASE_DIR, 'js', 'data', 'products.js')

print("=" * 80)
print("   NEWAGE BOTANICALS — MASTER JPG PRODUCTION & DETAIL PURGE PIPELINE")
print("=" * 80)

# 1. Delete all shitty cover/herb pics (-detail.svg, -detail.png)
detail_deleted = 0
for f in os.listdir(PRODUCTS_IMG_DIR):
    if '-detail.' in f:
        full_path = os.path.join(PRODUCTS_IMG_DIR, f)
        try:
            os.remove(full_path)
            detail_deleted += 1
        except Exception as e:
            print(f"Error removing {f}: {e}")

print(f"\n[OK] Removed {detail_deleted} flat anatomical cover/herb diagrams.")

# 2. Read products from products.js
with open(PRODUCTS_JS_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const PRODUCTS_DATA = (\[.*?\]);', content, re.DOTALL)
if not match:
    print("Failed to find PRODUCTS_DATA in products.js")
    exit(1)

products = json.loads(match.group(1))
print(f"Loaded {len(products)} products from catalog.")

# 3. Convert all packaging PNGs to high-quality JPGs
jpg_created = 0
for p in products:
    pid = p['id']
    
    # Check if a custom hero studio photo exists
    hero_photo = os.path.join(PRODUCTS_IMG_DIR, f"{pid}-photo.jpg")
    target_jpg = os.path.join(PRODUCTS_IMG_DIR, f"{pid}.jpg")
    pack_png = os.path.join(PRODUCTS_IMG_DIR, f"{pid}-packaging.png")
    
    if os.path.exists(hero_photo):
        # Already has luxury studio photo (like Marula Glow Elixir)
        p['image'] = f"assets/images/products/{pid}-photo.jpg"
        # Also ensure {pid}.jpg exists
        if not os.path.exists(target_jpg):
            im = Image.open(hero_photo)
            im.save(target_jpg, "JPEG", quality=95, optimize=True)
            jpg_created += 1
    elif os.path.exists(pack_png):
        im = Image.open(pack_png).convert('RGB')
        im.save(target_jpg, "JPEG", quality=95, optimize=True)
        p['image'] = f"assets/images/products/{pid}.jpg"
        jpg_created += 1
    else:
        p['image'] = f"assets/images/products/{pid}.jpg"
    
    # Clean out secondary and images array
    if 'imageSecondary' in p:
        del p['imageSecondary']
    p['images'] = [p['image']]

print(f"[OK] Created {jpg_created} high-definition JPG packaging photographs.")

# 4. Save cleaned products.js
updated_js = f"""/**
 * NewAge Health Botanicals & Rituals - Structured Product Catalog
 * High-Efficacy Evidence-Backed African & Global Botanical Remedies
 * Zero-database, client-side catalog indexed by Category, Herb, Illness, and Ritual
 * Official Hotline: +254141270112 | Socials: @newagebotanicals
 */

const PRODUCTS_DATA = {json.dumps(products, indent=2, ensure_ascii=False)};

if (typeof window !== "undefined") {{
  window.PRODUCTS_DATA = PRODUCTS_DATA;
}}
if (typeof module !== "undefined" && module.exports) {{
  module.exports = PRODUCTS_DATA;
}}
"""

with open(PRODUCTS_JS_PATH, 'w', encoding='utf-8') as f:
    f.write(updated_js)

print(f"[OK] Updated {PRODUCTS_JS_PATH} — all products now reference high-res JPGs exclusively.")

# 5. Verify CSV export
csv_path = os.path.join(BASE_DIR, 'products.csv')
with open(csv_path, 'w', encoding='utf-8') as f:
    f.write('id,name,botanicalName,category,categoryName,priceKES,tag,inStock\n')
    for p in products:
        name = p['name'].replace('"', '""')
        bot = (p.get('botanicalName') or '').replace('"', '""')
        cat = p['category']
        cat_name = p['categoryName']
        price = p['priceKES']
        tag = p.get('tag', '').replace('"', '""')
        in_stock = 'true' if p.get('inStock', True) else 'false'
        f.write(f'"{p["id"]}","{name}","{bot}","{cat}","{cat_name}",{price},"{tag}",{in_stock}\n')

print(f"[OK] Synced {csv_path} with all {len(products)} products.")
print("\n[SUCCESS] Cover/herb diagrams completely eliminated. All products now use JPG image files.")
