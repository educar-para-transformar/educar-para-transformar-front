import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ChevronUp, 
  ChevronDown, 
  MessageSquare, 
  Share2, 
  Filter, 
  GraduationCap, 
  Compass, 
  Users, 
  ShoppingBag, 
  Trophy, 
  ArrowRight,
  Send,
  X,
  FileText
} from 'lucide-react';
import { forumStore } from '../../features/comunidad/services/forumStore';
import { getSession } from '../../features/auth/services/demoAuth';
import type { Discussion } from '../../features/comunidad/services/forumStore';

export const ForoFeedPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isReadOnly = getSession()?.role === 'parent';

  // State
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [activeTab, setActiveTab] = useState<'recent' | 'trending' | 'popular'>('recent');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Académico' | 'Vida Escolar' | 'Grupos de Estudio' | 'Intercambio' | 'Deportes'>('Académico');
  const [newLead, setNewLead] = useState('');
  const [newBody, setNewBody] = useState('');

  // Load discussions on mount & filters
  useEffect(() => {
    // Check if modal needs to be opened from URL
    if (searchParams.get('create') === 'true') {
      if (isReadOnly) {
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    }
    loadDiscussions();
  }, [isReadOnly, searchParams]);

  const loadDiscussions = () => {
    let list = forumStore.getDiscussions();
    
    // Filter by category if query param exists
    const catFilter = searchParams.get('category');
    if (catFilter) {
      list = list.filter(d => d.category === catFilter);
    }

    // Filter by search query if exists
    const searchFilter = searchParams.get('search');
    if (searchFilter) {
      list = list.filter(d => 
        d.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        d.lead.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Sort based on tab
    if (activeTab === 'popular') {
      list.sort((a, b) => b.score - a.score);
    } else if (activeTab === 'trending') {
      list.sort((a, b) => b.repliesCount - a.repliesCount);
    } else {
      // Recent (default sort by ID desc)
      list.sort((a, b) => b.id - a.id);
    }

    setDiscussions(list);
  };

  useEffect(() => {
    loadDiscussions();
  }, [activeTab]);

  const handleVote = (id: number, dir: 'up' | 'down') => {
    if (isReadOnly) {
      return;
    }
    forumStore.voteDiscussion(id, dir);
    loadDiscussions();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Remove "create" query param from URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('create');
    setSearchParams(newParams);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (isReadOnly) {
      handleCloseModal();
      return;
    }

    if (!newTitle || !newLead || !newBody) {
      alert('Por favor, completá los campos obligatorios.');
      return;
    }

    const profile = forumStore.getProfile();
    const contentParagraphs = newBody.split('\n\n').filter(p => p.trim().length > 0);

    forumStore.addDiscussion({
      category: newCategory,
      authorName: profile.name,
      authorHandle: '@' + profile.name.toLowerCase().replace(/\s+/g, '_'),
      authorRole: 'Alumno',
      authorAvatar: profile.avatar,
      title: newTitle,
      date: 'Hace unos instantes',
      lead: newLead,
      content: contentParagraphs
    });

    // Reset form and close modal
    setNewTitle('');
    setNewLead('');
    setNewBody('');
    handleCloseModal();
    loadDiscussions();
  };

  const handleCategorySelect = (categoryName: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryName) {
      newParams.set('category', categoryName);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const currentCategory = searchParams.get('category') || 'Todas';

  const categoryIcons: Record<string, React.ReactNode> = {
    'Todas': <Compass size={16} />,
    'Académico': <GraduationCap size={16} />,
    'Vida Escolar': <Users size={16} />,
    'Grupos de Estudio': <MessageSquare size={16} />,
    'Intercambio': <ShoppingBag size={16} />,
    'Deportes': <Trophy size={16} />
  };

  return (
    <div className="space-y-6">
      
      {/* Bento Banner */}
      <div className="relative rounded-2xl overflow-hidden h-36 md:h-44 shadow-sm border border-slate-200/40 flex items-center px-6 md:px-10">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200" 
          alt="Student Campus"
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-edu-primary/95 to-edu-secondary/40 mix-blend-multiply" />
        <div className="relative z-10 text-left text-white max-w-xl space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Foro Estudiantil</h2>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
            La comunidad oficial de alumnos de Educar para Transformar. Compartí ideas, resolvé dudas y colaborá con tus compañeros.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Sidebar: Categories (Desktop only) */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categorías</h3>
            <nav className="flex flex-col gap-1">
              {['Todas', 'Académico', 'Vida Escolar', 'Grupos de Estudio', 'Intercambio', 'Deportes'].map((cat) => {
                const active = (cat === 'Todas' && !searchParams.get('category')) || searchParams.get('category') === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat === 'Todas' ? null : cat)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer text-left ${
                      active
                        ? 'bg-edu-secondary/10 text-edu-primary font-bold'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-edu-secondary'
                    }`}
                  >
                    <div className={active ? 'text-edu-secondary' : 'text-slate-400'}>
                      {categoryIcons[cat]}
                    </div>
                    <span>{cat}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Exam season support widget */}
          <div className="rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer border border-slate-200/50">
            <img 
              alt="Estudiando" 
              className="w-full h-44 object-cover group-hover:scale-103 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-left">
              <span className="text-[8px] font-bold text-edu-accent uppercase tracking-widest">Tutorías Escolares</span>
              <h4 className="text-white font-bold text-xs mt-1">Apoyo en Época de Exámenes</h4>
              <p className="text-[10px] text-slate-300 leading-snug mt-1.5 flex items-center gap-1 group-hover:text-white transition-colors">
                <span>Reservar turno con un mentor</span>
                <ArrowRight size={10} />
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Category Horizontal Slider */}
        <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 -mx-4 px-4 scrollbar-none shrink-0">
          {['Todas', 'Académico', 'Vida Escolar', 'Grupos de Estudio', 'Intercambio', 'Deportes'].map((cat) => {
            const active = (cat === 'Todas' && !searchParams.get('category')) || searchParams.get('category') === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat === 'Todas' ? null : cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-edu-primary border-edu-primary text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                {categoryIcons[cat]}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Middle/Right Column: discussions feed */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Feed Filter controls */}
          <div className="bg-white p-3 px-5 rounded-xl border border-slate-200/60 shadow-sm flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('recent')}
                className={`text-xs font-bold uppercase tracking-wider cursor-pointer pb-1 transition-all ${
                  activeTab === 'recent' 
                    ? 'border-b-2 border-edu-secondary text-edu-primary' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Recientes
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                className={`text-xs font-bold uppercase tracking-wider cursor-pointer pb-1 transition-all ${
                  activeTab === 'trending' 
                    ? 'border-b-2 border-edu-secondary text-edu-primary' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Populares (Respuestas)
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`text-xs font-bold uppercase tracking-wider cursor-pointer pb-1 transition-all ${
                  activeTab === 'popular' 
                    ? 'border-b-2 border-edu-secondary text-edu-primary' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Más Valoradas
              </button>
            </div>
            <div className="text-slate-400 flex items-center gap-1.5 text-xs font-semibold">
              <Filter size={14} />
              <span className="hidden sm:inline">Filtrado: {currentCategory}</span>
            </div>
          </div>

          {/* Discussions List */}
          {discussions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm py-16 text-center max-w-lg mx-auto px-6">
              <div className="w-14 h-14 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={28} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No hay discusiones</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                No se encontraron publicaciones que coincidan con la búsqueda actual.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {discussions.map((disc) => (
                <article
                  key={disc.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 items-start text-left relative group"
                >
                  {/* Upvote/Downvote panel */}
                  <div className="flex flex-col items-center bg-slate-50 rounded-lg py-1 px-1.5 gap-1 select-none border border-slate-100/50">
                      <button
                      onClick={() => handleVote(disc.id, 'up')}
                      disabled={isReadOnly}
                      className={`p-1 rounded hover:bg-slate-200/50 transition-colors cursor-pointer ${
                        disc.userVoted === 'up' ? 'text-green-600' : 'text-slate-400'
                      }`}
                    >
                      <ChevronUp size={18} />
                    </button>
                    <span className={`text-xs font-bold leading-none ${
                      disc.userVoted === 'up' ? 'text-green-600' : disc.userVoted === 'down' ? 'text-red-500' : 'text-slate-700'
                    }`}>
                      {disc.score}
                    </span>
                    <button
                      onClick={() => handleVote(disc.id, 'down')}
                      disabled={isReadOnly}
                      className={`p-1 rounded hover:bg-slate-200/50 transition-colors cursor-pointer ${
                        disc.userVoted === 'down' ? 'text-red-500' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  {/* Post details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-edu-secondary/10 text-edu-primary text-[9px] font-bold uppercase rounded-full tracking-wider">
                        {disc.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Publicado por <strong className="text-slate-500 font-semibold">{disc.authorHandle}</strong> • {disc.date}
                      </span>
                    </div>

                    <Link to={`/privado/foro/discusion/${disc.id}`} className="block">
                      <h3 className="text-sm md:text-base font-bold text-slate-800 hover:text-edu-secondary transition-colors leading-snug line-clamp-2">
                        {disc.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {disc.lead}
                    </p>

                    {/* Stats footer */}
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100/60">
                      <div className="flex gap-4">
                        <Link 
                          to={`/privado/foro/discusion/${disc.id}`}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-edu-secondary transition-colors"
                        >
                          <MessageSquare size={13} />
                          <span>{disc.repliesCount} respuestas</span>
                        </Link>
                        <button
                          onClick={() => alert('Enlace de discusión copiado al portapapeles')}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-edu-secondary transition-colors cursor-pointer"
                        >
                          <Share2 size={13} />
                          <span>Compartir</span>
                        </button>
                      </div>

                      {/* Replying Avatars Preview */}
                      {disc.replies.length > 0 && (
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {disc.replies.slice(0, 3).map((rep) => (
                            <div 
                              key={rep.id} 
                              className="w-5.5 h-5.5 rounded-full border border-white bg-slate-200 overflow-hidden"
                              title={rep.authorName}
                            >
                              {rep.authorAvatar ? (
                                <img src={rep.authorAvatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[7px] font-bold bg-slate-300 text-slate-700 uppercase">
                                  {rep.authorName.slice(0, 2)}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </article>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Crear Discusión Modal */}
      {isModalOpen && !isReadOnly && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-scaleUp">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-sm text-edu-primary flex items-center gap-2 uppercase tracking-wide">
                <MessageSquare size={18} className="text-edu-secondary" />
                <span>Nueva Publicación en el Foro</span>
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-left">
              
              {/* Category */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Categoría del Tema
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-edu-secondary focus:border-edu-secondary text-slate-700 outline-none"
                >
                  <option value="Académico">Académico</option>
                  <option value="Vida Escolar">Vida Escolar</option>
                  <option value="Grupos de Estudio">Grupos de Estudio</option>
                  <option value="Intercambio">Intercambio</option>
                  <option value="Deportes">Deportes</option>
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Título de la Discusión <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: ¿Bibliografía recomendada para Análisis Matemático I?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 focus:border-edu-secondary focus:ring-2 focus:ring-edu-secondary/20 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  required
                />
              </div>

              {/* Lead / Short Summary */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Introducción / Resumen Breve <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Añade un subtítulo breve para el feed (máx 120 car.)..."
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 focus:border-edu-secondary focus:ring-2 focus:ring-edu-secondary/20 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  required
                />
              </div>

              {/* Content Body */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Explicación / Contenido de la Consulta <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Escribe en detalle tu consulta, propuesta o sugerencia..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full h-32 bg-slate-50 border border-slate-200 focus:border-edu-secondary focus:ring-2 focus:ring-edu-secondary/20 rounded-lg p-3 text-xs text-slate-700 focus:outline-none placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-edu-secondary hover:bg-edu-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Publicar Tema</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
