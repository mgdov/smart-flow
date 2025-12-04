"use client"

import Image from "next/image"

const devs = [
  {
    name: "Таджибов Умар",
    role: "Product engineer",
    focus: "Отвечает за фронтенд, уроки и осязаемый UX платформы.",
    qrSrc: "/Untitled.png",
  },
  {
    name: "Сулейманов Абдулла",
    role: "Lead AI engineer",
    focus: "Собирает инфраструктуру агентов и автоворонки SmartFlow.",
    qrSrc: "/t.me_waytoseniorcpp.png",
  },
]

export default function DevsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-card px-4 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-border bg-card/80 p-10 text-center shadow-2xl backdrop-blur">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">team</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Разработчики</h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Сканируйте QR-коды, чтобы мгновенно связаться с авторами SmartFlow. Мы открыты к совместным проектам и смелым гипотезам.
          </p>
        </div>

        <div className="grid gap-8 text-left md:grid-cols-2">
          {devs.map((dev) => (
            <article
              key={dev.name}
              className="group relative flex flex-col items-center gap-6 rounded-2xl border border-border/80 bg-background/80 p-6 shadow-lg"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />

              <Image
                src={dev.qrSrc}
                alt={`QR-код для ${dev.name}`}
                width={180}
                height={180}
                className="relative z-10 rounded-xl border border-border/60 bg-white p-3 shadow-xl"
                sizes="180px"
                priority
              />

              <div className="relative z-10 space-y-2 text-center">
                <p className="text-lg font-semibold text-foreground">{dev.name}</p>
                <p className="text-sm font-medium text-primary/80">{dev.role}</p>
                <p className="text-sm text-muted-foreground">{dev.focus}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 font-medium tracking-wide text-primary shadow">
            Спасибо за интерес к проекту!
          </span>
        </div>
      </div>
    </main>
  )
}
