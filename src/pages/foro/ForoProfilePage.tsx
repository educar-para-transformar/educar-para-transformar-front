import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Edit2,
  FileText,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { forumStore } from '../../features/comunidad/services/forumStore';
import { getSession } from '../../features/auth/services/demoAuth';
import type { StudentProfile, Discussion } from '../../features/comunidad/services/forumStore';

export const ForoProfilePage: React.FC = () => {
  const isReadOnly = getSession()?.role === 'parent';
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Discussion[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  useEffect(() => {
    const currentProfile = forumStore.getProfile();
    setProfile(currentProfile);

    const allDiscussions = forumStore.getDiscussions();
    const myPosts = allDiscussions.filter((discussion) => discussion.authorName === currentProfile.name);
    setUserPosts(myPosts);
  }, []);

  if (!profile) {
    return <div className="py-20 text-center text-slate-400">Cargando perfil...</div>;
  }

  return (
    <div className="animate-fadeIn space-y-8 text-left">
      <div>
        <Link
          to="/privado/foro"
          className="group inline-flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-edu-secondary"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Volver al foro</span>
        </Link>
      </div>

      <section className="relative flex flex-col items-start gap-8 overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm md:flex-row md:items-center md:p-8">
        <div className="absolute right-[-30px] top-[-30px] h-48 w-48 rounded-full bg-slate-50" />

        <div className="relative shrink-0">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-slate-100 shadow-sm md:h-32 md:w-32">
            <img src={profile.avatar} alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-edu-secondary text-white shadow-sm">
            <CheckCircle2 size={14} className="fill-edu-secondary text-white" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-1.5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <h1 className="text-xl font-bold text-edu-primary md:text-2xl">{profile.name}</h1>
              <div className="flex gap-1.5">
                {profile.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-edu-secondary/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-edu-secondary"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs font-semibold text-slate-400 md:text-sm">{profile.role}</p>
          </div>

          <div className="flex max-w-md gap-8 border-t border-slate-100 pt-3">
            <div>
              <span className="block text-base font-bold leading-none text-edu-primary">
                {profile.reputation}
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Reputacion
              </span>
            </div>
            <div className="border-x border-slate-200 px-8">
              <span className="block text-base font-bold leading-none text-edu-primary">
                {profile.postsCount}
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Temas
              </span>
            </div>
            <div>
              <span className="block text-base font-bold leading-none text-edu-primary">
                {profile.badgesCount}
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Insignias
              </span>
            </div>
          </div>
        </div>

        {!isReadOnly && (
          <button
            onClick={() => alert('Edicion de perfil (simulacion)')}
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-5 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 md:w-auto md:self-start"
          >
            <Edit2 size={13} />
            <span>Editar Perfil</span>
          </button>
        )}
      </section>

      <nav className="flex gap-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('posts')}
          className={`relative py-3 text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'posts' ? 'text-edu-secondary' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>{isReadOnly ? 'Temas guardados' : 'Mis publicaciones'}</span>
          {activeTab === 'posts' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-edu-secondary" />}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`relative py-3 text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'saved' ? 'text-edu-secondary' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>Resumen</span>
          {activeTab === 'saved' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-edu-secondary" />}
        </button>
      </nav>

      {activeTab === 'posts' ? (
        userPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {userPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-white p-5 text-left shadow-sm transition-all hover:border-edu-secondary/40"
              >
                <div>
                  <span className="mb-3 inline-block rounded-full bg-edu-secondary/10 px-2.5 py-0.5 text-[8px] uppercase tracking-wider text-edu-primary">
                    {post.category}
                  </span>
                  <Link to={`/privado/foro/discusion/${post.id}`}>
                    <h3 className="text-sm font-bold leading-snug text-slate-800 transition-colors hover:text-edu-secondary">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {post.lead}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-[10px] font-bold text-slate-400">
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={12} />
                    {post.score}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    {post.repliesCount}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200/60 bg-white p-12 text-center shadow-sm">
            <FileText className="mx-auto mb-3 text-slate-300" size={32} />
            <p className="text-sm font-bold text-slate-700">
              {isReadOnly ? 'Perfil de lectura familiar' : 'Aun no publicaste temas'}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {isReadOnly
                ? 'Desde este acceso puedes seguir conversaciones y revisar contenidos del foro.'
                : 'Comienza preguntando o aportando dudas en el foro principal.'}
            </p>
            <Link
              to={isReadOnly ? '/privado/foro' : '/privado/foro?create=true'}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-edu-secondary px-4 py-2 text-xs font-bold uppercase text-white"
            >
              {isReadOnly ? 'Volver al foro' : 'Publicar tema'}
            </Link>
          </div>
        )
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Award className="text-edu-secondary" size={18} />
              <div>
                <p className="text-sm font-bold text-slate-800">Resumen de cuenta</p>
                <p className="text-xs text-slate-500">
                  {isReadOnly
                    ? 'Acceso familiar en modo lectura.'
                    : 'Participacion general en la comunidad.'}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {isReadOnly
                ? 'Puedes revisar publicaciones, seguir hilos y acceder a informacion del foro sin intervenir en las conversaciones.'
                : 'Tu cuenta puede crear temas, responder publicaciones y seguir construyendo reputacion dentro del foro.'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-800">Atajos utiles</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/privado/foro"
                className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Ir al feed
              </Link>
              <Link
                to="/"
                className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Volver a la web
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
