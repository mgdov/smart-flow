"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/useStore"
import api from "@/lib/api"
import Layout from "@/components/common/layout"
import ChatWindow from "@/components/wizard/chat-window"
import UserInput from "@/components/wizard/user-input"
import LoadingSpinner from "@/components/common/loading-spinner"
import { Compass, Sparkles, CircleCheck } from "lucide-react"

const INITIAL_QUESTIONS = [
  "Какая тема вашего курса?",
  "Для кого предназначен курс? (школьники, студенты, специалисты)",
  "Какова цель курса?",
  "Какой предпочитаемый формат? (короткие уроки, длинные модули, практико-ориентированный)",
  "Нужны ли визуалы?",
  "Нужны ли тесты?",
  "Нужны ли видео-сценарии?",
]

export default function WizardPage() {
  const router = useRouter()
  const wizardMessages = useStore((s) => s.wizardMessages)
  const projectDraft = useStore((s) => s.projectDraft)
  const pushWizardMessage = useStore((s) => s.pushWizardMessage)
  const setProjectDraft = useStore((s) => s.setProjectDraft)
  const resetWizard = useStore((s) => s.resetWizard)

  const [projectId, setProjectId] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const answers = projectDraft?.answers || []
  const totalQuestions = INITIAL_QUESTIONS.length
  const progress = Math.round((answers.length / totalQuestions) * 100)
  const currentQuestion = useMemo(
    () => INITIAL_QUESTIONS[Math.min(questionIndex, totalQuestions - 1)],
    [questionIndex, totalQuestions],
  )

  useEffect(() => {
    if (wizardMessages.length === 0) {
      resetWizard()
      pushWizardMessage({ role: "assistant", text: INITIAL_QUESTIONS[0] })
    }
  }, [wizardMessages.length, resetWizard, pushWizardMessage])

  const handleUserMessage = async (message) => {
    const answers = projectDraft?.answers || []
    const newAnswers = [...answers, message]
    setProjectDraft({ ...projectDraft, answers: newAnswers })

    if (questionIndex + 1 >= INITIAL_QUESTIONS.length) {
      setGenerating(true)
      try {
        const res = await api.post("/projects", {
          title: `Курс: ${newAnswers[0]}`,
          topic: newAnswers[0],
          audience: newAnswers[1],
          goal: newAnswers[2],
          format: newAnswers[3],
          visuals: newAnswers[4].toLowerCase().includes("да"),
          tests: newAnswers[5].toLowerCase().includes("да"),
          videos: newAnswers[6].toLowerCase().includes("да"),
          metaPrompt: buildMetaPrompt(newAnswers),
        })

        setProjectId(res.data.id)
        pushWizardMessage({ role: "assistant", text: "Отлично! Начинаю генерировать ваш курс..." })
        await api.post(`/projects/${res.data.id}/generate`, { mode: "stepwise" })

        setTimeout(() => {
          resetWizard()
          router.push(`/workspace/${res.data.id}`)
        }, 2000)
      } catch (error) {
        console.error("Ошибка:", error)
        pushWizardMessage({ role: "assistant", text: "❌ Ошибка при создании проекта. Попробуйте ещё раз." })
        setGenerating(false)
      }
    } else {
      setQuestionIndex((i) => i + 1)
      const nextQuestion = INITIAL_QUESTIONS[questionIndex + 1]
      pushWizardMessage({ role: "assistant", text: nextQuestion })
    }
  }

  return (
    <Layout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle,_rgba(110,75,255,0.3),_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 space-y-10">
          <section className="rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-8 shadow-xl flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                <Sparkles className="h-4 w-4" />
                мастер генерации
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground">
                Ответьте на вопросы, а SmartFlow соберёт для вас полный курс
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl">
                Ассистент уточнит аудиторию, формат и дополнительные артефакты. Чем подробнее ответы, тем быстрее вы
                получите идеальный драфт.
              </p>
            </div>
            <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-muted/40 p-6">
              <p className="text-sm text-muted-foreground mb-2">Прогресс брифа</p>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-semibold text-foreground">{progress}%</div>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-border">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Ответов: {answers.length}/{totalQuestions}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Compass className="h-4 w-4" />
                Текущий вопрос: {currentQuestion}
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-[3fr_1.2fr] gap-6">
            <div className="rounded-3xl border border-border bg-card/90 backdrop-blur flex flex-col gap-6 p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Диалог с ассистентом</p>
                  <h2 className="text-xl font-semibold text-foreground">Сформируем бриф</h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {generating ? "Завершаем" : "Шаг " + (answers.length + 1)}
                </span>
              </div>
              <ChatWindow />
              {generating ? (
                <LoadingSpinner message="Генерирую ваш курс..." />
              ) : (
                <UserInput
                  projectId={projectId}
                  disabled={generating || questionIndex >= INITIAL_QUESTIONS.length}
                  onDone={handleUserMessage}
                />
              )}
            </div>

            <aside className="rounded-3xl border border-border bg-muted/30 p-6 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Шаги мастера</p>
                <h3 className="text-xl font-semibold text-foreground">7 уточняющих вопросов</h3>
              </div>
              <div className="space-y-4">
                {INITIAL_QUESTIONS.map((question, index) => {
                  const answered = Boolean(answers[index])
                  return (
                    <div
                      key={question}
                      className={`flex items-start gap-3 rounded-2xl border px-3 py-3 text-sm leading-relaxed ${
                        answered ? "border-primary/50 bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="mt-0.5">
                        {answered ? (
                          <CircleCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="h-5 w-5 rounded-full border border-dashed border-border text-[11px] flex items-center justify-center text-muted-foreground">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-foreground">{question}</p>
                        {answered && <p className="text-xs text-muted-foreground mt-1">{answers[index]}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function buildMetaPrompt(answers) {
  return `
Создай полный онлайн-курс на тему: "${answers[0]}"
Аудитория: ${answers[1]}
Цель: ${answers[2]}
Формат: ${answers[3]}
Включи визуалы: ${answers[4]}
Включи тесты: ${answers[5]}
Включи видео-сценарии: ${answers[6]}

Структура должна включать модули, уроки, примеры и практические задания.
  `
}
