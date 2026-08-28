"use client"

import { LogOut, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { useT } from "../i18n/language-provider"

export function AuthBar() {
  const { user, loading, openLogin, openRegister, logout } = useAuth()
  const { t } = useT()

  if (loading) {
    return <div className="h-9 w-40 animate-pulse rounded-full" style={{ backgroundColor: "#F1E4CB" }} />
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span
          className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium sm:inline-flex"
          style={{ backgroundColor: "#FBEFD6", color: "#8A6D3B" }}
        >
          <UserRound className="h-4 w-4" aria-hidden="true" />
          {t("auth.hi")}, {user.name.split(" ")[0]}
        </span>
        <Button
          type="button"
          variant="outline"
          onClick={() => logout()}
          className="rounded-full"
          style={{ borderColor: "#E4C79A", color: "#8A6D3B" }}
        >
          <LogOut className="mr-1.5 h-4 w-4" aria-hidden="true" />
          {t("auth.logout")}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => openLogin()}
        className="rounded-full"
        style={{ borderColor: "#E4C79A", color: "#8A6D3B", backgroundColor: "#FFFDF8" }}
      >
        {t("auth.login")}
      </Button>
      <Button
        type="button"
        onClick={openRegister}
        className="rounded-full text-white"
        style={{ backgroundColor: "#C77F16" }}
      >
        {t("auth.register")}
      </Button>
    </div>
  )
}
