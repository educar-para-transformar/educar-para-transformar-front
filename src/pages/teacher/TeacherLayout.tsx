import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, GraduationCap, LogOut, School } from 'lucide-react';
import {
  clearSession,
  getRoleHomePath,
  getSession,
} from '../../features/auth/services/demoAuth';

export const TeacherLayout: React.FC = () => {
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    if (session.role !== 'teacher') {
      navigate(getRoleHomePath(session.role));
    }
  }, [navigate, session]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#0f52ba]/10 p-3 text-[#0f52ba]">
              <School className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Acceso docente
              </p>
              <h1 className="text-lg font-bold text-edu-primary">
                Portal docente
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a la web</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                clearSession();
                navigate('/login');
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">
          <nav className="space-y-2">
            <Link
              to="/docentes"
              className="flex items-center gap-3 rounded-2xl bg-[#0f52ba]/10 px-4 py-3 text-sm font-semibold text-[#0f52ba]"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Inicio docente</span>
            </Link>
            <Link
              to="/noticias"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#0f52ba]"
            >
              <BookOpen className="h-4 w-4" />
              <span>Noticias publicas</span>
            </Link>
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
