"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function SidebarStructure({ project, onSelectLesson, onUpdate }) {
  const [expanded, setExpanded] = useState({})

  if (!project) {
    return <div className="w-64 border-r border-border p-4 text-sm text-muted-foreground">Загрузка...</div>
  }

  const modules = project.modules || []

  return (
    <div className="w-64 border-r border-border p-4 h-full overflow-auto bg-sidebar">
      <h2 className="font-bold text-lg mb-4 text-sidebar-foreground">Структура курса</h2>
      {modules.map((m) => (
        <div key={m.id} className="mb-4">
          <button
            onClick={() => setExpanded((e) => ({ ...e, [m.id]: !e[m.id] }))}
            className="w-full flex items-center gap-2 font-semibold text-sm text-sidebar-foreground hover:text-sidebar-primary transition"
          >
            {expanded[m.id] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            {m.title}
          </button>
          {expanded[m.id] && (
            <ul className="ml-6 mt-2 space-y-1">
              {(m.lessons || []).map((l) => (
                <li
                  key={l.id}
                  onClick={() => onSelectLesson(l)}
                  className="py-1 px-2 cursor-pointer rounded text-sm text-sidebar-foreground hover:bg-sidebar-accent transition"
                >
                  {l.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
