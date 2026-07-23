import Link from "next/link"

import Demo0 from "@/components/magicui-demo/examples/warp-background-demo"
import Demo1 from "@/components/magicui-demo/examples/noise-texture-demo"
import Demo2 from "@/components/magicui-demo/examples/meteors-demo"
import Demo3 from "@/components/magicui-demo/examples/grid-pattern-demo"
import Demo4 from "@/components/magicui-demo/examples/hexagon-pattern-demo"
import Demo5 from "@/components/magicui-demo/examples/striped-pattern-demo"
import Demo6 from "@/components/magicui-demo/examples/interactive-grid-pattern-demo"
import Demo7 from "@/components/magicui-demo/examples/dot-pattern-demo"
import Demo8 from "@/components/magicui-demo/examples/flickering-grid-demo"
import Demo9 from "@/components/magicui-demo/examples/particles-demo"
import Demo10 from "@/components/magicui-demo/examples/ripple-demo"
import Demo11 from "@/components/magicui-demo/examples/retro-grid-demo"
import Demo12 from "@/components/magicui-demo/examples/animated-grid-pattern-demo"
import Demo13 from "@/components/magicui-demo/examples/light-rays-demo"
import Demo14 from "@/components/magicui-demo/examples/glare-hover-demo"
import Demo15 from "@/components/magicui-demo/examples/backlight-demo"

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
          Backgrounds & Effects
        </h1>
        <p className="text-sm text-foreground/60 sm:text-base">
          Grid, dot, and pattern backgrounds, plus particle and glow effects.
        </p>
        <Link
          href="/components/more"
          className="mt-2 text-sm font-medium text-foreground/70 underline underline-offset-4 hover:text-foreground"
        >
          ← Back
        </Link>
      </header>

      <DemoSection title="Warp Background">
        <Demo0 />
      </DemoSection>

      <DemoSection title="Noise Texture">
        <Demo1 />
      </DemoSection>

      <DemoSection title="Meteors">
        <Demo2 />
      </DemoSection>

      <DemoSection title="Grid Pattern">
        <Demo3 />
      </DemoSection>

      <DemoSection title="Hexagon Pattern">
        <Demo4 />
      </DemoSection>

      <DemoSection title="Striped Pattern">
        <Demo5 />
      </DemoSection>

      <DemoSection title="Interactive Grid Pattern">
        <Demo6 />
      </DemoSection>

      <DemoSection title="Dot Pattern">
        <Demo7 />
      </DemoSection>

      <DemoSection title="Flickering Grid">
        <Demo8 />
      </DemoSection>

      <DemoSection title="Particles">
        <Demo9 />
      </DemoSection>

      <DemoSection title="Ripple">
        <Demo10 />
      </DemoSection>

      <DemoSection title="Retro Grid">
        <Demo11 />
      </DemoSection>

      <DemoSection title="Animated Grid Pattern">
        <Demo12 />
      </DemoSection>

      <DemoSection title="Light Rays">
        <Demo13 />
      </DemoSection>

      <DemoSection title="Glare Hover">
        <Demo14 />
      </DemoSection>

      <DemoSection title="Backlight">
        <Demo15 />
      </DemoSection>
    </div>
  )
}
