import { Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="LeadDesk Mini home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-glow">
        <Layers3 size={19} strokeWidth={2.25} />
      </span>
      <span className={`font-display text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-slate-950'}`}>
        LeadDesk <span className="text-indigo-600">Mini</span>
      </span>
    </Link>
  );
}
