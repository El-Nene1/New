# assets

`logo.webp` — the shop's own gold plaque artwork: the illustrated barber in
the ornamental frame, with the BARBER SHOP wordmark and the street address.

Re-encoded from the 1086 x 1448 PNG the client supplied (2.0 MB) down to
900 x 1200 WebP at ~103 KB, so the hero stays fast on mobile.

It appears twice in `index.html`:

- the hero, beside the headline
- the closing section, blown up as a faded watermark behind the call to action

Both are composited with `mix-blend-mode: screen`, which drops the artwork's
black ground so the gold floats directly on the page with no visible box.
That blend is fragile: any ancestor that opens a stacking context — a
`transform`, an `opacity` below 1, a `z-index` — cuts it off from the
background and the black rectangle comes back. `.hero-grid` deliberately
carries no `z-index` for this reason.

To replace the artwork, keep the black ground and a similar 3:4 portrait
ratio, then re-encode to WebP at roughly 900 px wide.
