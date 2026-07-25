import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Loader2, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';
import { api, ApiError } from '../lib/api';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});
type Values = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });
  const login = useMutation({
    mutationFn: api.login,
    onSuccess: async (data) => {
      queryClient.setQueryData(['auth'], data);
      navigate('/admin');
    }
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="px-6 py-5"><div className="mx-auto flex max-w-7xl items-center justify-between"><Logo /><Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950" to="/"><ArrowLeft size={16} />Back to site</Link></div></header>
      <main className="grid flex-1 place-items-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-soft sm:p-9">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white"><LockKeyhole size={22} /></span>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-slate-950">Admin workspace</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Use the dedicated demo account. The session is stored in a secure HTTP-only cookie.</p>
          <form className="mt-7" onSubmit={handleSubmit((values) => login.mutate(values))} noValidate>
            <label className="block text-sm font-semibold text-slate-700">Email
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" type="email" autoComplete="email" {...register('email')} />
              {errors.email && <span className="mt-1.5 block text-xs font-medium text-rose-600">{errors.email.message}</span>}
            </label>
            <label className="mt-5 block text-sm font-semibold text-slate-700">Password
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" type="password" autoComplete="current-password" {...register('password')} />
              {errors.password && <span className="mt-1.5 block text-xs font-medium text-rose-600">{errors.password.message}</span>}
            </label>
            {login.isError && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700" role="alert">{login.error instanceof ApiError ? login.error.message : 'Sign in failed.'}</p>}
            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-70" disabled={login.isPending}>
              {login.isPending ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              {login.isPending ? 'Verifying…' : 'Sign in securely'}
            </button>
          </form>
        </div>
      </main>
      <Footer compact />
    </div>
  );
}
