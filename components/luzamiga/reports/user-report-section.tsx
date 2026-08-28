"use client"

import { useAuth } from "../auth/auth-provider"
import { UserReport } from "./user-report"

export function UserReportSection() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <section id="reportar-estado" className="bg-[#FBF5EB] pb-16 md:pb-20" aria-label="Reportar en tu ubicación">
      <div className="mx-auto max-w-3xl px-4">
        <UserReport />
      </div>
    </section>
  )
}
