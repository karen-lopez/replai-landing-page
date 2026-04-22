"use client"

import { Button } from "@/components/ui/button"
import { ReplaiLogo } from "@/components/replai-logo"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <ReplaiLogo className="h-9 w-auto" />
          
          <Button 
            size="sm"
            className="bg-[#0F6E56] hover:bg-[#0d5f49] text-white rounded-full px-5"
            asChild
          >
            <a href="https://wa.me/573192411201?text=Hola,%20quiero%20agendar%20una%20demo%20de%20Replai" target="_blank" rel="noopener noreferrer">
              Agendar demo
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
