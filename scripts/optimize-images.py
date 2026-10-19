"""Generate web derivatives from the untouched masters in assets-src/original.

Run with `npm run images` (Python 3 + Pillow). Outputs are committed so the build
never depends on Python. Masters are never modified, and every derivative is made
from a master rather than from a smaller version.
"""
import shutil
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / 'assets-src' / 'original'
public = root / 'public'
output = public / 'images'
output.mkdir(parents=True, exist_ok=True)
(public / 'brand').mkdir(exist_ok=True)


def variants(relative, name, widths, box=None, quality=78):
    with Image.open(source / relative) as master:
        image = master.convert('RGB')
        if box:
            image = image.crop(box)
        total = 0
        for width in widths:
            height = round(image.height * width / image.width)
            target = output / f'{name}-{width}.webp'
            image.resize((width, height), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=quality, method=6)
            total += target.stat().st_size
        print(f'{name}: {image.width}x{image.height} -> {widths}, {total // 1024} KB total')


# Heroes are served through <picture>, so a device downloads only one of them.
# The mobile portrait drops the top band of empty wall: on phones the headline
# sits above the photograph rather than over it.
variants('images/hero-desktop.webp', 'hero-desktop', [960, 1536], quality=80)
variants('images/hero-mobile.webp', 'hero-mobile', [480, 800], box=(0, 220, 1024, 1536), quality=80)

for scene in ['sales-training', 'executive-coaching', 'sales-strategy', 'performance-audit',
              'recruitment', 'launch-lab', 'programme-still-life']:
    variants(f'images/{scene}.webp', scene, [480, 960, 1440])

variants('images/growth-sculpture.webp', 'growth-sculpture', [480, 960])

# Programme covers are already compact 1000x1200 WebP; add a card-sized version.
for cover in ['foundational-selling', 'frontline-practitioner', 'sales-leadership', 'launch-lab']:
    variants(f'programmes/{cover}.webp', f'cover-{cover}', [500, 1000], quality=82)

for svg in ['logo-ink.svg', 'logo-ivory.svg', 'mark-vermilion.svg', 'step-pattern.svg']:
    shutil.copy(source / 'branding' / svg, public / 'brand' / svg)
shutil.copy(source / 'branding' / 'favicon.svg', public / 'favicon.svg')
shutil.copy(source / 'social' / 'social-preview-1200x630.jpg', public / 'og-image.jpg')
with Image.open(source / 'branding' / 'favicon-192.png') as icon:
    icon.convert('RGB').resize((180, 180), Image.Resampling.LANCZOS).save(public / 'apple-touch-icon.png')
print('brand files, favicon, og-image and apple-touch-icon written')
