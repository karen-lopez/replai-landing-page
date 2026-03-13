"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Image
            src="/images/replai-logo.png"
            alt="Replai"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
          
          <Button 
            size="sm"
            className="bg-[#0F6E56] hover:bg-[#0d5f49] text-white rounded-full px-5"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Empezar gratis
          </Button>
        </div>
      </div>
    </header>
  )
}
