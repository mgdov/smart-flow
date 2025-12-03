"use client"

import Link from "next/link"
import { useStore } from "@/lib/useStore"
import { shallow } from "zustand/shallow"
import Cookies from "js-cookie"
import { useEffect } from "react"

export default function Header() {
  const user = useStore((s) => s.user)
  const setUser = useStore((s) => s.setUser)
  const setToken = useStore((s) => s.setToken)
  const bootstrap = useStore((s) => s.bootstrapFromCookies)

  // Инициализируем токен из Cookies при монтировании (один раз)
  useEffect(() => {
    bootstrap?.()
  }, [bootstrap])

  const handleLogout = () => {
    Cookies.remove("token")
    setUser(null)
    setToken(null)
  }

  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            SmartFlow
          </Link>
          <nav className="hidden md:flex gap-4 text-sm">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Главная
            </Link>
            <Link href="/new" className="text-foreground hover:text-primary transition">
              Создать курс
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md text-sm hover:opacity-90 transition"
              >
                Выход
              </button>
            </>
          ) : (
            <Link
              href="/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition"
            >
              Создать курс
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
