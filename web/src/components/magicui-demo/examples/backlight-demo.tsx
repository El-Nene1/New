import { Backlight } from "@/components/magicui/backlight"

export default function BacklightDemo() {
  return (
    <div className="flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
      <Backlight blur={30}>
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-cyan-400 to-amber-400 text-sm font-semibold text-white">
          Glow
        </div>
      </Backlight>
    </div>
  )
}
