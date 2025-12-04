"use client"

import { useEffect, useRef } from "react"
import { useStore } from "@/lib/useStore"
import { Bot, UserRound } from "lucide-react"

export default function ChatWindow() {
  const wizardMessages = useStore((s) => s.wizardMessages)
  const containerRef = useRef(null)

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })
  }, [wizardMessages])

  return (
    <div className="relative h-[60vh] rounded-3xl border border-border bg-gradient-to-b from-muted/40 via-card to-card shadow-xl">
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_65%)]" />
      <div
        ref={containerRef}
        role="log"
        aria-live="polite"
        className="relative z-10 h-full overflow-y-auto px-4 py-6 flex flex-col gap-4"
      >
        {!wizardMessages.length && (
          <div className="mt-auto mb-auto text-center text-muted-foreground">
            <p className="text-base font-medium">Диалог пока пуст</p>
            <p className="text-sm">Расскажите ассистенту о курсе — он задаст нужные уточнения.</p>
          </div>
        )}
        {wizardMessages.map((message, index) => {
          const isUser = message.role === "user"
          return (
            <div key={`${message.role}-${index}`} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && (
                <div className="mt-2 h-9 w-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                  isUser
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-background/90 text-foreground border border-border/80"
                }`}
              >
                {message.text}
              </div>
              {isUser && (
                <div className="mt-2 h-9 w-9 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center">
                  <UserRound className="h-4 w-4" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
