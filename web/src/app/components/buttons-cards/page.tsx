import Link from "next/link"

import Demo0 from "@/components/magicui-demo/examples/shimmer-button-demo"
import Demo1 from "@/components/magicui-demo/examples/shiny-button-demo"
import Demo2 from "@/components/magicui-demo/examples/rainbow-button-demo"
import Demo3 from "@/components/magicui-demo/examples/pulsating-button-demo"
import Demo4 from "@/components/magicui-demo/examples/ripple-button-demo"
import Demo5 from "@/components/magicui-demo/examples/interactive-hover-button-demo"
import Demo6 from "@/components/magicui-demo/examples/animated-theme-toggler-demo"
import Demo7 from "@/components/magicui-demo/examples/magic-card-demo"
import Demo8 from "@/components/magicui-demo/examples/neon-gradient-card-demo"
import Demo9 from "@/components/magicui-demo/examples/border-beam-demo"
import Demo10 from "@/components/magicui-demo/examples/shine-border-demo"
import Demo11 from "@/components/magicui-demo/examples/glyph-matrix-demo"

function DemoSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex w-full max-w-4xl flex-col items-center gap-4">
      <h2 className="text-lg font-semibold tracking-tight text-foreground/80">
        {title}
      </h2>
      <div className="flex w-full items-center justify-center">{children}</div>
    </section>
  )
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-16 bg-background px-6 py-16 font-sans text-foreground">
      <header className="flex max-w-xl flex-col items-center gap-3 text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-foreground/50">
          MagicUI Components
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Buttons & Cards
        </h1>
        <p className="text-sm text-foreground/60 sm:text-base">
          Shimmer, rainbow, and pulsating buttons plus glowing card treatments.
        </p>
        <Link
          href="/components/more"
          className="mt-2 text-sm font-medium text-foreground/70 underline underline-offset-4 hover:text-foreground"
        >
          ← Back
        </Link>
      </header>

      <DemoSection title="Shimmer Button">
        <Demo0 />
      </DemoSection>

      <DemoSection title="Shiny Button">
        <Demo1 />
      </DemoSection>

      <DemoSection title="Rainbow Button">
        <Demo2 />
      </DemoSection>

      <DemoSection title="Pulsating Button">
        <Demo3 />
      </DemoSection>

      <DemoSection title="Ripple Button">
        <Demo4 />
      </DemoSection>

      <DemoSection title="Interactive Hover Button">
        <Demo5 />
      </DemoSection>

      <DemoSection title="Animated Theme Toggler">
        <Demo6 />
      </DemoSection>

      <DemoSection title="Magic Card">
        <Demo7 />
      </DemoSection>

      <DemoSection title="Neon Gradient Card">
        <Demo8 />
      </DemoSection>

      <DemoSection title="Border Beam">
        <Demo9 />
      </DemoSection>

      <DemoSection title="Shine Border">
        <Demo10 />
      </DemoSection>

      <DemoSection title="Glyph Matrix">
        <Demo11 />
      </DemoSection>
    </div>
  )
}
