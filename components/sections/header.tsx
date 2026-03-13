"use client"

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Replai</span>
          </div>
          
          <Button 
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Empezar gratis
          </Button>
        </div>
      </div>
    </header>
  )
}
