"use client"

import { useState } from "react"
import { Wand2, Zap, Eye } from "lucide-react"
import api from "@/lib/api"

export default function AiPanel({ lesson, projectId, onUpdate }) {
  const [loading, setLoading] = useState(null)

  const handleAction = async (action) => {
    if (!lesson) return
    setLoading(action)
    try {
      const res = await api.post(`/lessons/${lesson.id}/improve`, { action })
      onUpdate?.()
    } catch (error) {
      console.error("Ошибка:", error)
    }
    setLoading(null)
  }

  const buttons = [
    { id: "simplify", label: "Упростить", icon: Wand2 },
    { id: "shorten", label: "Сократить", icon: Zap },
    { id: "expand", label: "Расширить", icon: Eye },
  ]

  if (!lesson) {
    return <div className="w-64 border-l border-border p-4 text-sm text-muted-foreground">Выберите урок</div>
  }

  return (
    <div className="w-64 border-l border-border p-4 bg-card space-y-3">
      <h2 className="font-bold text-sm text-foreground">Улучшения с AI</h2>
      {buttons.map((btn) => {
        const Icon = btn.icon
        return (
          <button
            key={btn.id}
            onClick={() => handleAction(btn.id)}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
          >
            <Icon size={16} />
            {loading === btn.id ? "Обработка..." : btn.label}
          </button>
        )
      })}
    </div>
  )
}
