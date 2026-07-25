import { Logo } from './Logo';

export function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={compact ? 'border-t border-slate-200 bg-white px-6 py-5' : 'border-t border-white/10 bg-slate-950 px-6 py-10 text-slate-300'}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {!compact && <Logo dark />}
        <p className={compact ? 'text-xs text-slate-500' : 'text-sm text-slate-400'}>
          <a
            className="underline decoration-slate-500 underline-offset-4 transition hover:text-indigo-400"
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
          >
            Built for Digital Heroes Training Task
          </a>
        </p>
      </div>
    </footer>
  );
}
