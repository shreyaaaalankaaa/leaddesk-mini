import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';
import { api } from '../lib/api';

export function ProtectedRoute() {
  const auth = useQuery({
    queryKey: ['auth'],
    queryFn: api.me,
    retry: false,
    staleTime: 5 * 60 * 1000
  });

  if (auth.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" aria-label="Checking session" />
      </div>
    );
  }

  if (auth.isError) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
