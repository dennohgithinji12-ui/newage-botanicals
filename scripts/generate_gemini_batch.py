"""
NewAge Botanicals — Batch Photorealistic Gemini (Imagen 3 / NanoBanana) Generator

Generates authentic luxury commercial studio photography JPGs in batches of 10
using Google's official Gemini / Imagen 3 API.

Usage:
  python scripts/generate_gemini_batch.py --batch 1
  python scripts/generate_gemini_batch.py --start 0 --count 10
"""

import os
import sys
import json
import time
import argparse
from pathlib import Path

# Setup paths
BASE_DIR = Path(__file__).resolve().parent.parent
PROMPTS_FILE = BASE_DIR / 'visuals' / 'nanobanana' / 'prompts-database.json'
PRODUCTS_DIR = BASE_DIR / 'assets' / 'images' / 'products'
PRODUCTS_JS = BASE_DIR / 'js' / 'data' / 'products.js'

# Load .env if present
env_file = BASE_DIR / '.env'
if env_file.exists():
    with open(env_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ[k.strip()] = v.strip().strip('"').strip("'")

api_key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')

def get_client():
    if not api_key:
        print("\n[ERROR] GEMINI_API_KEY is not set.")
        print("Please set your Gemini API key in your .env file or environment:")
        print("  GEMINI_API_KEY=your_key_here")
        print("You can get a free key at: https://aistudio.google.com/app/apikey\n")
        sys.exit(1)
    
    try:
        from google import genai
        return genai.Client(api_key=api_key)
    except ImportError:
        print("[ERROR] google-genai library is not installed. Run: pip install google-genai")
        sys.exit(1)

def run_batch(start_idx, count):
    with open(PROMPTS_FILE, 'r', encoding='utf-8') as f:
        prompts = json.load(f)
    
    total = len(prompts)
    end_idx = min(start_idx + count, total)
    batch = prompts[start_idx:end_idx]
    
    print("=" * 80)
    print(f"   NEWAGE BOTANICALS — GEMINI BATCH GENERATOR (Items {start_idx + 1} to {end_idx} of {total})")
    print("=" * 80)
    
    client = get_client()
    PRODUCTS_DIR.mkdir(parents=True, exist_ok=True)
    
    success = 0
    for i, item in enumerate(batch):
        idx = start_idx + i + 1
        pid = item['productId']
        name = item['productName']
        prompt = item['prompt']
        out_jpg = PRODUCTS_DIR / f"{pid}.jpg"
        
        print(f"\n[{idx}/{total}] Generating studio JPG for: {name}")
        print(f"      Product ID: {pid}")
        
        try:
            # Try imagen-3.0-generate-002 via google-genai SDK
            result = client.models.generate_images(
                model='imagen-3.0-generate-002',
                prompt=prompt,
                config=dict(
                    number_of_images=1,
                    aspect_ratio='1:1',
                    output_mime_type='image/jpeg'
                )
            )
            
            if result.generated_images:
                img_bytes = result.generated_images[0].image.image_bytes
                with open(out_jpg, 'wb') as img_f:
                    img_f.write(img_bytes)
                print(f"      [OK] Saved {out_jpg.name} ({len(img_bytes)} bytes)")
                success += 1
            else:
                print("      [FAIL] No images returned in response.")
        except Exception as e:
            print(f"      [FAIL] Gemini API error: {e}")
        
        # Brief pause between requests to respect rate limits
        if i < len(batch) - 1:
            time.sleep(2)
            
    print(f"\n[SUMMARY] Successfully generated {success}/{len(batch)} studio JPG photographs.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--batch', type=int, default=1, help='Batch number (1-based, 10 items each)')
    parser.add_argument('--start', type=int, default=None, help='Zero-based start index')
    parser.add_argument('--count', type=int, default=10, help='Number of images to generate')
    args = parser.parse_args()
    
    if args.start is not None:
        start = args.start
    else:
        start = (args.batch - 1) * args.count
        
    run_batch(start, args.count)
