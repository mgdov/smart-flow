"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/useStore"
import api from "@/lib/api"
import Layout from "@/components/common/layout"
import ChatWindow from "@/components/wizard/chat-window"
import UserInput from "@/components/wizard/user-input"
import LoadingSpinner from "@/components/common/loading-spinner"

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

  // Инициализация диалога при загрузке
  useEffect(() => {
    if (wizardMessages.length === 0) {
      resetWizard()
      pushWizardMessage({
        role: "assistant",
        text: INITIAL_QUESTIONS[0],
      })
    }
  }, [])

  const handleUserMessage = async (message) => {
    // Обновляем draft
    const answers = projectDraft?.answers || []
    const newAnswers = [...answers, message]
    setProjectDraft({ ...projectDraft, answers: newAnswers })

    // Если это последний вопрос
    if (questionIndex + 1 >= INITIAL_QUESTIONS.length) {
      // Создаём проект
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
        pushWizardMessage({
          role: "assistant",
          text: "Отлично! Начинаю генерировать ваш курс...",
        })

        // Запускаем генерацию
        await api.post(`/projects/${res.data.id}/generate`, { mode: "stepwise" })

        // Редирект на workspace
        setTimeout(() => {
          resetWizard()
          router.push(`/workspace/${res.data.id}`)
        }, 2000)
      } catch (error) {
        console.error("Ошибка:", error)
        pushWizardMessage({
          role: "assistant",
          text: "❌ Ошибка при создании проекта. Попробуйте ещё раз.",
        })
        setGenerating(false)
      }
    } else {
      // Переходим к следующему вопросу
      setQuestionIndex((i) => i + 1)
      const nextQuestion = INITIAL_QUESTIONS[questionIndex + 1]
      pushWizardMessage({
        role: "assistant",
        text: nextQuestion,
      })
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Мастер создания курса</h1>

        <ChatWindow />

        {generating ? (
          <LoadingSpinner message="Генерирую ваш курс..." />
        ) : (
          <UserInput
            projectId={projectId}
            disabled={generating || questionIndex >= INITIAL_QUESTIONS.length}
            onDone={() => {}}
          />
        )}
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
