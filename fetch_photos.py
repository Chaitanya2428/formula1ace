#!/usr/bin/env python3
"""Fetch photos for F1 drivers using Wikipedia pageimages API."""
import json
import urllib.request
import urllib.parse
import time
import os

def fetch_photos_batch(titles, batch_size=20):
    """Fetch pageimages for a batch of titles using the Wikipedia API."""
    results = {}
    for i in range(0, len(titles), batch_size):
        batch = titles[i:i+batch_size]
        # Build query with multiple titles
        titles_param = '|'.join(batch)
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(titles_param)}&prop=pageimages&format=json&pithumbsize=400&pilicense=any"
        
        req = urllib.request.Request(url, headers={
            'User-Agent': 'F1Site/1.0 (educational project; contact@example.com)'
        })
        
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                data = json.loads(response.read().decode('utf-8'))
            
            pages = data.get('query', {}).get('pages', {})
            for page_id, page_data in pages.items():
                title = page_data.get('title', '')
                if 'thumbnail' in page_data:
                    thumb = page_data['thumbnail']
                    results[title] = thumb.get('source', '')
                # Also get original if available
                if 'original' in page_data and title not in results:
                    results[title] = page_data['original'].get('source', '')
        except Exception as e:
            print(f"  Error fetching batch {i}: {e}")
        
        time.sleep(0.5)  # Be polite
    
    return results

def main():
    with open('/tmp/cc-agent/68733619/project/f1_drivers_raw.json', 'r', encoding='utf-8') as f:
        drivers = json.load(f)
    
    # Get unique wiki titles
    titles = [d['wiki_title'].replace('_', ' ') for d in drivers if d.get('wiki_title')]
    print(f"Fetching photos for {len(titles)} drivers...")
    
    # Fetch photos in batches
    photos = fetch_photos_batch(titles, batch_size=20)
    print(f"Got photos for {len(photos)} drivers")
    
    # Map photos back to drivers
    photo_count = 0
    for driver in drivers:
        title = driver['wiki_title'].replace('_', ' ')
        if title in photos:
            driver['photo'] = photos[title]
            photo_count += 1
    
    print(f"Assigned photos to {photo_count} drivers")
    
    # Save updated data
    with open('/tmp/cc-agent/68733619/project/f1_drivers_raw.json', 'w', encoding='utf-8') as f:
        json.dump(drivers, f, ensure_ascii=False, indent=2)
    
    # Show some examples
    for d in drivers[:5]:
        print(f"  {d['name']}: photo={d['photo']}")
    
    # Show some without photos
    no_photo = [d for d in drivers if not d['photo']]
    print(f"\nDrivers without photos: {len(no_photo)}")
    for d in no_photo[:10]:
        print(f"  {d['name']} ({d['wiki_title']})")

if __name__ == '__main__':
    main()
