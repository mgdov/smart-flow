"use client"

import { useState } from "react"
import { useStore } from "@/lib/useStore"
import api from "@/lib/api"
import { Loader2, Send, Sparkles } from "lucide-react"

export default function UserInput({ projectId, onDone, disabled = false }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const pushWizardMessage = useStore((s) => s.pushWizardMessage)
  const quickPrompts = ["Расскажи про курс", "Сформируй план", "Какие тесты добавить?"]

  const send = async () => {
    const payload = text.trim()
    if (!payload || loading || disabled) return

    pushWizardMessage({ role: "user", text: payload })
    onDone?.(payload)
    setText("")
    setLoading(true)

    try {
      const res = await api.post("/chat", { message: payload, projectId })
      pushWizardMessage({ role: "assistant", text: res.data.reply })
    } catch (error) {
      pushWizardMessage({ role: "assistant", text: "❌ Ошибка при получении ответа" })
    }
    setLoading(false)
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => setText(prompt)}
            className="px-3 py-1 rounded-full border border-border/70 hover:border-primary/60 hover:text-foreground transition"
          >
            {prompt}
          </button>
        ))}
      </div>
      <div className="flex gap-3 rounded-2xl border border-border bg-card/80 p-4 shadow-md items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey || !e.shiftKey)) {
              e.preventDefault()
              send()
            }
          }}
          disabled={loading || disabled}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground whitespace-nowrap focus:outline-none"
          placeholder="Опишите идею, аудиторию и требуемый тон. Cmd/Ctrl + Enter чтобы отправить."
        />
        <button
          onClick={send}
          disabled={loading || disabled}
          className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg disabled:opacity-60"
          aria-label="Отправить сообщение"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </button>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        AI анализирует ваши ответы и формирует структуру уроков и домашних заданий.
      </div>
    </div>
  )
}
