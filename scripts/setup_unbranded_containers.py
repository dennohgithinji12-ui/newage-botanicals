import os
import sys
import json
import urllib.request
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
CONTAINERS_DIR = BASE_DIR / 'assets' / 'images' / 'containers'
PRODUCTS_DIR = BASE_DIR / 'assets' / 'images' / 'products'
PROMPTS_DB = BASE_DIR / 'visuals' / 'nanobanana' / 'prompts-database.json'
PRODUCTS_JS = BASE_DIR / 'js' / 'data' / 'products.js'

CONTAINERS_DIR.mkdir(parents=True, exist_ok=True)

# Container sources from Unsplash / Wikimedia (high-res, public/royalty-free unbranded container photography)
CONTAINER_SOURCES = {
    'heavy apothecary dropper bottle': [
        'https://images.unsplash.com/photo-1781344116880-029945a42b75?auto=format&fit=crop&w=1000&h=1000&q=85',
        'https://images.unsplash.com/photo-1550159793-baf23ed9b337?auto=format&fit=crop&w=1000&h=1000&q=85'
    ],
    'matte stand-up barrier pouch': [
        'https://upload.wikimedia.org/wikipedia/commons/9/96/Bolsa_Doypack_de_Papel_Kraft.jpg'
    ],
    'matte cylindrical tea canister': [
        'https://images.unsplash.com/photo-1755685344391-a9a3a1784fb4?auto=format&fit=crop&w=1000&h=1000&q=85'
    ],
    'heavyweight amber glass cosmetic jar': [
        'https://images.unsplash.com/photo-1550160770-e3ef1e867e02?auto=format&fit=crop&w=1000&h=1000&q=85'
    ],
    'octagonal ceremonial casket tin': [
        'https://upload.wikimedia.org/wikipedia/commons/2/2d/Octagonal_incense_box_MET_DT209139.jpg'
    ],
    'amber glass fine-mist flacon': [
        'https://upload.wikimedia.org/wikipedia/commons/f/fd/A_close-up_artistic_shot_of_a_spray_bottle_featuring_condensation_droplets%2C_highlighting_its_texture_and_fine_details._02.jpg'
    ],
    'frosted amber rollerball vial': [
        'https://images.unsplash.com/photo-1550159793-baf23ed9b337?auto=format&fit=crop&w=1000&h=1000&q=85'
    ]
}

def download_and_crop(url, out_path):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    req = urllib.request.Request(url, headers=headers)
    temp_path = out_path.with_suffix('.tmp')
    with urllib.request.urlopen(req, timeout=20) as resp, open(temp_path, 'wb') as f:
        f.write(resp.read())
    
    # Open with PIL, crop to square 1000x1000, save optimized JPG
    with Image.open(temp_path) as im:
        im = im.convert('RGB')
        w, h = im.size
        min_dim = min(w, h)
        left = (w - min_dim) // 2
        top = (h - min_dim) // 2
        im_cropped = im.crop((left, top, left + min_dim, top + min_dim))
        im_resized = im_cropped.resize((1000, 1000), Image.Resampling.LANCZOS)
        im_resized.save(out_path, 'JPEG', quality=90, optimize=True)
    
    if temp_path.exists():
        temp_path.unlink()
    print(f"  [OK] Saved {out_path.name} ({out_path.stat().st_size} bytes)")

def setup_containers():
    print("=" * 80)
    print("   DOWNLOADING HIGH-RESOLUTION UNBRANDED CONTAINERS FROM THE WEB")
    print("=" * 80)
    
    for c_type, urls in CONTAINER_SOURCES.items():
        slug = c_type.replace(' ', '-')
        target = CONTAINERS_DIR / f"{slug}.jpg"
        if not target.exists():
            print(f"Fetching container for: {c_type}...")
            success = False
            for url in urls:
                try:
                    download_and_crop(url, target)
                    success = True
                    break
                except Exception as e:
                    print(f"  [WARN] Failed {url}: {e}")
            if not success:
                print(f"  [FAIL] Could not download {c_type}")

def apply_to_products():
    print("\n" + "=" * 80)
    print("   APPLYING UNBRANDED CONTAINERS TO PRODUCTS WITHOUT STUDIO PHOTOS")
    print("=" * 80)
    
    with open(PROMPTS_DB, 'r', encoding='utf-8') as f:
        prompts = json.load(f)
    
    p_by_id = {item['productId']: item for item in prompts}
    
    applied_count = 0
    preserved_count = 0
    
    for item in prompts:
        pid = item['productId']
        c_type = item.get('packagingType', 'heavy apothecary dropper bottle')
        slug = c_type.replace(' ', '-')
        container_file = CONTAINERS_DIR / f"{slug}.jpg"
        
        # If no specific container downloaded, fallback to dropper
        if not container_file.exists():
            container_file = CONTAINERS_DIR / 'heavy-apothecary-dropper-bottle.jpg'
            
        custom_photo = PRODUCTS_DIR / f"{pid}-photo.jpg"
        product_jpg = PRODUCTS_DIR / f"{pid}.jpg"
        
        if custom_photo.exists():
            preserved_count += 1
        else:
            # Copy container photo to product_jpg
            if container_file.exists():
                with open(container_file, 'rb') as cf, open(product_jpg, 'wb') as pf:
                    pf.write(cf.read())
                applied_count += 1
                
    print(f"\n[SUMMARY] Preserved {preserved_count} custom studio photographs.")
    print(f"[SUMMARY] Replaced {applied_count} placeholder products with real unbranded containers.")

if __name__ == '__main__':
    setup_containers()
    apply_to_products()
