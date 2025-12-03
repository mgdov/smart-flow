"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useStore } from "@/lib/useStore"
import api from "@/lib/api"
import Layout from "@/components/common/layout"
import SidebarStructure from "@/components/editor/sidebar-structure"
import LessonEditor from "@/components/editor/lesson-editor"
import AiPanel from "@/components/editor/ai-panel"
import LoadingSpinner from "@/components/common/loading-spinner"
import { useProjectProgress } from "@/hooks/use-project-progress"

export default function WorkspacePage() {
  const params = useParams()
  const projectId = params.id

  const [project, setProject] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  const currentProject = useStore((s) => s.currentProject)
  const setCurrentProject = useStore((s) => s.setCurrentProject)

  const progress = useProjectProgress(projectId)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}`)
        setProject(res.data)
        setCurrentProject(res.data)
      } catch (error) {
        console.error("Ошибка при загрузке проекта:", error)
      }
      setLoading(false)
    }

    fetchProject()
  }, [projectId])

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner message="Загружаю ваш курс..." />
      </Layout>
    )
  }

  if (!project) {
    return (
      <Layout>
        <div className="text-center p-8">
          <p className="text-destructive">Проект не найден</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Прогресс бар */}
        {progress && (
          <div className="bg-card border-b border-border px-6 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Статус генерации:</span>
              <div className="flex-1 bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${progress.percent || 0}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">{progress.step}</span>
            </div>
          </div>
        )}

        {/* Основной контент */}
        <div className="flex flex-1 overflow-hidden">
          {/* Левая панель - структура */}
          <SidebarStructure
            project={project}
            onSelectLesson={setSelectedLesson}
            onUpdate={() => {
              // Перезагружаем проект
            }}
          />

          {/* Центр - редактор */}
          <div className="flex-1 overflow-auto">
            <LessonEditor
              lesson={selectedLesson}
              projectId={projectId}
              onUpdate={() => {
                // Обновляем проект
              }}
            />
          </div>

          {/* Правая панель - AI помощник */}
          <AiPanel
            lesson={selectedLesson}
            projectId={projectId}
            onUpdate={() => {
              // Обновляем контент
            }}
          />
        </div>
      </div>
    </Layout>
  )
}
