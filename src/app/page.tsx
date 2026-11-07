import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Hackathon Project
        </h1>

        <p className="text-muted-foreground">
          Next.js + Tailwind + shadcn/ui is working.
        </p>

        <Button>
          Test Button
        </Button>
      </div>
    </main>
  )
}