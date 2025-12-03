"use client"

import { useState, useEffect } from "react"
import api from "@/lib/api"
import { Save } from "lucide-react"

export default function LessonEditor({ lesson, projectId, onUpdate }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (lesson) {
      setText(lesson.content?.text || "")
    }
  }, [lesson])

  const save = async () => {
    if (!lesson) return
    setLoading(true)
    try {
      await api.patch(`/projects/${projectId}/lessons/${lesson.id}`, { content: { text } })
      onUpdate?.()
    } catch (error) {
      console.error("Ошибка при сохранении:", error)
    }
    setLoading(false)
  }

  if (!lesson) {
    return <div className="flex-1 flex items-center justify-center text-muted-foreground">Выберите урок</div>
  }

  return (
    <div className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-bold mb-2 text-foreground">{lesson.title}</h1>
      <div className="text-xs text-muted-foreground mb-4">ID: {lesson.id}</div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border border-border bg-background text-foreground px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        placeholder="Содержание урока..."
      />
      <div className="mt-4 flex gap-2">
        <button
          onClick={save}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
        >
          <Save size={16} />
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </div>
  )
}
