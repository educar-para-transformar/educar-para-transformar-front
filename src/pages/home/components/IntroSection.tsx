import React from 'react';

export const IntroSection: React.FC = () => {
  return (
    <section className="pt-16 md:pt-24 pb-8 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-edu-dark tracking-tight mb-6">
          Nuestra Visión
        </h2>
        
        <p className="text-xl md:text-3xl text-gray-800 leading-snug font-medium max-w-4xl mx-auto balance-text">
          "Impulsamos el <span className="text-edu-primary">conocimiento</span>, la <span className="text-edu-primary">creatividad</span> y la <span className="text-edu-primary">innovación</span> a través de una educación integral en todos nuestros niveles."
        </p>
        
        <div className="w-16 h-1 bg-edu-accent mx-auto my-8 rounded-full"></div>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          En <span className="font-bold text-gray-900">Educar Para Transformar</span>, nos guiamos por una perspectiva pedagógica sólida, inclusiva y transformadora. Formamos personas con una mirada crítica, valores profundos y un compromiso activo hacia su entorno, la sociedad y el desarrollo de su comunidad.
        </p>
      </div>
    </section>
  );
};
