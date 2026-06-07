import React from 'react';
import { ArrowRight } from 'lucide-react';
import imagenInfraestructura from '../../../assets/service/imagen-infraestructura.png';
import imagenBiblioteca from '../../../assets/service/imagen-biblioteca.png';
import imagenDeportes from '../../../assets/service/imagen-deportes.png';
import imagenAulas from '../../../assets/service/imagen-aulas.png';
import imagenLaboratorio from '../../../assets/service/imagen-laboratorio.png';
import imagenPatio from '../../../assets/service/imagen-patio.png';

interface GalleryCardProps {
  imgSrc: string;
  title: string;
  className?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ imgSrc, title, className = "" }) => (
  <div className={`group relative overflow-hidden rounded-xl shadow-sm bg-gray-100 h-[280px] md:h-[400px] ${className}`}>
    <img 
      src={imgSrc} 
      alt={title} 
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
      <h4 className="text-white text-lg font-semibold tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        {title}
      </h4>
    </div>
    {/* Optional permanent subtle label at bottom left for mobile readability */}
    <div className="absolute bottom-4 left-4 md:hidden bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
      {title}
    </div>
  </div>
);

export const GallerySection: React.FC = () => {
  return (
    <section className="pt-6 pb-12 px-4 max-w-7xl mx-auto relative">
      {/* Compact separating line */}
      <div className="max-w-4xl mx-auto border-t border-slate-200 opacity-70 mb-12"></div>
      
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-edu-dark tracking-tight mb-4">
          Recorré Nuestras Instalaciones
        </h2>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          Cada espacio refleja nuestro compromiso con la educación y el bienestar de nuestros estudiantes.
        </p>
      </div>

      {/* Asymmetric Premium Grid with exactly 6 key images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1: Aulas Luminosas (col-span-2) & Moderna Infraestructura (col-span-1) */}
        <div className="md:col-span-2">
          <GalleryCard imgSrc={imagenAulas} title="Aulas Luminosas" />
        </div>
        <div className="md:col-span-1">
          <GalleryCard imgSrc={imagenInfraestructura} title="Moderna Infraestructura" />
        </div>

        {/* Row 2: Biblioteca Central (col-span-1), Laboratorio de Innovación (col-span-1) & Campo de Deportes (col-span-1) */}
        <div className="md:col-span-1">
          <GalleryCard imgSrc={imagenBiblioteca} title="Biblioteca Central" />
        </div>
        <div className="md:col-span-1">
          <GalleryCard imgSrc={imagenLaboratorio} title="Laboratorio de Innovación" />
        </div>
        <div className="md:col-span-1">
          <GalleryCard imgSrc={imagenDeportes} title="Campo de Deportes" />
        </div>

        {/* Row 3: Patio y Espacios Verdes (col-span-3 - wide panoramic view) */}
        <div className="md:col-span-3">
          <GalleryCard imgSrc={imagenPatio} title="Patio y Espacios Verdes" className="md:h-[450px]" />
        </div>
      </div>

      {/* CTA Button at the end of the Gallery */}
      <div className="mt-12 text-center">
        <a 
          href="#contacto" 
          className="inline-flex items-center gap-2 bg-edu-primary hover:bg-edu-secondary text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-edu-primary/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-lg"
        >
          <span>Agendar una Visita Guiada</span>
          <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};

