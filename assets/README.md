# assets

Drop the shop's engraved lockup here as `logo.png` — the illustrated
barber in the oval frame, with the BARBER SHOP wordmark.

The hero picks it up automatically: `index.html` requests
`assets/logo.png`, and swaps to it the moment the file loads. Until
then it falls back to the drawn oval mark, so the page never breaks.

Notes:
- Portrait format, roughly 751 x 1284 (any similar tall ratio works).
- Keep the black background — the hero feathers the edges with a
  radial mask so the artwork melts into the page with no visible box.
- PNG or WebP both fine. Under ~400 KB keeps the hero fast on mobile.
