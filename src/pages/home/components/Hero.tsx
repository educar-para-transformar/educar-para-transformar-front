import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroPeople from '../../../assets/service/hero-view-future.png';

export const Hero: React.FC = () => {
  return (
    <section className="relative flex h-[95vh] w-full items-end overflow-hidden bg-edu-dark">
      <div className="absolute inset-0 h-full w-full">
        <img
          src={heroPeople}
          alt="Estudiantes colaborando en el campus"
          className="h-full w-full animate-[ken-burns_30s_ease-in-out_infinite_alternate] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 md:px-12 md:pb-20">
        <div className="max-w-4xl">
          <div className="mb-5 inline-block rounded border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white md:text-sm">
              Comunidad Educativa
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[0.95] tracking-tighter text-white drop-shadow-xl md:text-7xl lg:text-8xl">
            Formando el futuro <br />
            junto a ti
          </h1>

          <p className="mb-10 max-w-2xl text-lg font-medium leading-relaxed text-white/90 drop-shadow md:text-xl">
            Vivi la excelencia de una educacion diseniada para nutrir el potencial
            humano, inspirar valores solidos y potenciar el talento de cada estudiante.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/inscripcion"
              className="group inline-flex cursor-pointer items-center gap-3 bg-edu-primary px-10 py-4 text-sm font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-edu-secondary hover:shadow-2xl md:text-lg"
            >
              <span>INSCRIBITE AQUI</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/registro"
              className="inline-flex cursor-pointer items-center gap-2 border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:text-edu-dark md:text-base"
            >
              REGISTRO AL SISTEMA
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-12 z-10 hidden animate-bounce flex-col items-center gap-2 text-white/80 lg:flex">
        <ChevronDown size={24} />
      </div>

      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
      `}</style>
    </section>
  );
};
