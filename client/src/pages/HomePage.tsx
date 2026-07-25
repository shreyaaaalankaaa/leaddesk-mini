import { ArrowRight, BarChart3, Check, Clock3, Code2, Gauge, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { LeadForm } from '../components/LeadForm';
import { Logo } from '../components/Logo';

const signals = [
  { icon: Gauge, title: 'Fast where it matters', text: 'Responsive interfaces, lean API payloads, and no decorative scripts slowing the path to action.' },
  { icon: ShieldCheck, title: 'Trust built into the flow', text: 'Validation on both sides, rate limiting, secure admin sessions, and a clear error contract.' },
  { icon: BarChart3, title: 'Follow-up without guesswork', text: 'Search, status ownership, recency metrics, and an audit trail for clean team handoffs.' }
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="absolute inset-x-0 top-0 z-20 px-6 py-5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between" aria-label="Primary navigation">
          <Logo />
          <div className="flex items-center gap-3">
            <a href="#workflow" className="hidden text-sm font-semibold text-slate-600 hover:text-slate-950 sm:inline">How it works</a>
            <Link to="/admin/login" className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-800 backdrop-blur hover:border-slate-300 hover:bg-white">Admin sign in</Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pb-28 sm:pt-44">
          <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-52 top-56 h-[460px] w-[460px] rounded-full bg-cyan-100/60 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.06fr_.94fr]">
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                <Sparkles size={14} /> Signal, not CRM clutter
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
                Capture the brief.<br /><span className="text-indigo-600">Move the conversation.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                LeadDesk Mini gives small product teams a focused intake flow and a follow-up workspace that makes the next action obvious.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#project-form" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-indigo-700">
                  Start a project <ArrowRight size={18} />
                </a>
                <a href="#workflow" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:border-slate-300">See the workflow</a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
                {['Responsive by default', 'Human-readable errors', 'One-day response target'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2"><Check className="text-emerald-600" size={16} />{item}</span>
                ))}
              </div>
            </div>

            <div id="project-form" className="relative scroll-mt-24">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-100 to-cyan-50 blur-xl" />
              <LeadForm />
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Why this flow works</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Less collection. Better context.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">The form asks only what changes the first response. The dashboard then protects the handoff from becoming a spreadsheet chase.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {signals.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-700"><Icon size={21} /></span>
                  <h3 className="mt-5 font-display text-lg font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="scroll-mt-24 px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">The operating idea</p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-slate-950">A tiny system with clear ownership.</h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">The product intentionally does not imitate an enterprise CRM. It does one loop well: collect, qualify, contact, close.</p>
              <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
                <Code2 className="text-indigo-300" size={22} />
                <p className="mt-4 font-display text-xl font-extrabold">Built as two real applications.</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">React + TypeScript on the client. Express + PostgreSQL on the server. The boundary is deliberate, documented, and testable.</p>
              </div>
            </div>
            <ol className="grid gap-4">
              {[
                ['01', 'Capture', 'Client- and server-side validation keep the intake useful without asking twelve unnecessary questions.'],
                ['02', 'Triage', 'Search and status filters help the admin see what needs attention now, not everything at once.'],
                ['03', 'Handoff', 'Every status change is written to a relational activity log with the actor and timestamp.'],
                ['04', 'Learn', 'Top-line counts and seven-day volume make bottlenecks visible without turning the dashboard into a BI tool.']
              ].map(([number, title, text]) => (
                <li key={number} className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-200 hover:shadow-sm">
                  <span className="font-display text-sm font-extrabold text-indigo-600">{number}</span>
                  <div><h3 className="font-display text-lg font-extrabold text-slate-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-3xl bg-indigo-600 p-8 text-white sm:p-12 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-indigo-100"><Clock3 size={18} /><span className="text-sm font-semibold">One clear next step</span></div>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Have a project that is stuck between “idea” and “owned”?</h2>
            </div>
            <a href="#project-form" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-indigo-700 hover:bg-indigo-50">Send the brief <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
