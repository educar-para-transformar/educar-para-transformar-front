import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  ClipboardList,
  LogOut,
  Menu,
  MessageSquareWarning,
  Newspaper,
  PlusSquare,
  Users,
  X,
} from 'lucide-react';
import {
  clearSession,
  getRoleHomePath,
  getSession,
} from '../../features/auth/services/demoAuth';
import { getEnrollmentStatusCount } from '../../features/inscripcion/services/enrollmentStore';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = getSession();
  const [pendingRequests, setPendingRequests] = useState(() => getEnrollmentStatusCount('pending'));

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    if (session.role !== 'authority') {
      navigate(getRoleHomePath(session.role));
    }
  }, [navigate, session]);

  useEffect(() => {
    const handleUpdate = () => {
      setPendingRequests(getEnrollmentStatusCount('pending'));
    };

    window.addEventListener('enrollment-updated', handleUpdate);
    return () => {
      window.removeEventListener('enrollment-updated', handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  const navItems = [
    {
      label: 'Volver a la Web',
      icon: <ArrowLeft size={20} />,
      path: '/',
    },
    {
      label: 'Solicitudes',
      icon: <ClipboardList size={20} />,
      path: '/privado/solicitudes',
    },
    {
      label: 'Opiniones',
      icon: <MessageSquareWarning size={20} />,
      path: '/privado/opiniones',
    },
    {
      label: 'Noticias',
      icon: <Newspaper size={20} />,
      path: '/privado/noticias',
    },
    {
      label: 'Crear Noticia',
      icon: <PlusSquare size={20} />,
      path: '/privado/crear-noticia',
    },
    {
      label: 'Crear Cuenta Alumno',
      icon: <PlusSquare size={20} />,
      path: '/privado/crear-usuario',
    },
    {
      label: 'Cuentas del Sistema',
      icon: <Users size={20} />,
      path: '/privado/cuentas',
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getPageTitle = () => {
    if (location.pathname === '/privado/solicitudes') return 'Solicitudes de Inscripcion';
    if (location.pathname === '/privado/opiniones') return 'Moderacion de Opiniones';
    if (location.pathname === '/privado/noticias') return 'Gestion de Noticias';
    if (location.pathname === '/privado/crear-noticia') return 'Crear Noticia';
    if (location.pathname === '/privado/crear-usuario') return 'Crear Cuenta de Alumno';
    if (location.pathname === '/privado/cuentas') return 'Cuentas del Sistema';
    if (location.pathname.startsWith('/privado/editar-noticia')) return 'Editar Noticia';
    return 'Panel Institucional';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      <aside className="fixed z-30 hidden h-screen w-64 flex-col border-r border-slate-200/80 bg-white shadow-[4px_0_24px_rgba(26,82,118,0.03)] md:flex">
        <div className="flex items-center gap-3 border-b border-slate-100 p-6">
          <img
            src="/logo/logo%20(6).png"
            alt="Logo Educar Institucional"
            className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div>
            <h1 className="text-base font-bold leading-none tracking-tight text-edu-primary">
              Educar Institucional
            </h1>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Autoridades y personal
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'border-r-4 border-edu-secondary bg-edu-secondary/10 text-edu-primary'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-edu-secondary'
                }`}
              >
                <div className={active ? 'text-edu-secondary' : 'text-slate-400'}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full cursor-pointer items-center gap-3 border-t border-dashed border-slate-100 px-4 pt-3 text-left text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={18} className="text-red-500" />
            <span>CERRAR SESION</span>
          </button>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-2xl transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo/logo%20(6).png"
              alt="Logo Educar Institucional"
              className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div>
              <h1 className="text-base font-bold leading-none tracking-tight text-edu-primary">
                Educar Institucional
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Autoridades y personal
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="cursor-pointer rounded-full p-1 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'border-r-4 border-edu-secondary bg-edu-secondary/10 text-edu-primary'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-edu-secondary'
                }`}
              >
                <div className={active ? 'text-edu-secondary' : 'text-slate-400'}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-slate-100 p-4">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
            className="mt-2 flex w-full cursor-pointer items-center gap-3 border-t border-dashed border-slate-100 px-4 pt-3 text-left text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={18} className="text-red-500" />
            <span>CERRAR SESION</span>
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="cursor-pointer rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden"
            >
              <Menu size={22} />
            </button>
            <div className="space-y-1">
              <h2 className="text-base font-bold tracking-tight text-edu-primary md:text-lg">
                {getPageTitle()}
              </h2>
              <Link
                to="/privado/solicitudes"
                className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-500 transition hover:text-edu-secondary"
              >
                <span>Solicitudes de inscripcion recibidas</span>
                <span className="rounded-full bg-edu-secondary/10 px-2 py-0.5 text-[10px] font-bold text-edu-primary">
                  {pendingRequests}
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative cursor-pointer rounded-full p-2 text-slate-400 transition-all hover:bg-slate-50 hover:text-edu-secondary">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-edu-secondary" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
