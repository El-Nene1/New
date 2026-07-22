import Link from "next/link"

import { TweetCard } from "@/components/magicui/tweet-card"
import { InteractiveShowcase } from "@/components/magicui-demo/interactive-showcase"

export default function MoreComponentsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-20 bg-background px-6 py-16 font-sans text-foreground">
      <header className="flex max-w-xl flex-col items-center gap-3 text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-foreground/50">
          MagicUI Components
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Globe, Tweet Card, and more
        </h1>
        <p className="text-sm text-foreground/60 sm:text-base">
          Globe, Tweet Card, Orbiting Circles, Avatar Circles, Icon Cloud,
          Lens, Pointer, Smooth Cursor, Progressive Blur, and Dotted Map.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm font-medium">
          <Link
            href="/components"
            className="text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            ← Back
          </Link>
          <Link
            href="/components/backgrounds"
            className="text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            Backgrounds & Effects →
          </Link>
          <Link
            href="/components/text"
            className="text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            Text Effects →
          </Link>
          <Link
            href="/components/buttons-cards"
            className="text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            Buttons & Cards →
          </Link>
          <Link
            href="/components/showcase"
            className="text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            Devices & Data →
          </Link>
        </div>
      </header>

      <section className="flex w-full max-w-4xl flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Tweet Card</h2>
          <p className="text-sm text-foreground/60">
            Renders a real tweet server-side. Requires network access to
            Twitter/X at build or request time — falls back gracefully if
            unreachable.
          </p>
        </div>
        <TweetCard id="1629307668568633344" />
      </section>

      <InteractiveShowcase />
    </div>
  )
}
