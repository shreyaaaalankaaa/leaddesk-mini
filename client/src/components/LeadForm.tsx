import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api, ApiError } from '../lib/api';

const formSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Enter a valid email address'),
  budgetRange: z.enum(['under-2500', '2500-5000', '5000-10000', '10000-plus'], {
    required_error: 'Choose a budget range'
  }),
  message: z.string().trim().min(20, 'Please share at least 20 characters').max(1000)
});

type FormValues = z.infer<typeof formSchema>;

const fieldClass =
  'mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100';

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  async function onSubmit(values: FormValues) {
    setServerError('');
    try {
      await api.submitLead(values);
      setSubmitted(true);
      reset();
    } catch (error) {
      setServerError(error instanceof ApiError ? error.message : 'Unable to submit right now. Please try again.');
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-soft" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-600 text-white">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-slate-950">Brief received.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
          We will review the context first, then respond with the clearest next step instead of sending a generic sales pitch.
        </p>
        <button
          type="button"
          className="mt-5 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
          onClick={() => setSubmitted(false)}
        >
          Submit another project
        </button>
      </div>
    );
  }

  return (
    <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Project intake</p>
        <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950">Tell us what needs to move.</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">Four fields. No forced discovery call. A useful reply within one business day.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Name
          <input className={fieldClass} placeholder="Maya Chen" autoComplete="name" {...register('name')} />
          {errors.name && <span className="mt-1.5 block text-xs font-medium text-rose-600">{errors.name.message}</span>}
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Work email
          <input className={fieldClass} placeholder="maya@company.com" autoComplete="email" type="email" {...register('email')} />
          {errors.email && <span className="mt-1.5 block text-xs font-medium text-rose-600">{errors.email.message}</span>}
        </label>
      </div>

      
<label className="mt-5 block text-sm font-semibold text-slate-700">
  Expected budget

  <select
    className={fieldClass}
    defaultValue=""
    {...register('budgetRange')}
  >
    <option value="" disabled>
      Select a range
    </option>

    <option value="under-2500">Under ₹50,000</option>
    <option value="2500-5000">₹50,000–₹2,00,000</option>
    <option value="5000-10000">₹2,00,000–₹5,00,000</option>
    <option value="10000-plus">₹5,00,000+</option>
  </select>
</label>

      <label className="mt-5 block text-sm font-semibold text-slate-700">
        What are you trying to improve?
        <textarea
          className={`${fieldClass} min-h-32 resize-y`}
          placeholder="The current checkout loses mobile users, and we need a cleaner flow before our September campaign..."
          {...register('message')}
        />
        {errors.message && <span className="mt-1.5 block text-xs font-medium text-rose-600">{errors.message.message}</span>}
      </label>

      {serverError && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700" role="alert">{serverError}</p>}

      <button
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-glow transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
        {isSubmitting ? 'Sending securely…' : 'Send project brief'}
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">Protected by server-side validation and rate limiting.</p>
    </form>
  );
}
