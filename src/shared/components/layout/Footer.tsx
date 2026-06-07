import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Niveles', path: '/niveles' },
  { label: 'Noticias', path: '/noticias' },
  { label: 'Registro', path: '/registro' },
  { label: 'Empleo', path: '/empleo' },
];

const quickLinks = [
  { label: 'Quiénes Somos', path: '/quienes-somos' },
  { label: 'Bienestar', path: '/bienestar' },
  { label: 'Inscripción', path: '/inscripcion' },
  { label: 'Opiniones', path: '/opiniones' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-edu-dark py-12 text-slate-400 border-t border-slate-900">
      <div className="mx-auto max-w-6xl px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 sm:grid-cols-2">
          {/* Column 1: Branding & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo%20(6).png"
                alt="Logo Educar para Transformar"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/10"
              />
              <h4 className="text-sm font-semibold text-white">
                Educar para Transformar
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Centro educativo comprometido con el desarrollo integral y el futuro de nuestra comunidad.
            </p>
            <p className="text-xs text-slate-400">Resistencia, Chaco</p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="mailto:info@educar.edu.ar"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Contacto
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 text-edu-accent shrink-0" />
                <span>Av. Principal 123, Resistencia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-edu-accent shrink-0" />
                <span>(0362) 555-0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-edu-accent shrink-0" />
                <span>info@educar.edu.ar</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="mt-0.5 text-edu-accent shrink-0" />
                <span>Lunes a Viernes de 7:00 a 18:00 hs.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Credentials Area (Integrated in Footer) */}
        <div className="mt-10 border-t border-slate-900/60 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-white/[0.015] border border-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <KeyRound size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-200">Credenciales de Acceso Demo</p>
                <p className="text-[10px] text-slate-500">Úsalas en la pantalla de inicio de sesión para probar cada rol.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
              <div className="text-[11px] bg-slate-900/40 border border-white/[0.02] p-2.5 rounded-xl">
                <p className="font-bold text-[9px] text-blue-400 uppercase tracking-wider">Autoridad</p>
                <p className="text-slate-300 font-mono mt-0.5 select-all">director@educar.com</p>
                <p className="text-slate-500 font-mono text-[9px]">pass: programacion2026</p>
              </div>
              <div className="text-[11px] bg-slate-900/40 border border-white/[0.02] p-2.5 rounded-xl">
                <p className="font-bold text-[9px] text-emerald-400 uppercase tracking-wider">Docente</p>
                <p className="text-slate-300 font-mono mt-0.5 select-all">docente@educar.com</p>
                <p className="text-slate-500 font-mono text-[9px]">pass: programacion2026</p>
              </div>
              <div className="text-[11px] bg-slate-900/40 border border-white/[0.02] p-2.5 rounded-xl">
                <p className="font-bold text-[9px] text-amber-400 uppercase tracking-wider">Familia</p>
                <p className="text-slate-300 font-mono mt-0.5 select-all">familia@educar.com</p>
                <p className="text-slate-500 font-mono text-[9px]">pass: programacion2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 border-t border-slate-900/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>© 2026 Educar para Transformar</span>
            <span>•</span>
            <Link to="#" className="hover:text-slate-300 transition-colors">Política de privacidad</Link>
            <span>•</span>
            <Link to="#" className="hover:text-slate-300 transition-colors">Términos y condiciones</Link>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-500/80 font-medium">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Sitio seguro</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
