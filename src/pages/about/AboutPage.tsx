import React from 'react';
import { Target, Eye, Star, Calendar, Award, Users, BookOpen, GraduationCap, Building, Laptop, ArrowRight } from 'lucide-react';
import { FadeInSection } from '../../shared/components/FadeInSection';
import imagenDirectivo1 from '../../assets/service/directivos/directivos-maria-garcia.jpg';
import imagenDirectivo2 from '../../assets/service/directivos/directivos-raul-lopez.jpg';
import imagenDirectivo3 from '../../assets/service/directivos/directivos-ana-perez.jpg';
import imagenDirectivo4 from '../../assets/service/directivos/directivos-jorge-martin.jpg';

export const AboutPage: React.FC = () => {
  
  const imagenCampusNeutral = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80';
  const imagenNivelesEducativos = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80';

  const values = [
    { icon: <Target size={36} className="text-white" />, title: 'Misión', desc: 'Brindar educación integral de calidad que forme ciudadanos comprometidos con su comunidad, listos para los desafíos del mañana.', bgImg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80', },
    { icon: <Eye size={36} className="text-white" />, title: 'Visión', desc: 'Ser un referente educativo de primer nivel en Resistencia, liderando la vanguardia pedagógica y la transformación digital.', bgImg: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=600&q=80', },
    { icon: <Star size={36} className="text-white" />, title: 'Valores', desc: 'Fomentar el respeto, la solidaridad, la búsqueda implacable de la excelencia académica y un profundo compromiso social.', bgImg: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80', },
  ];

  const projectStages = [
    { year: 'Etapa  1', title: 'Visión Educativa', desc: 'Definimos un modelo académico centrado en la innovación, los valores y el aprendizaje integral.', icon: <BookOpen size={18} className="text-edu-secondary" /> },
    { year: 'Etapa  2', title: 'Espacios de Aprendizaje', desc: 'Creamos espacios diseñados para potenciar la creatividad, el deporte y la tecnología.', icon: <Building size={18} className="text-edu-secondary" /> },
    { year: 'Etapa  3', title: 'Innovación Tecnológica', desc: 'Implementación de laboratorios, conectividad avanzada y plataformas de vanguardia digital.', icon: <Laptop size={18} className="text-edu-secondary" /> },
    { year: 'Etapa  4', title: 'Comunidad Educativa', desc: 'Formamos un equipo docente comprometido con una educación cercana, humana y de calidad.', icon: <Users size={18} className="text-edu-secondary" /> },
    { year: 'Etapa  5', title: 'Apertura Institucional', desc: 'Abrimos las puertas de EDUCAR PARA TRANSFORMAR para construir juntos el futuro.', icon: <Calendar size={18} className="text-edu-secondary" /> },
  ];

  const team = [
    { name: 'María García', role: 'Directora General', urlImg: imagenDirectivo1 },
    { name: 'Raúl López', role: 'Vicedirector Primaria', urlImg: imagenDirectivo2 },
    { name: 'Ana Pérez', role: 'Vicedirectora Secundaria', urlImg: imagenDirectivo3 },
    { name: 'Jorge Martín', role: 'Representante Legal', urlImg: imagenDirectivo4 },
  ];

  const stats = [
    { icon: <Users size={24} className="text-white" />, value: 'Integral', label: 'Educación Humanista' },
    { icon: <BookOpen size={24} className="text-white" />, value: '3', label: 'Idiomas' },
    { icon: <GraduationCap size={24} className="text-white" />, value: '3', label: 'Niveles Educativos' },
    { icon: <Award size={24} className="text-white" />, value: '+15', label: 'Espacios Formativos' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* 1. HERO */}
      <FadeInSection direction="none" duration={0.8}>
        <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-24 px-4 text-center relative overflow-hidden">
          <img src={imagenCampusNeutral} alt="Vista panorámica de nuestras instalaciones" className="absolute inset-0 w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-edu-primary/40" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-xs uppercase font-bold tracking-widest text-edu-accent bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4 inline-block">Institucional</span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-sm">Quiénes Somos</h1>
            <p className="text-slate-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">Conoce el propósito, el proyecto educativo y el equipo humano detrás del Centro Educativo "Educar para Transformar", comprometido con el futuro de Resistencia.</p>
          </div>
        </section>
      </FadeInSection>

      {/* 2. PROPÓSITO */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeInSection direction="left">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-edu-secondary">Nuestro Propósito</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">Inspiramos, desafiamos y empoderamos a todos nuestros alumnos.</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">Buscamos que se conviertan en miembros comprometidos y éticos de una comunidad global, transformándose en agentes de cambio conscientes de sí mismos, seguros, innovadores y colaborativos.</p>
            <div className="pt-4 border-l-4 border-edu-secondary pl-4 text-slate-700 font-semibold text-lg italic leading-relaxed bg-slate-100/50 pr-2 py-2 rounded-r-lg">
              "Entendemos la educación como el camino fundamental para descubrir el máximo potencial de cada estudiante, guiando su desarrollo académico, social y humano hacia la excelencia."
            </div>
          </div>
        </FadeInSection>
        <FadeInSection direction="right">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-edu-primary to-edu-secondary rounded-2xl opacity-10 blur" />
            <img 
              src={imagenNivelesEducativos} 
              alt="Estudiantes trabajando en proyectos educativos" 
              className="rounded-2xl shadow-lg border border-white object-cover h-72 md:h-96 w-full"
              onError={(e) => { e.currentTarget.src = imagenCampusNeutral; }}
            />
          </div>
        </FadeInSection>
      </section>

      {/* 3. CIFRAS */}
      <section className="bg-gradient-to-r from-edu-primary via-slate-900 to-edu-primary py-12 text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <FadeInSection key={idx} direction="up" duration={0.4 + idx * 0.1}>
              <div className="flex flex-col items-center space-y-2 p-4 border border-white/10 rounded-2xl bg-white/5 hover:border-edu-accent transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-1 backdrop-blur-md">{stat.icon}</div>
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-edu-accent">{stat.value}</span>
                <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">{stat.label}</span>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 4. ESENCIA */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Nuestra Esencia</h2>
          <p className="text-slate-500 text-xs md:text-sm">Los pilares fundamentales que guían cada decisión institucional.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <FadeInSection key={index} direction="up" duration={0.5 + index * 0.1}>
              <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-80 group">
                <img src={item.bgImg} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/75 to-black/30" />
                <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-4 border border-white/10">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 5. PROYECTO EDUCATIVO (Timeline) */}
      <section className="py-20 bg-white border-t border-b border-slate-200/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Nuestro camino</h2>
          </div>
          <div className="relative max-w-5xl mx-auto space-y-12">
            {projectStages.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 pl-12 md:px-8">
                  <FadeInSection direction={index % 2 === 0 ? 'right' : 'left'}>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-edu-secondary uppercase mb-3"><Calendar size={13} /> {item.year}</span>
                      <h4 className="text-sm font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeInSection>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-edu-secondary flex items-center justify-center z-10">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EQUIPO DIRECTIVO */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Equipo Directivo</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <FadeInSection key={index} direction="up" duration={0.5 + index * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img src={member.urlImg} alt={`Foto de ${member.name}`} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h4 className="text-sm font-bold text-white tracking-wide">{member.name}</h4>
                    <p className="text-[11px] text-edu-accent font-medium mt-0.5 uppercase tracking-wider">{member.role}</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-20 bg-edu-primary text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">¿Querés ser parte de esta transformación?</h2>
          <p className="text-lg opacity-90">Explora nuestra propuesta académica y descubrí cómo estamos digitalizando la gestión educativa para tu comodidad.</p>
          <a href="/admisiones" className="inline-flex items-center gap-2 bg-edu-accent text-edu-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            Conocer nuestra propuesta <ArrowRight size={20} />
          </a>
        </div>
      </section>

    </div>
  );
};