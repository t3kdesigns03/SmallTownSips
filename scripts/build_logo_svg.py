"""Build website-ready SVG logo from source PNG."""
from __future__ import annotations

import base64
import io
import os
from collections import deque

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_CANDIDATES = [
    os.path.join(
        os.path.expanduser("~"),
        ".cursor",
        "projects",
        "c-Users-breil-Claude-Projects-SmallTownSips",
        "assets",
        "c__Users_breil_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_logov2-0d89d763-7eab-490e-b0a3-52874b48812e.png",
    ),
    os.path.join(ROOT, "logov2.jpg"),
    os.path.join(ROOT, "Logov1.jpg"),
]
SRC = next(path for path in SRC_CANDIDATES if os.path.exists(path))


def load_logo() -> Image.Image:
    img = Image.open(SRC).convert("RGBA")
    arr = np.array(img)
    rgb = arr[:, :, :3].astype(int)
    white = (rgb[:, :, 0] > 248) & (rgb[:, :, 1] > 248) & (rgb[:, :, 2] > 248)

    h, w = arr.shape[:2]
    visited = np.zeros((h, w), dtype=bool)
    for seed in ((0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1)):
        queue = deque([seed])
        while queue:
            y, x = queue.popleft()
            if y < 0 or y >= h or x < 0 or x >= w or visited[y, x]:
                continue
            visited[y, x] = True
            if white[y, x]:
                arr[y, x, 3] = 0
                queue.extend(((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)))

    result = Image.fromarray(arr)
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)
    return result


def save_optimized_png(img: Image.Image, path: str, max_width: int = 800) -> Image.Image:
    if img.width > max_width:
        ratio = max_width / img.width
        new_size = (max_width, max(1, round(img.height * ratio)))
        img = img.resize(new_size, Image.Resampling.LANCZOS)
    img.save(path, format="PNG", optimize=True, compress_level=9)
    return img


def build_embedded_logo(img: Image.Image, inline: bool = False) -> str:
    w, h = img.size
    if inline:
        buf = io.BytesIO()
        img.save(buf, format="PNG", optimize=True, compress_level=9)
        image_tag = (
            f'<image width="{w}" height="{h}" preserveAspectRatio="xMidYMid meet"\n'
            f'         href="data:image/png;base64,{base64.b64encode(buf.getvalue()).decode("ascii")}"/>'
        )
    else:
        image_tag = (
            f'<image width="{w}" height="{h}" preserveAspectRatio="xMidYMid meet"\n'
            f'         href="logo.png"/>'
        )

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 {w} {h}"
     width="{w}" height="{h}"
     role="img"
     aria-labelledby="logoTitle logoDesc">
  <title id="logoTitle">Small Town Sips</title>
  <desc id="logoDesc">Small Town Sips logo featuring the state of Iowa with colorful grid, drink cup, and Truro Iowa text</desc>
  {image_tag}
</svg>
"""


def build_icon_logo(img: Image.Image, inline: bool = False) -> str:
    """State-only logo without the bottom flower border."""
    w, h = img.size
    crop_h = int(h * 0.93)
    cropped = img.crop((0, 0, w, crop_h))
    cw, ch = cropped.size
    png_name = "logo-icon.png"
    icon_png_path = os.path.join(ROOT, png_name)
    cropped.save(icon_png_path, format="PNG", optimize=True, compress_level=9)

    if inline:
        buf = io.BytesIO()
        cropped.save(buf, format="PNG", optimize=True, compress_level=9)
        image_tag = (
            f'<image width="{cw}" height="{ch}" preserveAspectRatio="xMidYMid meet"\n'
            f'         href="data:image/png;base64,{base64.b64encode(buf.getvalue()).decode("ascii")}"/>'
        )
    else:
        image_tag = (
            f'<image width="{cw}" height="{ch}" preserveAspectRatio="xMidYMid meet"\n'
            f'         href="{png_name}"/>'
        )

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 {cw} {ch}"
     width="{cw}" height="{ch}"
     role="img"
     aria-labelledby="logoTitle logoDesc">
  <title id="logoTitle">Small Town Sips</title>
  <desc id="logoDesc">Small Town Sips Iowa state logo without floral border</desc>
  {image_tag}
</svg>
"""


def main() -> None:
    img = load_logo()
    png_path = os.path.join(ROOT, "logo.png")
    img = save_optimized_png(img, png_path)

    embedded_path = os.path.join(ROOT, "logo.svg")
    with open(embedded_path, "w", encoding="utf-8") as f:
        f.write(build_embedded_logo(img, inline=False))

    inline_path = os.path.join(ROOT, "logo-inline.svg")
    with open(inline_path, "w", encoding="utf-8") as f:
        f.write(build_embedded_logo(img, inline=True))

    icon_path = os.path.join(ROOT, "logo-icon.svg")
    with open(icon_path, "w", encoding="utf-8") as f:
        f.write(build_icon_logo(img, inline=False))

    print(f"Source: {SRC}")
    print(f"PNG: {os.path.getsize(png_path):,} bytes")
    print(f"SVG: {os.path.getsize(embedded_path):,} bytes")
    print(f"SVG inline: {os.path.getsize(inline_path):,} bytes")
    print(f"SVG icon: {os.path.getsize(icon_path):,} bytes")
    print(f"Image size: {img.size}")


if __name__ == "__main__":
    main()
