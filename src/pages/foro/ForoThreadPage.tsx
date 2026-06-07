import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageSquare, 
  Share2, 
  Flag, 
  Send,
  Award,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { forumStore } from '../../features/comunidad/services/forumStore';
import { getSession } from '../../features/auth/services/demoAuth';
import type { Discussion } from '../../features/comunidad/services/forumStore';

export const ForoThreadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isReadOnly = getSession()?.role === 'parent';
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [newReplyContent, setNewReplyContent] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null); // For nested replying
  const [nestedReplyContent, setNestedReplyContent] = useState('');

  useEffect(() => {
    loadThread();
  }, [id]);

  const loadThread = () => {
    if (id) {
      const thread = forumStore.getDiscussionById(Number(id));
      if (thread) {
        setDiscussion(thread);
      } else {
        navigate('/privado/foro');
      }
    }
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    if (!newReplyContent.trim() || !discussion) return;

    forumStore.addReply(discussion.id, newReplyContent.trim());
    setNewReplyContent('');
    loadThread();
  };

  const handlePostNestedReply = (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (isReadOnly) return;
    if (!nestedReplyContent.trim() || !discussion) return;

    forumStore.addReply(discussion.id, nestedReplyContent.trim(), parentId);
    setNestedReplyContent('');
    setActiveReplyId(null);
    loadThread();
  };

  const handleVoteDiscussion = (dir: 'up' | 'down') => {
    if (isReadOnly) return;
    if (!discussion) return;
    forumStore.voteDiscussion(discussion.id, dir);
    loadThread();
  };

  const handleVoteReply = (replyId: number, dir: 'up' | 'down') => {
    if (isReadOnly) return;
    if (!discussion) return;
    forumStore.voteReply(discussion.id, replyId, dir);
    loadThread();
  };

  if (!discussion) {
    return (
      <div className="py-20 text-center text-slate-400">
        Cargando discusión...
      </div>
    );
  }

  // Group replies by parent (separate root replies from nested replies)
  const rootReplies = discussion.replies.filter(r => r.parentId === null);
  const getNestedReplies = (parentId: number) => {
    return discussion.replies.filter(r => r.parentId === parentId);
  };

  // Sidebar Mock Widgets Data
  const relatedTopics = [
    { title: 'Examen Final: Consejos de Preparación', comments: 85, category: 'Académico' },
    { title: 'Nuevas pautas de bioseguridad en laboratorios', comments: 22, category: 'Vida Escolar' },
    { title: 'Grupo de estudio: Histología I', comments: 14, category: 'Grupos de Estudio' }
  ];

  const popularDiscussions = [
    { num: '01', title: 'Becas de investigación: Convocatoria 2024' },
    { num: '02', title: 'Uso de IA en trabajos prácticos: Debate ético' },
    { num: '03', title: 'Crónicas del Hospital Escuela: Mi primera guardia' }
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* Back button */}
      <div>
        <Link
          to="/privado/foro"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-edu-secondary transition-colors text-xs font-bold uppercase tracking-wider group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver al foro</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        
        {/* Left Column: Post and Thread replies */}
        <div className="lg:col-span-8 space-y-6">
          {isReadOnly && (
            <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-800">
              Estas navegando el hilo en modo lectura familiar. Puedes ver el
              contenido, pero no responder ni votar.
            </div>
          )}
          
          {/* Main Original Post Card */}
          <article className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-5">
            <header>
              <div className="flex items-center gap-3">
                <img
                  src={discussion.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'}
                  alt=""
                  className="w-11 h-11 rounded-full object-cover border border-slate-100"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 leading-none">{discussion.authorName}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wide">
                    {discussion.authorRole} • {discussion.date}
                  </p>
                </div>
              </div>
            </header>

            <h1 className="text-base md:text-lg font-bold text-edu-primary leading-tight">
              {discussion.title}
            </h1>

            <div className="text-xs md:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
              {discussion.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <footer className="pt-4 border-t border-slate-100 flex items-center justify-between">
              
              {/* Score / Voting for Post */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-lg p-0.5 select-none">
                <button
                  onClick={() => handleVoteDiscussion('up')}
                  disabled={isReadOnly}
                  className={`p-1 rounded hover:bg-slate-200/50 transition-colors cursor-pointer ${
                    discussion.userVoted === 'up' ? 'text-green-600' : 'text-slate-400'
                  }`}
                  title="Me gusta"
                >
                  <ChevronUp size={16} />
                </button>
                <span className={`text-[11px] font-bold px-1.5 min-w-[20px] text-center ${
                  discussion.userVoted === 'up' ? 'text-green-600' : discussion.userVoted === 'down' ? 'text-red-500' : 'text-slate-600'
                }`}>
                  {discussion.score}
                </span>
                <button
                  onClick={() => handleVoteDiscussion('down')}
                  disabled={isReadOnly}
                  className={`p-1 rounded hover:bg-slate-200/50 transition-colors cursor-pointer ${
                    discussion.userVoted === 'down' ? 'text-red-500' : 'text-slate-400'
                  }`}
                  title="No me gusta"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase">
                <div className="flex items-center gap-1">
                  <MessageSquare size={13} />
                  <span>{discussion.repliesCount} Comentarios</span>
                </div>
                <button
                  onClick={() => alert('Enlace copiado al portapapeles')}
                  className="flex items-center gap-1 hover:text-edu-secondary transition-colors cursor-pointer"
                >
                  <Share2 size={13} />
                  <span>Compartir</span>
                </button>
              </div>

              <button
                onClick={() => alert('Tema reportado para moderación')}
                className="text-slate-400 hover:text-red-500 p-1.5 rounded transition-all cursor-pointer"
                title="Reportar publicación"
              >
                <Flag size={14} />
              </button>

            </footer>
          </article>

          {/* Comment/Reply Input Box */}
          {!isReadOnly && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex gap-4 items-start border-l-4 border-edu-secondary">
            <div className="w-9 h-9 rounded-full bg-edu-secondary text-white font-bold text-xs flex items-center justify-center shrink-0">
              MS
            </div>
            <form onSubmit={handlePostReply} className="flex-grow space-y-3">
              <textarea
                value={newReplyContent}
                onChange={(e) => setNewReplyContent(e.target.value)}
                placeholder="Escribe tu aporte, consejo o pregunta sobre este tema..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-edu-secondary focus:ring-2 focus:ring-edu-secondary/20 rounded-lg p-3 text-xs text-slate-700 focus:outline-none min-h-[80px] resize-none placeholder:text-slate-400"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-edu-primary hover:bg-edu-secondary text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Send size={12} />
                  <span>Publicar Comentario</span>
                </button>
              </div>
            </form>
          </div>
          )}

          {/* Thread Replies List */}
          <section className="space-y-4">
            
            {rootReplies.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Aún no hay comentarios. Sé el primero en responder.
              </div>
            ) : (
              rootReplies.map((reply) => {
                const nested = getNestedReplies(reply.id);
                return (
                  <div key={reply.id} className="space-y-3">
                    
                    {/* Root Reply Card */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-3">
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-edu-primary text-white font-bold text-[10px] flex items-center justify-center overflow-hidden border border-slate-100">
                            {reply.authorAvatar ? (
                              <img src={reply.authorAvatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              reply.authorName.slice(0, 2).toUpperCase()
                            )}
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-bold text-slate-800 leading-none">
                              {reply.authorName} <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide ml-2 bg-slate-50 px-1.5 py-0.5 rounded">{reply.authorRole}</span>
                            </p>
                            <p className="text-[9px] text-slate-400 mt-1">{reply.date}</p>
                          </div>
                        </div>

                        {/* Comment Votes panel */}
                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-md py-0.5 px-1 select-none">
                          <button
                            onClick={() => handleVoteReply(reply.id, 'up')}
                            disabled={isReadOnly}
                            className={`p-0.5 rounded hover:bg-slate-200/50 transition-colors cursor-pointer ${
                              reply.userVoted === 'up' ? 'text-green-600' : 'text-slate-400'
                            }`}
                          >
                            <ChevronUp size={14} />
                          </button>
                          <span className={`text-[10px] font-bold px-1 min-w-[12px] text-center ${
                            reply.userVoted === 'up' ? 'text-green-600' : reply.userVoted === 'down' ? 'text-red-500' : 'text-slate-600'
                          }`}>
                            {reply.score}
                          </span>
                          <button
                            onClick={() => handleVoteReply(reply.id, 'down')}
                            disabled={isReadOnly}
                            className={`p-0.5 rounded hover:bg-slate-200/50 transition-colors cursor-pointer ${
                              reply.userVoted === 'down' ? 'text-red-500' : 'text-slate-400'
                            }`}
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pl-10">
                        {reply.content}
                      </p>

                      <div className="pl-10 flex gap-4 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        {!isReadOnly && (
                        <button
                          onClick={() => {
                            setActiveReplyId(activeReplyId === reply.id ? null : reply.id);
                            setNestedReplyContent('');
                          }}
                          className="hover:text-edu-secondary transition-colors cursor-pointer"
                        >
                          Responder
                        </button>
                        )}
                      </div>

                      {/* Inline Reply input for nested replying */}
                      {activeReplyId === reply.id && (
                        <form
                          onSubmit={(e) => handlePostNestedReply(e, reply.id)}
                          className="pl-10 mt-3 pt-3 border-t border-slate-100 flex gap-3 items-end"
                        >
                          <textarea
                            value={nestedReplyContent}
                            onChange={(e) => setNestedReplyContent(e.target.value)}
                            placeholder={`Responder a ${reply.authorName}...`}
                            className="flex-grow bg-slate-50 border border-slate-200 focus:border-edu-secondary focus:ring-1 focus:ring-edu-secondary rounded-lg p-2 text-xs text-slate-700 min-h-[50px] resize-none outline-none focus:outline-none"
                            required
                          />
                          <button
                            type="submit"
                            className="h-8 px-4 bg-edu-secondary hover:bg-edu-primary text-white rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Enviar
                          </button>
                        </form>
                      )}

                    </div>

                    {/* Indented Nested Replies */}
                    {nested.map((nestReply) => (
                      <div 
                        key={nestReply.id} 
                        className="ml-8 md:ml-12 bg-slate-50/80 p-4 rounded-xl border border-slate-200/40 shadow-[inset_2px_0_0_0_rgba(46,134,193,0.3)] space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6.5 h-6.5 rounded-full bg-edu-secondary text-white font-bold text-[8px] flex items-center justify-center overflow-hidden border border-slate-100">
                              {nestReply.authorAvatar ? (
                                <img src={nestReply.authorAvatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                nestReply.authorName.slice(0, 2).toUpperCase()
                              )}
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-bold text-slate-800 leading-none">
                                {nestReply.authorName} <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide ml-1 bg-white px-1 py-0.5 rounded border border-slate-100">{nestReply.authorRole}</span>
                              </p>
                              <p className="text-[9px] text-slate-400 mt-1">{nestReply.date}</p>
                            </div>
                          </div>

                          {/* Nested Comment Votes panel */}
                          <div className="flex items-center gap-0.5 bg-white border border-slate-100 rounded-md py-0.5 px-0.5 select-none">
                            <button
                              onClick={() => handleVoteReply(nestReply.id, 'up')}
                              disabled={isReadOnly}
                              className={`p-0.5 rounded hover:bg-slate-200/50 transition-colors cursor-pointer ${
                                nestReply.userVoted === 'up' ? 'text-green-600' : 'text-slate-400'
                              }`}
                            >
                              <ChevronUp size={12} />
                            </button>
                            <span className={`text-[9px] font-bold px-1 min-w-[10px] text-center ${
                              nestReply.userVoted === 'up' ? 'text-green-600' : nestReply.userVoted === 'down' ? 'text-red-500' : 'text-slate-500'
                            }`}>
                              {nestReply.score}
                            </span>
                            <button
                              onClick={() => handleVoteReply(nestReply.id, 'down')}
                              disabled={isReadOnly}
                              className={`p-0.5 rounded hover:bg-slate-200/50 transition-colors cursor-pointer ${
                                nestReply.userVoted === 'down' ? 'text-red-500' : 'text-slate-400'
                              }`}
                            >
                              <ChevronDown size={12} />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed pl-8">
                          {nestReply.content}
                        </p>
                      </div>
                    ))}

                  </div>
                );
              })
            )}

          </section>

        </div>

        {/* Right Column: Widgets */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Related topics */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-edu-primary pb-2 border-b border-slate-100 uppercase tracking-wide">
              Temas Relacionados
            </h3>
            <ul className="space-y-4">
              {relatedTopics.map((topic, idx) => (
                <li key={idx}>
                  <a className="group block cursor-pointer text-left" href="#" onClick={(e) => e.preventDefault()}>
                    <span className="block text-xs font-bold text-slate-700 group-hover:text-edu-secondary transition-colors line-clamp-2 leading-snug">
                      {topic.title}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {topic.category} • {topic.comments} comentarios
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Popular discussions ranking */}
          <section className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-edu-primary pb-2 border-b border-slate-100 uppercase tracking-wide">
              Discusiones Populares
            </h3>
            <div className="space-y-3.5">
              {popularDiscussions.map((topic, idx) => (
                <div key={idx} className="flex gap-3 items-center text-left">
                  <span className="text-edu-secondary font-bold text-sm opacity-55 shrink-0">
                    {topic.num}
                  </span>
                  <p className="text-xs font-semibold text-slate-700 leading-tight hover:text-edu-primary transition-colors cursor-pointer line-clamp-2">
                    {topic.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Top contributors & badges banner */}
          <section className="bg-edu-primary text-white p-5 rounded-2xl shadow-sm space-y-4 text-left relative overflow-hidden">
            <div className="absolute top-[-20px] right-[-20px] w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
            <h3 className="text-[10px] font-bold text-edu-accent uppercase tracking-wider flex items-center gap-1">
              <Award size={12} />
              <span>Colaboradores Destacados</span>
            </h3>
            
            {/* Contributors Avatars stack */}
            <div className="flex -space-x-2.5 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" className="inline-block h-8 w-8 rounded-full ring-2 ring-edu-primary object-cover" alt="" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" className="inline-block h-8 w-8 rounded-full ring-2 ring-edu-primary object-cover" alt="" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" className="inline-block h-8 w-8 rounded-full ring-2 ring-edu-primary object-cover" alt="" />
              <div className="h-8 w-8 rounded-full bg-edu-secondary/40 text-edu-accent font-bold text-[10px] ring-2 ring-edu-primary flex items-center justify-center">
                +12
              </div>
            </div>

            <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
              ¡Aportá respuestas de calidad en los temas del foro y sumá puntos de reputación escolar para ganar insignias y roles dentro de la comunidad!
            </p>
          </section>

        </aside>

      </div>

    </div>
  );
};
