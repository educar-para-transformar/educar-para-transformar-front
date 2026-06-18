import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bell,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareWarning,
  MessageSquare,
  Newspaper,
  PlusSquare,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import {
  changeUserPassword,
  clearSession,
  getRoleHomePath,
  getSession,
} from '../../features/auth/services/demoAuth';
import { getEnrollmentStatusCount } from '../../features/inscripcion/services/enrollmentStore';

const NAV_ITEMS = [
  { label: 'Solicitudes', icon: ClipboardList, path: '/privado/solicitudes', badge: true },
  { label: 'Opiniones', icon: MessageSquareWarning, path: '/privado/opiniones' },
  { label: 'Comentarios', icon: MessageSquare, path: '/privado/comentarios' },
  { label: 'Noticias', icon: Newspaper, path: '/privado/noticias' },
  { label: 'Crear Noticia', icon: PlusSquare, path: '/privado/crear-noticia' },
  { label: 'Actividades', icon: Activity, path: '/privado/actividades' },
  { label: 'Cuentas del Sistema', icon: Users, path: '/privado/cuentas' },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = getSession();
  const [pendingRequests, setPendingRequests] = useState(() => getEnrollmentStatusCount('pending'));
  const [showChangePassword, setShowChangePassword] = useState(session?.mustChangePassword ?? false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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
    return () => window.removeEventListener('enrollment-updated', handleUpdate);
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError(null);

    if (newPassword.length < 6) {
      setChangePasswordError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePasswordError('Las contraseñas no coinciden.');
      return;
    }

    setIsChangingPassword(true);
    try {
      changeUserPassword(session!.email, newPassword);
      setShowChangePassword(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setChangePasswordError(err instanceof Error ? err.message : 'Error al cambiar la contraseña.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/privado/solicitudes') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const getPageTitle = () => {
    if (location.pathname === '/privado/solicitudes') return 'Solicitudes de Inscripción';
    if (location.pathname === '/privado/opiniones') return 'Moderación de Opiniones';
    if (location.pathname === '/privado/comentarios') return 'Moderación de Comentarios';
    if (location.pathname === '/privado/noticias') return 'Gestión de Noticias';
    if (location.pathname.startsWith('/privado/crear-noticia')) return 'Nueva Noticia';
    if (location.pathname.startsWith('/privado/editar-noticia')) return 'Editar Noticia';
    if (location.pathname === '/privado/crear-usuario') return 'Crear Cuenta de Alumno';
    if (location.pathname === '/privado/cuentas') return 'Cuentas del Sistema';
    if (location.pathname === '/privado/actividades') return 'Actividades Extracurriculares';
    return 'Panel Institucional';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 font-sans text-slate-800">
      {/* Desktop Sidebar */}
      <aside className="fixed z-30 hidden h-screen w-64 flex-col bg-gradient-to-b from-edu-primary via-edu-primary-light to-edu-primary shadow-2xl border-r border-white/10 md:flex">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="relative shrink-0">
            <img
              src="/logo/logo%20(6).png"
              alt="Educar"
              className="h-9 w-9 rounded-xl object-cover ring-2 ring-white/20"
            />
            <div className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-edu-primary bg-emerald-500" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight tracking-tight text-white">Educar</h1>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-white/50">Panel de gestión</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 scrollbar-thin">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <React.Fragment key={item.path}>
                <Link
                  to={item.path}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-white/10 text-white shadow-lg shadow-black/5'
                      : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-edu-accent" />
                  )}
                  <div className={`flex items-center justify-center ${active ? 'text-edu-accent' : 'text-white/40 group-hover:text-white/60'}`}>
                    <Icon size={18} />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && pendingRequests > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-edu-accent/20 px-1.5 text-[9px] font-bold text-edu-accent">
                      {pendingRequests}
                    </span>
                  )}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-edu-accent/30 to-edu-accent/10 text-xs font-bold text-white">
              {getInitials(session?.name || 'Admin')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-white/80">{session?.name || 'Admin'}</p>
              <p className="truncate text-[9px] text-white/40">{session?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={15} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-gradient-to-b from-edu-primary via-edu-primary-light to-edu-primary shadow-2xl md:hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo/logo%20(6).png"
                  alt="Educar"
                  className="h-9 w-9 rounded-xl object-cover ring-2 ring-white/20"
                />
                <div>
                  <h1 className="text-sm font-bold leading-tight tracking-tight text-white">Educar</h1>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-white/50">Panel de gestión</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="cursor-pointer rounded-xl p-1.5 text-white/50 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 scrollbar-thin">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <React.Fragment key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                        active
                          ? 'bg-white/10 text-white shadow-lg'
                          : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-edu-accent" />
                      )}
                      <div className={`flex items-center justify-center ${active ? 'text-edu-accent' : 'text-white/40 group-hover:text-white/60'}`}>
                        <Icon size={18} />
                      </div>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && pendingRequests > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-edu-accent/20 px-1.5 text-[9px] font-bold text-edu-accent">
                          {pendingRequests}
                        </span>
                      )}
                    </Link>
                  </React.Fragment>
                );
              })}
            </nav>

            <div className="border-t border-white/10 p-3">
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut size={15} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-edu-accent/15 bg-edu-primary px-5 shadow-lg shadow-black/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="cursor-pointer rounded-xl p-2 text-white/50 hover:bg-white/10 md:hidden"
            >
              <Menu size={20} />
            </button>
            <Link
              to="/"
              className="hidden md:inline-flex items-center justify-center rounded-xl p-2 text-white/50 hover:bg-white/10 hover:text-white transition-all"
              title="Volver a la web"
            >
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 shadow-sm">
              <LayoutDashboard size={15} className="text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-sm font-bold tracking-tight text-white">
                {getPageTitle()}
              </h2>
              <p className="text-[10px] font-semibold text-white/60">
                {pendingRequests > 0
                  ? `${pendingRequests} solicitud(es) pendiente(s)`
                  : 'Panel institucional'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {session?.name || 'Admin'}
            </div>
            <button className="relative cursor-pointer rounded-xl p-2 text-white/50 transition-all hover:bg-white/10 hover:text-white">
              <Bell size={16} />
              {pendingRequests > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-edu-primary" />
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {showChangePassword && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-sm font-bold text-edu-primary">Cambiar contraseña</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Es necesario que cambies tu contraseña antes de continuar.
              </p>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-4 p-5">
              {changePasswordError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700">
                  <AlertTriangle size={14} />
                  {changePasswordError}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Nueva contraseña</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-edu-secondary focus:ring-3 focus:ring-edu-secondary/10"
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Confirmar contraseña</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-edu-secondary focus:ring-3 focus:ring-edu-secondary/10"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 transition-all hover:bg-slate-50"
                >
                  Cerrar sesión
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-edu-secondary to-edu-secondary-light px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm shadow-edu-secondary/20 transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isChangingPassword ? (
                    <>
                      <svg className="h-3.5 w-3.5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={14} />
                      Cambiar contraseña
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};