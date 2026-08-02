# assets

## logo.webp

The shop's own gold plaque: the illustrated barber in the ornamental frame,
with the BARBER SHOP wordmark and the street address. Re-encoded from the
supplied 1086 x 1448 PNG (2.0 MB) to 900 x 1200 WebP at ~103 KB.

Used three times in `index.html` — the nav mark, the hero, and a faded
watermark behind the closing call to action.

All three composite with `mix-blend-mode: screen`, which drops the artwork's
black ground so the gold floats on the page with no visible box. That blend
is fragile: any ancestor opening a stacking context — a `transform`, an
`opacity` below 1, a `z-index` — cuts it off from the background and the
black rectangle returns. `.hero-grid` deliberately carries no `z-index` for
exactly this reason.

Note the wordmark inside the artwork reads BARBER SHOP. Changing it to
PROFESSIONAL BARBER SHOP means editing the source illustration; every piece
of text the site itself controls already says the full name.

## Photography

The shop's own photos, used as section atmosphere rather than as focal
images — originals are only 736–1200 px wide, so they are kept soft and dark
where that softness reads as depth of field instead of low resolution.

| file | section | subject |
|---|---|---|
| `bg-gold-shears.webp` | Servicios | gold engraved shears and gold-ringed clippers |
| `bg-tools.webp` | Visítanos | Magic Clip cordless, shears, the station |
| `bg-neon.webp` | Te identificas | razor blade under coloured light |

Each sits behind a `.photo` layer: a darkened copy of the shot under a scrim
tuned per section so body copy keeps its contrast. Control it with the
`--shot`, `--shot-pos`, `--shot-op`, `--shot-warm` and `--scrim` custom
properties set inline on each `.photo`.

`--shot-warm: 1` pulls a shot toward the page's gold; `0` leaves its colour
untouched. Only `bg-neon.webp` uses `0` — its colour is the point of the
shot, and that section runs on a dark plate rather than a colour wash so the
photograph is actually visible.

On phones, `cover` enlarges these small originals well past their real
resolution, so they are held darker, reframed via `--shot-pos-m`, and given
a hair of blur — enlargement then reads as depth of field instead of as a
soft image. A `.photo.sharp` opts out; `bg-neon.webp` is the only one that
does, being both the highest resolution of the set and the only shot meant
to be looked at directly.

Replacing a shot: keep it dark and dominated by gold, black or steel.
Saturated colour outside that range fights the palette.
