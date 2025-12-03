"use client"

export default function LoadingSpinner({ message = "Загрузка..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
