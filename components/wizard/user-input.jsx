"use client"

import { useState } from "react"
import { useStore } from "@/lib/useStore"
import api from "@/lib/api"

export default function UserInput({ projectId, onDone, disabled = false }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const pushWizardMessage = useStore((s) => s.pushWizardMessage)

  const send = async () => {
    if (!text.trim() || loading || disabled) return

    pushWizardMessage({ role: "user", text })
    setText("")
    setLoading(true)

    try {
      const res = await api.post("/chat", { message: text, projectId })
      pushWizardMessage({ role: "assistant", text: res.data.reply })
    } catch (error) {
      pushWizardMessage({ role: "assistant", text: "❌ Ошибка при получении ответа" })
    }
    setLoading(false)
  }

  return (
    <div className="mt-3 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        disabled={loading || disabled}
        className="flex-1 border border-border bg-background text-foreground px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        placeholder="Напиши ответ..."
      />
      <button
        onClick={send}
        disabled={loading || disabled}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
      >
        {loading ? "Отправка..." : "Отправить"}
      </button>
    </div>
  )
}
