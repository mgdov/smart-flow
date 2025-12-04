"use client"

import Link from "next/link"
import { useStore } from "@/lib/useStore"
import { shallow } from "zustand/shallow"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Header() {
  const user = useStore((s) => s.user)
  const setUser = useStore((s) => s.setUser)
  const setToken = useStore((s) => s.setToken)
  const bootstrap = useStore((s) => s.bootstrapFromCookies)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Инициализируем токен из Cookies при монтировании (один раз)
  useEffect(() => {
    bootstrap?.()
  }, [bootstrap])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    Cookies.remove("token")
    setUser(null)
    setToken(null)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
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
            <Link href="/devs" className="text-foreground hover:text-primary transition">
              Разработчики
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Переключить тему"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </button>
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors shadow-sm"
              >
                Выход
              </button>
            </>
          ) : (
            <Link
              href="/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              Создать курс
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
