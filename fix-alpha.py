#!/usr/bin/env python3
"""Fix fake transparency v4: vectorized numpy, fast."""
import os, glob
from PIL import Image
import numpy as np
from collections import deque

SRC = 'art/picture'
DST = 'art/picture_clean'
os.makedirs(DST, exist_ok=True)
SKIP = ('bg_',)

def is_gray_vec(arr, tol=20):
    """Vectorized: True where R≈G≈B (gray). Returns bool mask."""
    r, g, b = arr[:,:,0].astype(float), arr[:,:,1].astype(float), arr[:,:,2].astype(float)
    avg = (r + g + b) / 3.0
    gray = (np.abs(r-avg)<tol) & (np.abs(g-avg)<tol) & (np.abs(b-avg)<tol) & (avg>2) & (avg<258)
    return gray

def flood_from_edges(mask, h, w):
    """Remove True-pixels connected to image border via BFS."""
    q = deque()
    visited = np.zeros((h, w), dtype=bool)
    # Edge pixels
    edges = []
    for y in range(h):
        if mask[y,0]: edges.append((y,0))
        if mask[y,w-1]: edges.append((y,w-1))
    for x in range(1,w-1):
        if mask[0,x]: edges.append((0,x))
        if mask[h-1,x]: edges.append((h-1,x))
    for y,x in edges:
        if not visited[y,x]:
            q.append((y,x)); visited[y,x]=True
    while q:
        y,x = q.popleft()
        mask[y,x] = False
        for dy,dx in ((-1,0),(1,0),(0,-1),(0,1)):
            ny,nx = y+dy, x+dx
            if 0<=ny<h and 0<=nx<w and not visited[ny,nx] and mask[ny,nx]:
                visited[ny,nx]=True; q.append((ny,nx))

def process(fname):
    bn = os.path.basename(fname)
    if any(bn.startswith(p) for p in SKIP):
        Image.open(fname).convert('RGB').save(os.path.join(DST, bn))
        print(f"  [CPY] {bn}"); return

    img = Image.open(fname).convert('RGBA')
    arr = np.array(img); h,w = arr.shape[:2]
    if np.any(arr[:,:,3] < 255):
        img.save(os.path.join(DST, bn)); print(f"  [OK]  {bn} (alpha)"); return

    is_gray_orig = is_gray_vec(arr)
    gray_bg = is_gray_orig.copy()
    flood_from_edges(gray_bg, h, w)
    # gray_bg after flood: True = gray interior (keep), False = gray+edge or non-gray
    keep = (~is_gray_orig) | gray_bg  # colored pixels OR interior gray

    result = arr.copy()
    result[:,:,3] = (keep * 255).astype(np.uint8)
    result[~keep, :3] = 0
    Image.fromarray(result).save(os.path.join(DST, bn))
    pct = (1 - np.sum(keep)/(h*w)) * 100
    print(f"  [OK]  {bn} ({pct:.0f}%)")

files = sorted(glob.glob(os.path.join(SRC, '*.png')))
print(f"Processing {len(files)} files...")
for f in files:
    try: process(f)
    except Exception as e: print(f"  [ERR] {os.path.basename(f)}: {e}")
print("Done →", DST)
