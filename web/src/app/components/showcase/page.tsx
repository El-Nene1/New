import Link from "next/link"

import Demo0 from "@/components/magicui-demo/examples/android-demo"
import Demo1 from "@/components/magicui-demo/examples/safari-demo"
import Demo2 from "@/components/magicui-demo/examples/iphone-demo"
import Demo3 from "@/components/magicui-demo/examples/file-tree-demo"
import Demo4 from "@/components/magicui-demo/examples/code-comparison-demo"
import Demo5 from "@/components/magicui-demo/examples/confetti-demo"
import Demo6 from "@/components/magicui-demo/examples/cool-mode-demo"
import Demo7 from "@/components/magicui-demo/examples/number-ticker-demo"
import Demo8 from "@/components/magicui-demo/examples/animated-circular-progress-bar-demo"
import Demo9 from "@/components/magicui-demo/examples/animated-beam-demo"
import Demo10 from "@/components/magicui-demo/examples/blur-fade-demo"
import Demo11 from "@/components/magicui-demo/examples/scroll-progress-demo"
import Demo12 from "@/components/magicui-demo/examples/pixel-image-demo"
import Demo13 from "@/components/magicui-demo/examples/client-tweet-card-demo"

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
          Devices & Data
        </h1>
        <p className="text-sm text-foreground/60 sm:text-base">
          Device mockups, file trees, code diffs, tickers, and progress indicators.
        </p>
        <Link
          href="/components/more"
          className="mt-2 text-sm font-medium text-foreground/70 underline underline-offset-4 hover:text-foreground"
        >
          ← Back
        </Link>
      </header>

      <DemoSection title="Android">
        <Demo0 />
      </DemoSection>

      <DemoSection title="Safari">
        <Demo1 />
      </DemoSection>

      <DemoSection title="Iphone">
        <Demo2 />
      </DemoSection>

      <DemoSection title="File Tree">
        <Demo3 />
      </DemoSection>

      <DemoSection title="Code Comparison">
        <Demo4 />
      </DemoSection>

      <DemoSection title="Confetti">
        <Demo5 />
      </DemoSection>

      <DemoSection title="Cool Mode">
        <Demo6 />
      </DemoSection>

      <DemoSection title="Number Ticker">
        <Demo7 />
      </DemoSection>

      <DemoSection title="Animated Circular Progress Bar">
        <Demo8 />
      </DemoSection>

      <DemoSection title="Animated Beam">
        <Demo9 />
      </DemoSection>

      <DemoSection title="Blur Fade">
        <Demo10 />
      </DemoSection>

      <DemoSection title="Scroll Progress">
        <Demo11 />
      </DemoSection>

      <DemoSection title="Pixel Image">
        <Demo12 />
      </DemoSection>

      <DemoSection title="Client Tweet Card">
        <Demo13 />
      </DemoSection>
    </div>
  )
}
