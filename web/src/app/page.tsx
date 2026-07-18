import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"

const companies = [
  "Northwind",
  "Orbital",
  "Fernway",
  "Kestrel",
  "Haloform",
  "Lumenex",
  "Cascade",
  "Verity",
]

const reviews = [
  {
    name: "Maya Khan",
    role: "Head of Product, Northwind",
    body: "This cut our sprint planning time in half. The automations alone paid for themselves in the first month.",
  },
  {
    name: "Diego Ramos",
    role: "Engineering Lead, Orbital",
    body: "We replaced four separate tools with one workspace. The whole team finally sees what's actually happening.",
  },
  {
    name: "Sofia Lindqvist",
    role: "COO, Fernway",
    body: "The real-time dashboards changed how we run standups. Everyone knows the status before we even meet.",
  },
  {
    name: "James Turner",
    role: "CTO, Kestrel",
    body: "Support is fast, the API is clean, and onboarding our 40-person team took a single afternoon.",
  },
]

function ReviewCard({ name, role, body }: (typeof reviews)[number]) {
  return (
    <figure
      className={cn(
        "w-72 shrink-0 rounded-xl border p-4",
        "border-black/10 bg-black/[.02] hover:bg-black/[.04]",
        "dark:border-white/10 dark:bg-white/[.05] dark:hover:bg-white/[.08]",
        "transition-colors"
      )}
    >
      <blockquote className="text-sm leading-relaxed text-foreground/90">
        &ldquo;{body}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-xs">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-foreground/50"> · {role}</span>
      </figcaption>
    </figure>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-16 bg-background px-6 py-24 font-sans text-foreground">
      <header className="flex max-w-xl flex-col items-center gap-3 text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-foreground/50">
          MagicUI · Marquee
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Infinite scrolling, done right
        </h1>
        <p className="text-sm text-foreground/60 sm:text-base">
          A drop-in Marquee component vendored from magicui&apos;s registry,
          wired up manually since the shadcn CLI&apos;s registry host wasn&apos;t
          reachable from this environment.
        </p>
      </header>

      <section className="flex w-full max-w-4xl flex-col gap-4">
        <h2 className="text-center text-sm font-medium text-foreground/50">
          Trusted by teams at
        </h2>
        <div className="relative">
          <Marquee pauseOnHover className="[--duration:25s]">
            {companies.map((name) => (
              <span
                key={name}
                className="mx-4 text-lg font-semibold text-foreground/40 transition-colors hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background" />
        </div>
      </section>

      <section className="relative flex w-full max-w-4xl flex-col items-center gap-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {reviews.map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {[...reviews].reverse().map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background" />
      </section>
    </div>
  )
}
