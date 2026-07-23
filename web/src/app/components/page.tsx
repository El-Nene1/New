"use client"

import Link from "next/link"
import { CalendarIcon, HomeIcon, MailIcon, PenLineIcon, SettingsIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal"
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { AnimatedList } from "@/components/magicui/animated-list"
import { Dock, DockIcon } from "@/components/magicui/dock"

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="flex w-full max-w-4xl flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-foreground/60">{description}</p>
      </div>
      {children}
    </section>
  )
}

const PLACEHOLDER_THUMBNAIL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='960' height='540'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23111827'/%3E%3Cstop offset='1' stop-color='%23374151'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='960' height='540' fill='url(%23g)'/%3E%3C/svg%3E"

interface NotificationItem {
  name: string
  description: string
  time: string
  color: string
  icon: React.ReactNode
}

const notifications: NotificationItem[] = [
  {
    name: "Payment received",
    description: "Vector",
    time: "15m ago",
    color: "#00C9A7",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 text-white" aria-hidden="true">
        <path d="M4 8h16M4 8a2 2 0 012-2h12a2 2 0 012 2M4 8v8a2 2 0 002 2h12a2 2 0 002-2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "User signed up",
    description: "Vector",
    time: "10m ago",
    color: "#FFB800",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 text-white" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20c1.2-3.5 4-5.5 7-5.5s5.8 2 7 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "New message",
    description: "Vector",
    time: "5m ago",
    color: "#FF3D71",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 text-white" aria-hidden="true">
        <path d="M4 6h16v10H8l-4 4V6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "New event",
    description: "Vector",
    time: "2m ago",
    color: "#1E86FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-4 text-white" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

const notificationFeed = Array.from({ length: 8 }, () => notifications).flat()

function Notification({ name, description, time, color, icon }: NotificationItem) {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-card [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center gap-1 text-sm font-medium whitespace-pre">
            <span>{name}</span>
            <span className="text-foreground/40">·</span>
            <span className="text-xs text-foreground/40">{time}</span>
          </figcaption>
          <p className="text-sm text-foreground/60">{description}</p>
        </div>
      </div>
    </figure>
  )
}

const dockItems = [
  { label: "Home", icon: HomeIcon },
  { label: "Calendar", icon: CalendarIcon },
  { label: "Mail", icon: MailIcon },
  { label: "Compose", icon: PenLineIcon },
  { label: "Settings", icon: SettingsIcon },
]

export default function ComponentsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-20 bg-background px-6 py-16 font-sans text-foreground">
      <header className="flex max-w-xl flex-col items-center gap-3 text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-foreground/50">
          MagicUI Components
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Vendored from source
        </h1>
        <p className="text-sm text-foreground/60 sm:text-base">
          Terminal, Hero Video Dialog, Bento Grid, Animated List, and Dock —
          pulled directly from magicui&apos;s GitHub source since the shadcn
          registry host isn&apos;t reachable from this environment.
        </p>
        <div className="mt-2 flex gap-4 text-sm font-medium">
          <Link
            href="/"
            className="text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            ← Back to Marquee demo
          </Link>
          <Link
            href="/components/more"
            className="text-foreground/70 underline underline-offset-4 hover:text-foreground"
          >
            More components →
          </Link>
        </div>
      </header>

      <Section title="Terminal" description="An animated terminal window that simulates a CLI session.">
        <Terminal>
          <TypingAnimation>&gt; pnpm dlx shadcn@latest add @magicui/terminal</TypingAnimation>
          <AnimatedSpan className="text-green-500">✔ Preflight checks.</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Verifying framework. Found Next.js.</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Installing dependencies.</AnimatedSpan>
          <AnimatedSpan className="text-blue-500">
            <span>ℹ Updated 1 file:</span>
            <span className="pl-2">- components/magicui/terminal.tsx</span>
          </AnimatedSpan>
          <TypingAnimation className="text-muted-foreground">
            Success! Component added.
          </TypingAnimation>
        </Terminal>
      </Section>

      <Section title="Hero Video Dialog" description="A thumbnail that expands into a video player dialog on click.">
        <div className="w-full max-w-xl">
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
            thumbnailSrc={PLACEHOLDER_THUMBNAIL}
            thumbnailAlt="Product demo video"
          />
        </div>
      </Section>

      <Section title="Bento Grid" description="An asymmetric grid layout for showcasing features.">
        <BentoGrid className="grid-rows-2">
          <BentoCard
            name="Automations"
            className="col-span-3 lg:col-span-2"
            background={<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />}
            Icon={SettingsIcon}
            description="Trigger multi-step workflows from any event."
            href="#"
            cta="Learn more"
          />
          <BentoCard
            name="Notifications"
            className="col-span-3 lg:col-span-1"
            background={<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />}
            Icon={MailIcon}
            description="Stay on top of every event in real time."
            href="#"
            cta="Learn more"
          />
          <BentoCard
            name="Scheduling"
            className="col-span-3 lg:col-span-1"
            background={<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />}
            Icon={CalendarIcon}
            description="Coordinate across time zones effortlessly."
            href="#"
            cta="Learn more"
          />
          <BentoCard
            name="Home dashboard"
            className="col-span-3 lg:col-span-2"
            background={<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />}
            Icon={HomeIcon}
            description="One view for everything your team is doing."
            href="#"
            cta="Learn more"
          />
        </BentoGrid>
      </Section>

      <Section title="Animated List" description="A feed of items that animate in one at a time.">
        <div className="relative flex h-[420px] w-full max-w-md flex-col overflow-hidden rounded-2xl border p-2">
          <AnimatedList delay={1200}>
            {notificationFeed.map((item, idx) => (
              <Notification {...item} key={idx} />
            ))}
          </AnimatedList>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
        </div>
      </Section>

      <Section title="Dock" description="A macOS-style dock with magnification on hover.">
        <Dock direction="middle">
          {dockItems.map(({ label, icon: Icon }) => (
            <DockIcon key={label}>
              <div
                title={label}
                aria-label={label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full"
                )}
              >
                <Icon className="size-5" />
              </div>
            </DockIcon>
          ))}
        </Dock>
      </Section>
    </div>
  )
}
