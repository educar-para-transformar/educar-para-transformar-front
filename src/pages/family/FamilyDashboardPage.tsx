import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, HeartHandshake, Newspaper, UserSquare2 } from 'lucide-react';
import { getLocalDemoAccountByEmail, getSession } from '../../features/auth/services/demoAuth';

const reminders = [
  'Revisar noticias institucionales al cierre de cada semana.',
  'Mantener actualizados los datos de contacto para acompanamiento oportuno.',
  'Usar la pagina de inscripcion publica como referencia para nuevos ingresos.',
];

export const FamilyDashboardPage: React.FC = () => {
  const session = getSession();
  const account = session ? getLocalDemoAccountByEmail(session.email) : null;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Bienvenida familia
            </p>
            <h1 className="mt-2 text-2xl font-bold text-edu-primary">
              {account?.name ?? 'Portal familias'}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              {account?.summary ??
                'Area privada demo para familias, pensada para acompanar la comunicacion institucional sin tocar el backend actual.'}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Vinculo
            </p>
            <p className="mt-2 font-semibold text-slate-800">
              {account?.relation ?? 'Responsable'}
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
            <HeartHandshake className="h-5 w-5 text-[#0f52ba]" />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {highlight}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#0f52ba]">
            <UserSquare2 className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-800">Alumno asociado</h2>
          </div>
          <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Nombre
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                {account?.childName ?? 'Sin dato'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Nivel
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                {account?.childLevel ?? 'Sin dato'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Curso
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                {account?.childCourse ?? 'Sin dato'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Acceso
              </p>
              <p className="mt-1 font-semibold text-slate-800">Sesion persistente demo</p>
            </div>
          </div>
        </article>

        <article className="space-y-4 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#0f52ba]">
            <CalendarClock className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-800">Recordatorios</h2>
          </div>
          {reminders.map((reminder) => (
            <div
              key={reminder}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600"
            >
              {reminder}
            </div>
          ))}
          <Link
            to="/noticias"
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-[#0f52ba]/30"
          >
            <Newspaper className="h-4 w-4 text-[#0f52ba]" />
            <span>Ir a noticias institucionales</span>
          </Link>
        </article>
      </section>
    </div>
  );
};
