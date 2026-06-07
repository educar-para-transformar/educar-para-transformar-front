import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, BookOpenCheck, CalendarDays, Newspaper } from 'lucide-react';
import { getLocalDemoAccountByEmail, getSession } from '../../features/auth/services/demoAuth';

const notices = [
  'Compartir novedades del trimestre en la cartelera institucional.',
  'Reforzar el canal de acompanamiento con familias antes del cierre de bimestre.',
  'Derivar a noticias publicas las actividades que tambien deben ver aspirantes.',
];

export const TeacherDashboardPage: React.FC = () => {
  const session = getSession();
  const account = session ? getLocalDemoAccountByEmail(session.email) : null;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Bienvenida docente
            </p>
            <h1 className="mt-2 text-2xl font-bold text-edu-primary">
              {account?.name ?? 'Portal docente'}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              {account?.summary ??
                'Area privada demo para docentes, pensada como una capa frontend sobre el MVP actual.'}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Area
            </p>
            <p className="mt-2 font-semibold text-slate-800">
              {account?.department ?? 'Equipo docente'}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {account?.highlights.map((highlight) => (
          <article
            key={highlight}
            className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm"
          >
            <Bell className="h-5 w-5 text-[#0f52ba]" />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {highlight}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#0f52ba]">
            <CalendarDays className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-800">Recordatorios del ciclo</h2>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {notices.map((notice) => (
              <li key={notice} className="rounded-2xl bg-slate-50 px-4 py-3">
                {notice}
              </li>
            ))}
          </ul>
        </article>

        <article className="space-y-4 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#0f52ba]">
            <BookOpenCheck className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-800">Atajos utiles</h2>
          </div>
          <Link
            to="/noticias"
            className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-[#0f52ba]/30 hover:bg-white"
          >
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-[#0f52ba]" />
              <span>Ver noticias publicas</span>
            </div>
          </Link>
          <Link
            to="/bienestar"
            className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-[#0f52ba]/30 hover:bg-white"
          >
            <div className="flex items-center gap-2">
              <BookOpenCheck className="h-4 w-4 text-[#0f52ba]" />
              <span>Ir a bienestar institucional</span>
            </div>
          </Link>
        </article>
      </section>
    </div>
  );
};
