import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Calendar, 
  Edit3, 
  Trash2, 
  Eye, 
  FileText, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { newsStore } from '../../features/noticias/services/newsStore';
import type { Article } from '../../features/noticias/services/newsStore';

export const GestionNoticiasPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  // Load articles on mount
  useEffect(() => {
    setArticles(newsStore.getArticles());
  }, []);

  const handleDelete = (id: number) => {
    newsStore.deleteArticle(id);
    setArticles(newsStore.getArticles());
    setShowDeleteModal(null);
  };

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.lead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'Todas' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Todas', 'Institucional', 'Académico', 'Comunidad', 'Deportes', 'Eventos'];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top action bar: Search, Filter & New Button */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search & Category filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por título o introducción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-edu-secondary focus:border-edu-secondary text-slate-800 transition-all"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-edu-secondary focus:border-edu-secondary text-slate-700 transition-all outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'Todas' ? 'Todas las categorías' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Create news button */}
        <Link
          to="/privado/crear-noticia"
          className="w-full md:w-auto h-10 px-5 bg-edu-secondary hover:bg-edu-primary text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          <span>Nueva Noticia</span>
        </Link>
      </div>

      {/* Articles list */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm py-16 text-center max-w-lg mx-auto px-6">
          <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={28} />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No se encontraron noticias</h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            {searchQuery || categoryFilter !== 'Todas' 
              ? 'Intentá modificando los filtros o la búsqueda.' 
              : 'Todavía no hay noticias creadas. ¡Comenzá redactando la primera!'}
          </p>
          {(searchQuery || categoryFilter !== 'Todas') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('Todas');
              }}
              className="mt-4 text-xs font-bold text-edu-secondary hover:text-edu-primary underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center relative group"
            >
              {/* Thumbnail image */}
              <div className="w-full sm:w-36 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                <img
                  src={article.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200'}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200';
                  }}
                />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 text-left w-full">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-2.5 py-0.5 bg-edu-secondary/10 text-edu-primary text-[10px] font-bold uppercase rounded-full tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Calendar size={12} />
                    {article.date}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 line-clamp-1 leading-snug group-hover:text-edu-secondary transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1 leading-relaxed">
                  {article.lead}
                </p>
                
                {/* Author and read time */}
                <p className="text-[10px] text-slate-400 mt-2">
                  Por <strong className="text-slate-500">{article.author}</strong> • {article.readTime}
                </p>
              </div>

              {/* Status pill & Action buttons */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                {/* Status indicator */}
                <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100/60 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                  <CheckCircle size={12} className="text-green-600" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Publicada</span>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="flex items-center gap-1.5 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link
                    to={`/privado/editar-noticia/${article.id}`}
                    title="Editar noticia"
                    className="p-2 text-slate-400 hover:text-edu-secondary hover:bg-slate-50 rounded-lg border border-slate-200/40 hover:border-edu-secondary/30 transition-all cursor-pointer"
                  >
                    <Edit3 size={15} />
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(article.id)}
                    title="Eliminar noticia"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-slate-200/40 hover:border-red-200/30 transition-all cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                  <a
                    href="/noticias"
                    target="_blank"
                    rel="noreferrer"
                    title="Ver en el portal"
                    className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg border border-slate-200/40 hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <Eye size={15} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal !== null && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-scaleUp text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm text-slate-800">¿Confirmás la eliminación?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Esta acción no se puede deshacer. Se borrará permanentemente la noticia{' '}
                <strong>
                  "{articles.find(a => a.id === showDeleteModal)?.title}"
                </strong>{' '}
                del portal institucional.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
