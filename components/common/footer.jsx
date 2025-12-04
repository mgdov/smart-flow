export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur p-6 text-center">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="relative flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <p className="uppercase tracking-[0.3em] text-xs text-primary/70">smartflow</p>
        <p className="text-base text-foreground">
          Made with <span className="text-primary font-semibold">mgdov &amp; eavehh</span>
        </p>
        <p className="text-xs">Курсы создаются быстрее, чем кофе остывает.</p>
      </div>
    </footer>
  )
}
