"use client"

import { useEffect, useRef } from "react"
import { useStore } from "@/lib/useStore"

export default function ChatWindow() {
  const wizardMessages = useStore((s) => s.wizardMessages)
  const containerRef = useRef()

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })
  }, [wizardMessages])

  return (
    <div
      className="border border-border rounded-lg p-4 h-[60vh] overflow-auto bg-card flex flex-col gap-3"
      ref={containerRef}
    >
      {wizardMessages.map((m, i) => (
        <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            <div className="text-sm">{m.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
