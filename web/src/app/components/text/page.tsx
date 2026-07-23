import Link from "next/link"

import Demo0 from "@/components/magicui-demo/examples/line-shadow-text-demo"
import Demo1 from "@/components/magicui-demo/examples/aurora-text-demo"
import Demo2 from "@/components/magicui-demo/examples/morphing-text-demo"
import Demo3 from "@/components/magicui-demo/examples/animated-shiny-text-demo"
import Demo4 from "@/components/magicui-demo/examples/text-reveal-demo"
import Demo5 from "@/components/magicui-demo/examples/dia-text-reveal-demo"
import Demo6 from "@/components/magicui-demo/examples/hyper-text-demo"
import Demo7 from "@/components/magicui-demo/examples/animated-gradient-text-demo"
import Demo8 from "@/components/magicui-demo/examples/word-rotate-demo"
import Demo9 from "@/components/magicui-demo/examples/typing-animation-demo"
import Demo10 from "@/components/magicui-demo/examples/sparkles-text-demo"
import Demo11 from "@/components/magicui-demo/examples/spinning-text-demo"
import Demo12 from "@/components/magicui-demo/examples/comic-text-demo"
import Demo13 from "@/components/magicui-demo/examples/text-animate-demo"
import Demo14 from "@/components/magicui-demo/examples/scroll-based-velocity-demo"
import Demo15 from "@/components/magicui-demo/examples/kinetic-text-demo"
import Demo16 from "@/components/magicui-demo/examples/text-3d-flip-demo"
import Demo17 from "@/components/magicui-demo/examples/video-text-demo"
import Demo18 from "@/components/magicui-demo/examples/highlighter-demo"

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
          Text Effects
        </h1>
        <p className="text-sm text-foreground/60 sm:text-base">
          Typing, reveal, gradient, and kinetic text animations.
        </p>
        <Link
          href="/components/more"
          className="mt-2 text-sm font-medium text-foreground/70 underline underline-offset-4 hover:text-foreground"
        >
          ← Back
        </Link>
      </header>

      <DemoSection title="Line Shadow Text">
        <Demo0 />
      </DemoSection>

      <DemoSection title="Aurora Text">
        <Demo1 />
      </DemoSection>

      <DemoSection title="Morphing Text">
        <Demo2 />
      </DemoSection>

      <DemoSection title="Animated Shiny Text">
        <Demo3 />
      </DemoSection>

      <DemoSection title="Text Reveal">
        <Demo4 />
      </DemoSection>

      <DemoSection title="Dia Text Reveal">
        <Demo5 />
      </DemoSection>

      <DemoSection title="Hyper Text">
        <Demo6 />
      </DemoSection>

      <DemoSection title="Animated Gradient Text">
        <Demo7 />
      </DemoSection>

      <DemoSection title="Word Rotate">
        <Demo8 />
      </DemoSection>

      <DemoSection title="Typing Animation">
        <Demo9 />
      </DemoSection>

      <DemoSection title="Sparkles Text">
        <Demo10 />
      </DemoSection>

      <DemoSection title="Spinning Text">
        <Demo11 />
      </DemoSection>

      <DemoSection title="Comic Text">
        <Demo12 />
      </DemoSection>

      <DemoSection title="Text Animate">
        <Demo13 />
      </DemoSection>

      <DemoSection title="Scroll Based Velocity">
        <Demo14 />
      </DemoSection>

      <DemoSection title="Kinetic Text">
        <Demo15 />
      </DemoSection>

      <DemoSection title="Text 3d Flip">
        <Demo16 />
      </DemoSection>

      <DemoSection title="Video Text">
        <Demo17 />
      </DemoSection>

      <DemoSection title="Highlighter">
        <Demo18 />
      </DemoSection>
    </div>
  )
}
