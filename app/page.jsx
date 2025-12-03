"use client"

import Layout from "@/components/common/layout"
import Link from "next/link"
import { Sparkles, BookOpen, Zap } from "lucide-react"

export default function Home() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Герой */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Создавайте курсы за минуты, а не за месяцы</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            SmartFlow — это платформа, которая автоматизирует создание онлайн-курсов с помощью AI. Просто введите тему,
            а система сама создаст структуру, текст, визуалы и тесты.
          </p>
          <Link
            href="/new"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition"
          >
            <Sparkles size={20} />
            Создать курс прямо сейчас
          </Link>
        </section>

        {/* Преимущества */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Zap,
              title: "Быстро",
              desc: "Генерируйте полный курс за несколько минут вместо недель",
            },
            {
              icon: Sparkles,
              title: "С AI",
              desc: "Используйте мощь искусственного интеллекта для создания контента",
            },
            {
              icon: BookOpen,
              title: "Готово к экспорту",
              desc: "Экспортируйте в PDF, PPTX, DOCX или LMS SCORM",
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition">
                <Icon size={32} className="text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            )
          })}
        </section>

        {/* CTA для B2B */}
        <section className="bg-secondary text-secondary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Для компаний и образовательных учреждений</h2>
          <p className="text-sm mb-4">
            SmartFlow для B2B включает интеграцию с платформами LMS и поддержку SCORM xAPI.
          </p>
          <button className="px-6 py-2 bg-secondary-foreground text-secondary rounded-md font-medium hover:opacity-90 transition">
            Связаться с отделом продаж
          </button>
        </section>
      </div>
    </Layout>
  )
}
