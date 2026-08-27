"use client"

import { UserReport } from "./user-report"

export function UserReportSection() {
  return (
    <section className="bg-[#FBF5EB] pb-16 md:pb-20" aria-label="Reportar en tu ubicación">
      <div className="mx-auto max-w-3xl px-4">
        <UserReport />
      </div>
    </section>
  )
}
