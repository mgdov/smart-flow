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
import { Sparkles } from "lucide-react"

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
      <div className="relative h-[calc(100vh-80px)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(72,80,255,0.25),_transparent_55%)]" />
        <div className="relative h-full flex flex-col gap-4 px-4 py-6">
          <div className="rounded-3xl border border-border bg-card/80 backdrop-blur px-6 py-5 shadow-xl">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  рабочее пространство
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mt-2">{project?.title}</h1>
                <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                  {project?.description || "Редактируйте содержание, дополняйте уроки и оперативно публикуйте обновления."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {project?.audience && <span className="px-4 py-1.5 rounded-full border border-border/80 text-muted-foreground">Аудитория: {project.audience}</span>}
                {project?.topic && <span className="px-4 py-1.5 rounded-full border border-border/80 text-muted-foreground">Тема: {project.topic}</span>}
                {progress && (
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary">
                    Генерация {Math.round(progress.percent || 0)}%
                  </span>
                )}
              </div>
            </div>
            {progress && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Статус генерации</span>
                  <span>{progress.step}</span>
                </div>
                <div className="h-2 rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all"
                    style={{ width: `${progress.percent || 0}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 rounded-[32px] border border-border bg-card/80 backdrop-blur overflow-hidden shadow-2xl">
            <div className="flex h-full">
              <div className="w-[300px] lg:w-[320px] border-r border-border/70 bg-background/70 overflow-y-auto">
                <SidebarStructure
                  project={project}
                  onSelectLesson={setSelectedLesson}
                  onUpdate={() => {
                    // Перезагружаем проект
                  }}
                />
              </div>

              <div className="flex-1 grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="border-r border-border/60 overflow-y-auto bg-background/60">
                  <LessonEditor
                    lesson={selectedLesson}
                    projectId={projectId}
                    onUpdate={() => {
                      // Обновляем проект
                    }}
                  />
                </div>
                <div className="overflow-y-auto bg-muted/30">
                  <AiPanel
                    lesson={selectedLesson}
                    projectId={projectId}
                    onUpdate={() => {
                      // Обновляем контент
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
