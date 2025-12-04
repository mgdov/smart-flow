"use client"

import Layout from "@/components/common/layout"
import Link from "next/link"
import { Sparkles, BookOpen, Zap, Shield, BarChart3 } from "lucide-react"

export default function Home() {
  const benefits = [
    {
      icon: Zap,
      title: "Скорость",
      desc: "Полная программа курса всего за 6 минут с автоматической структурой и текстами.",
    },
    {
      icon: Sparkles,
      title: "Контент",
      desc: "AI подбирает tone of voice, визуалы и задания, подстраиваясь под аудиторию.",
    },
    {
      icon: BookOpen,
      title: "Публикация",
      desc: "Экспортируйте в PDF, PPTX, DOCX или SCORM и выгружайте в любую LMS.",
    },
  ]

  const stats = [
    { label: "курсов создано", value: "12 400+" },
    { label: "экономия времени", value: "5x" },
    { label: "команд на SmartFlow", value: "320" },
  ]

  return (
    <Layout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(88,86,214,0.25),_transparent_60%)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 py-16 flex flex-col gap-20">
          {/* Герой */}
          <section className="grid lg:grid-cols-[3fr_2fr] gap-10 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-border bg-background/80 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                SmartFlow 2.0 — генерация за минуты
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
                  Создавайте целые академии с помощью AI
                </h1>
                <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  От идеи до обложки курса, уроков, тестов и медиапакета — SmartFlow берёт рутину на себя и помогает
                  запускать образовательные продукты быстрее конкурентов.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/new"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:scale-[1.01] transition"
                >
                  <Sparkles className="h-5 w-5" />
                  Запустить курс
                </Link>
                <Link
                  href="/devs"
                  className="px-8 py-3 rounded-xl border border-border text-foreground hover:bg-muted/40 transition font-medium"
                >
                  Наши Разработчики
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((item) => (
                  <div key={item.label} className="text-left">
                    <p className="text-2xl font-semibold text-foreground">{item.value}</p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full" />
              <div className="relative rounded-3xl border border-border bg-card/90 backdrop-blur-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">Черновик курса</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">AI ассистент</span>
                </div>
                <div className="space-y-4">
                  {["Структура", "Скрипты", "Визуалы", "Тесты"].map((stage, idx) => (
                    <div key={stage} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-2xl bg-muted/60 flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{stage}</p>
                        <div className="mt-2 h-2 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${60 + idx * 10}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">AI предлагает визуальный стиль, обложку и tone of voice.</p>
                  <p className="mt-2 text-sm font-medium text-foreground">«Давайте сделаем курс в стиле tech noir с неоном.»</p>
                </div>
              </div>
            </div>
          </section>

          {/* Преимущества */}
          <section className="space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary">возможности</p>
                <h2 className="text-3xl font-semibold text-foreground mt-2">Команда из AI-инструментов</h2>
              </div>
              <Link href="/new" className="text-sm font-medium text-primary hover:underline">
                См. полный список
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="group border border-border rounded-2xl p-6 bg-card/80 hover:border-primary/40 transition shadow-sm hover:-translate-y-0.5">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Секция доверия */}
          <section className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-lg">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                Безопасность корпоративного уровня
              </div>
              <h3 className="text-2xl font-semibold text-foreground mt-4">Сертифицировано для крупных команд</h3>
              <p className="mt-4 text-muted-foreground">
                SmartFlow поддерживает SSO, контроль версий, приватные пространства и отчётность по активности
                преподавателей. Роли админа, редактора и ревьюера помогают масштабировать процессы.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs uppercase tracking-wide">Интеграции</p>
                  <p className="text-base text-foreground">Canvas, Moodle, iSpring, Notion</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide">Экспорт</p>
                  <p className="text-base text-foreground">SCORM, xAPI, Web, PDF</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-gradient-to-br from-background to-muted/40 p-8 shadow-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4 text-primary" />
                Как это работает
              </div>
              <div className="mt-6 space-y-6">
                {["Пропишите идею курса", "SmartFlow собирает данные и знания", "AI генерирует структуру и контент", "Запускайте курс сразу"].map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full border border-border flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-base font-medium text-foreground">{step}</p>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 && "Опишите аудиторию, цель и ограничения — не требуется шаблонов."}
                        {index === 1 && "Мы анализируем материалы, брифы, сайты и существующие программы."}
                        {index === 2 && "Получаете уроки, задания, тесты, визуалы и конспект."}
                        {index === 3 && "Экспортируйте в LMS или поделитесь ссылкой с командой."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  )
}
