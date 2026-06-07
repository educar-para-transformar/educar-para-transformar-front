import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import imagenComunidad from '../../../assets/service/comunidad-vida.png';

export const CommunitySection: React.FC = () => {
  return (
    <section className="pt-6 pb-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Compact separating line */}
        <div className="w-full max-w-4xl mx-auto border-t border-slate-200 opacity-70 mb-12"></div>

        <h2 className="text-3xl md:text-5xl font-bold text-edu-dark mb-4 tracking-tight">
          Somos <span className="text-edu-primary">Educar Para Transformar</span>
        </h2>
        
        <p className="text-lg md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
          ¿Quieres descubrir cómo se vive en nuestra institución? <br className="hidden md:block"/>
          ¡Prepárate para adentrarte en nuestra comunidad!
        </p>
        
        <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 aspect-[16/9] md:aspect-[21/9] group mb-12">
          <img 
            src={imagenComunidad} 
            alt="Nuestra comunidad viviendo la experiencia Educar Para Transformar" 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Subtle aesthetic overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-edu-dark/30 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
        </div>

        {/* Academic CTA Button */}
        <div className="mt-12 text-center">
          <Link
            to="/niveles"
            className="inline-flex items-center gap-2 bg-edu-primary hover:bg-edu-secondary text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-edu-primary/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-lg"
          >
            <span>Más información sobre el ámbito académico</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

