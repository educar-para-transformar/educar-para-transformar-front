import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [success, setSuccess] = useState(false);

  return (
    <section
      id="contacto"
      className="relative flex items-center justify-center overflow-hidden px-6 pb-20 pt-6"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-edu-accent/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="mx-auto mb-12 w-full max-w-4xl border-t border-slate-200 opacity-70" />

        <div className="mb-4 inline-block rounded-full border border-slate-100 bg-white px-4 py-1 text-xs font-bold uppercase tracking-wider text-edu-primary shadow-sm">
          Hablemos
        </div>

        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-edu-dark md:text-4xl">
          Tienes alguna duda o consulta?
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base text-slate-500">
          Nuestro equipo de admisiones esta listo para ayudarte. Escribenos y
          te responderemos a la brevedad.
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-edu-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <MapPin size={16} />
            </div>
            <span>Av. Principal 123</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-edu-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <Phone size={16} />
            </div>
            <span>(0362) 555-0000</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-edu-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <Mail size={16} />
            </div>
            <span>info@educar.edu.ar</span>
          </div>
        </div>

        <div className="mx-auto max-w-lg rounded-3xl border border-slate-100 bg-white p-8 text-left shadow-xl shadow-slate-200/40 md:p-10">
          {success ? (
            <div className="space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-5">
              <p className="text-sm font-bold text-emerald-800">Consulta enviada</p>
              <p className="text-sm leading-relaxed text-emerald-700">
                Tu mensaje quedo registrado dentro del MVP. Si prefieres avanzar
                directo con admisiones, puedes continuar por solicitud de inscripcion.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/inscripcion"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-edu-primary px-4 text-sm font-semibold text-white transition hover:bg-edu-secondary"
                >
                  Ir a inscripcion
                </Link>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Enviar otra consulta
                </button>
              </div>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                setSuccess(true);
              }}
            >
              <div className="space-y-1">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:border-edu-primary focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Correo
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:border-edu-primary focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Mensaje
                </label>
                <textarea
                  placeholder="Escribe tu mensaje..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:border-edu-primary focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="group mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-edu-primary text-sm font-bold text-white shadow-md shadow-edu-primary/20 transition-all active:scale-[0.98] hover:bg-edu-secondary"
              >
                <span>Enviar Consulta</span>
                <Send size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm transition-colors hover:text-[#1877F2]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm transition-colors hover:text-[#E1306C]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm transition-colors hover:text-[#25D366]">
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
