import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  LogOut,
  Menu,
  MessageSquare,
  PlusCircle,
  Search,
  User,
  X,
} from 'lucide-react';
import { forumStore } from '../../features/comunidad/services/forumStore';
import { clearSession, getRoleHomePath, getSession } from '../../features/auth/services/demoAuth';

export const ForoLayout: React.FC = () => {
  const navigate = useNavigate();
  const session = getSession();
  const isReadOnly = session?.role === 'parent';
  const [profile] = useState(forumStore.getProfile());
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    if (!['student', 'parent'].includes(session.role)) {
      navigate(getRoleHomePath(session.role));
    }
  }, [navigate, session]);

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/privado/foro?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Volver a la Web', path: '/' },
    { label: 'Academico', path: '/privado/foro?category=AcadÃ©mico' },
    { label: 'Vida Escolar', path: '/privado/foro?category=Vida Escolar' },
    { label: 'Grupos de Estudio', path: '/privado/foro?category=Grupos de Estudio' },
    { label: 'Mi Perfil', path: '/privado/foro/perfil' },
  ];

  return (
    <div className="min-h-screen animate-fadeIn bg-slate-50 font-sans text-slate-800">
      <header className="sticky top-0 z-40 h-16 border-b border-slate-200/60 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-8">
            <Link
              to="/privado/foro"
              className="flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <img
                src="/logo/logo%20(6).png"
                alt="Logo Educar Foro"
                className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
              />
              <span className="text-base font-bold tracking-tight text-edu-primary sm:text-lg">
                Educar Foro
              </span>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-edu-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden max-w-xs flex-grow md:flex"
          >
            <input
              type="text"
              placeholder="Buscar discusiones..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-9 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-700 outline-none transition-all focus:border-edu-secondary focus:ring-1 focus:ring-edu-secondary"
            />
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </form>

          <div className="flex items-center gap-3">
            <Link
              to={isReadOnly ? '/privado/foro' : '/privado/foro?create=true'}
              onClick={(event) => {
                if (isReadOnly) {
                  event.preventDefault();
                }
              }}
              className={`inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-bold uppercase tracking-wider shadow-sm transition-all ${
                isReadOnly
                  ? 'cursor-default bg-slate-200 text-slate-600'
                  : 'cursor-pointer bg-edu-secondary text-white hover:bg-edu-primary'
              }`}
            >
              <PlusCircle size={14} />
              <span className="hidden sm:inline">
                {isReadOnly ? 'Solo lectura' : 'Nueva Publicacion'}
              </span>
            </Link>

            <button className="relative cursor-pointer rounded-full p-2 text-slate-400 transition-all hover:bg-slate-50 hover:text-edu-secondary">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-edu-secondary" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu((current) => !current)}
                className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 transition-all hover:border-edu-secondary"
              >
                <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
              </button>

              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                    <div className="border-b border-slate-100 px-4 py-2">
                      <p className="truncate text-xs font-bold text-slate-700">{profile.name}</p>
                      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                        {isReadOnly ? 'Acceso familiar · Lectura' : `Reputacion: ${profile.reputation}`}
                      </p>
                    </div>
                    <Link
                      to="/"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-edu-primary"
                    >
                      <ArrowLeft size={14} />
                      <span>Volver a la Web</span>
                    </Link>
                    <Link
                      to="/privado/foro/perfil"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-edu-primary"
                    >
                      <User size={14} />
                      <span>Ver Mi Perfil</span>
                    </Link>
                    <Link
                      to="/privado/foro"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-edu-primary"
                    >
                      <MessageSquare size={14} />
                      <span>Foro Principal</span>
                    </Link>
                    <hr className="my-1 border-slate-100" />
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                      className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={14} />
                      <span>Cerrar sesion</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="cursor-pointer rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-x-0 bottom-0 top-16 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute inset-x-0 top-16 z-40 space-y-4 border-b border-slate-200 bg-white px-6 py-4 shadow-lg lg:hidden">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-1 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-edu-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-9 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-700 outline-none"
                />
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </form>
            </div>
          </>
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-6 md:px-6 md:py-8">
        {isReadOnly && (
          <div className="mb-5 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-800">
            Acceso familiar en modo lectura: puedes recorrer el foro, pero no publicar,
            responder ni votar.
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};
