"use client"

import {
  CalendarIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  PaletteIcon,
  FileCodeIcon,
  FlameIcon,
  GaugeIcon,
  GitBranchIcon,
  LayersIcon,
  ServerIcon,
  ShieldIcon,
  SparkleIcon,
  TerminalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "@/components/magicui/globe"
import { OrbitingCircles } from "@/components/magicui/orbiting-circles"
import { AvatarCircles } from "@/components/magicui/avatar-circles"
import { IconCloud } from "@/components/magicui/icon-cloud"
import { Lens } from "@/components/magicui/lens"
import { Pointer } from "@/components/magicui/pointer"
import { SmoothCursor } from "@/components/magicui/smooth-cursor"
import { ProgressiveBlur } from "@/components/magicui/progressive-blur"
import { DottedMap, type Marker } from "@/components/magicui/dotted-map"

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

function initialsAvatar(initials: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' rx='40' fill='${color}'/><text x='40' y='48' font-family='sans-serif' font-size='28' fill='white' text-anchor='middle'>${initials}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const avatars = [
  { imageUrl: initialsAvatar("MK", "#5E6AD2"), profileUrl: "#" },
  { imageUrl: initialsAvatar("DR", "#22D3EE"), profileUrl: "#" },
  { imageUrl: initialsAvatar("SL", "#8B5CF6"), profileUrl: "#" },
  { imageUrl: initialsAvatar("JT", "#22C55E"), profileUrl: "#" },
  { imageUrl: initialsAvatar("AM", "#F59E0B"), profileUrl: "#" },
]

const orbitIcons = [CalendarIcon, CodeIcon, PaletteIcon, GitBranchIcon, LayersIcon]

function IconBadge({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="flex size-full items-center justify-center rounded-full border bg-card shadow-sm">
      <Icon className="size-5 text-foreground/80" />
    </div>
  )
}

const cloudColors = [
  "#5E6AD2",
  "#22D3EE",
  "#8B5CF6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#0EA5E9",
  "#EC4899",
]
const cloudIcons = [
  CodeIcon,
  DatabaseIcon,
  ServerIcon,
  CloudIcon,
  GitBranchIcon,
  ShieldIcon,
  TerminalIcon,
  PaletteIcon,
  GaugeIcon,
  FileCodeIcon,
  FlameIcon,
  SparkleIcon,
]

interface MapMarker extends Marker {
  label: string
}

const mapMarkers: MapMarker[] = [
  { lat: 40.7128, lng: -74.006, size: 3, pulse: true, label: "New York" },
  { lat: 51.5072, lng: -0.1276, size: 3, pulse: true, label: "London" },
  { lat: 35.6762, lng: 139.6503, size: 3, pulse: true, label: "Tokyo" },
]

export function InteractiveShowcase() {
  return (
    <>
      <Section title="Globe" description="An interactive, draggable 3D globe rendered on canvas.">
        <div className="relative flex h-[320px] w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border">
          <Globe />
        </div>
      </Section>

      <Section title="Orbiting Circles" description="Icons that continuously orbit a center point at different radii and speeds.">
        <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden">
          <OrbitingCircles iconSize={36}>
            {orbitIcons.map((Icon, i) => (
              <IconBadge key={i} Icon={Icon} />
            ))}
          </OrbitingCircles>
          <OrbitingCircles iconSize={26} radius={90} reverse speed={2}>
            {orbitIcons.slice(0, 3).map((Icon, i) => (
              <IconBadge key={i} Icon={Icon} />
            ))}
          </OrbitingCircles>
        </div>
      </Section>

      <Section title="Avatar Circles" description="Overlapping avatar stack with an overflow count badge.">
        <AvatarCircles numPeople={42} avatarUrls={avatars} />
      </Section>

      <Section title="Icon Cloud" description="A draggable 3D sphere of icons rendered on canvas.">
        <div className="flex items-center justify-center">
          <IconCloud
            icons={cloudIcons.map((Icon, i) => (
              <Icon key={i} size={40} color={cloudColors[i % cloudColors.length]} strokeWidth={1.75} />
            ))}
          />
        </div>
      </Section>

      <Section title="Lens" description="Hover to zoom into a region of the image.">
        <Card className="relative max-w-md shadow-none">
          <CardHeader>
            <Lens zoomFactor={2} lensSize={150} ariaLabel="Zoom area">
              <svg viewBox="0 0 400 300" className="w-full rounded-lg" role="img" aria-label="Abstract gradient placeholder">
                <defs>
                  <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#5E6AD2" />
                    <stop offset="0.5" stopColor="#22D3EE" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#lensGrad)" />
                <circle cx="120" cy="120" r="50" fill="rgba(255,255,255,0.25)" />
                <circle cx="280" cy="190" r="70" fill="rgba(255,255,255,0.15)" />
              </svg>
            </Lens>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl">Your next destination</CardTitle>
            <CardDescription>Hover over the image to zoom in on the detail.</CardDescription>
          </CardContent>
          <CardFooter className="space-x-4">
            <Button>Let&apos;s go</Button>
            <Button variant="secondary">Another time</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Pointer" description="Replaces the cursor with a custom element while hovering a container.">
        <div className="grid w-full gap-4 sm:grid-cols-3">
          <div className="relative flex h-32 flex-col items-center justify-center rounded-lg border">
            <p className="text-sm font-medium">Animated</p>
            <Pointer />
          </div>
          <div className="relative flex h-32 flex-col items-center justify-center rounded-lg border">
            <p className="text-sm font-medium">Colored</p>
            <Pointer className="fill-blue-500" />
          </div>
          <div className="relative flex h-32 flex-col items-center justify-center rounded-lg border">
            <p className="text-sm font-medium">Custom shape</p>
            <Pointer>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" className="fill-purple-500" />
                <circle cx="12" cy="12" r="5" className="fill-white" />
              </svg>
            </Pointer>
          </div>
        </div>
      </Section>

      <Section title="Smooth Cursor" description="Replaces the system cursor site-wide with a spring-animated pointer. Move your mouse to see it (desktop only).">
        <p className="text-sm text-foreground/50">
          Active on this page while you&apos;re here.
        </p>
        <SmoothCursor />
      </Section>

      <Section title="Progressive Blur" description="A layered blur gradient for fading scrollable content.">
        <div className="relative w-full max-w-md overflow-hidden rounded-xl border">
          <div className="relative h-[300px] overflow-y-auto">
            <div className="flex flex-col gap-2 p-4">
              {Array.from({ length: 14 }).map((_, index) => (
                <div key={index} className="flex h-14 w-full items-center justify-center rounded-lg border bg-card text-sm text-foreground/60">
                  Row {index + 1}
                </div>
              ))}
            </div>
            <ProgressiveBlur position="bottom" height="35%" />
          </div>
        </div>
      </Section>

      <Section title="Dotted Map" description="A dotted world map with pulsing location markers.">
        <div className={cn("relative w-full max-w-2xl overflow-hidden rounded-xl border")}>
          <DottedMap<MapMarker>
            markers={mapMarkers}
            className="text-foreground/15"
            markerColor="#5E6AD2"
            renderMarkerOverlay={({ marker, x, y }) => (
              <text x={x + marker.size! + 1} y={y + 1} fontSize={2.6} fill="currentColor" className="text-foreground">
                {marker.label}
              </text>
            )}
          />
        </div>
      </Section>
    </>
  )
}
