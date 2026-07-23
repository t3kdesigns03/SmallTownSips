import json

d = json.load(open('scripts/iowa.geojson'))
ring = d['geometry']['coordinates'][0]
if len(ring) > 300:
    ring = ring[::3]
if ring[0] != ring[-1]:
    ring.append(ring[0])

lons = [p[0] for p in ring]; lats = [p[1] for p in ring]
minlon, maxlon = min(lons), max(lons)
minlat, maxlat = min(lats), max(lats)

W, H, pad = 1000.0, 640.0, 8.0

def project(lon, lat):
    x = (lon - minlon) / (maxlon - minlon) * (W - 2*pad) + pad
    y = (maxlat - lat) / (maxlat - minlat) * (H - 2*pad) + pad
    return x, y

pts = [project(lon, lat) for lon, lat in ring]
path = "M " + " L ".join(f"{x:.1f},{y:.1f}" for x, y in pts) + " Z"

def inside(px, py, poly):
    n = len(poly); c = False; j = n-1
    for i in range(n):
        xi, yi = poly[i]; xj, yj = poly[j]
        if ((yi > py) != (yj > py)) and (px < (xj-xi)*(py-yi)/(yj-yi)+xi):
            c = not c
        j = i
    return c

palette = ["#FF5DA2","#FFC93C","#3EC7C2","#FF7A3D","#7C5CFF","#7BC043",
           "#FF4D6D","#37B6FF","#C86B4A","#8FA07C","#E0A84E","#F26B9A"]
cell = 50.0
tiles = []
y = pad; row = 0
while y < H - pad:
    x = pad; col = 0
    while x < W - pad:
        cx, cy = x + cell/2, y + cell/2
        if inside(cx, cy, pts):
            tiles.append({
                "x": round(x+1.5,1), "y": round(y+1.5,1),
                "w": round(cell-3,1), "h": round(cell-3,1),
                "c": palette[(row*3 + col*5) % len(palette)],
                "i": len(tiles), "wave": round(row + col, 0),
            })
        x += cell; col += 1
    y += cell; row += 1

tx, ty = project(-93.8483, 41.2044)
out = {"viewBox": f"0 0 {int(W)} {int(H)}", "path": path,
       "tiles": tiles, "truro": {"x": round(tx,1), "y": round(ty,1)},
       "palette": palette}
json.dump(out, open('scripts/iowa-mosaic.json','w'))
print("tiles:", len(tiles), "path chars:", len(path), "maxwave:", max(t["wave"] for t in tiles))
