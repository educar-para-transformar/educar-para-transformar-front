import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import imagenHero from '../../assets/service/hero-trabaja-con-nosotros.png';

/**
 * Página de Postulación Laboral "Trabajá con Nosotros".
 * Permite la carga de datos personales, puesto deseado y adjuntar el CV en PDF mediante arrastrar y soltar (Drag-and-Drop).
 */
export const JobsPage: React.FC = () => {
  // Estado local para almacenar los datos textuales de los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Docente Nivel Inicial',
    message: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Referencia mutable para controlar el selector de archivos input nativo oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestor del cambio de campos textuales e inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validador y gestor del archivo cargado a través del input tradicional
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validamos que el archivo sea exclusivamente de formato PDF
      if (file.type !== 'application/pdf') {
        setError('Únicamente se permiten archivos en formato PDF.');
        setSelectedFile(null);
        return;
      }
      
      // Validamos que el archivo pese menos o igual a 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo supera el tamaño máximo permitido de 5MB.');
        setSelectedFile(null);
        return;
      }
      
      setError(null);
      setSelectedFile(file);
    }
  };

  // Previene el comportamiento por defecto al arrastrar sobre el área para habilitar la soltura
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Capturador del archivo soltado dentro de la zona interactiva (Drag-and-Drop)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (file.type !== 'application/pdf') {
        setError('Únicamente se permiten archivos en formato PDF.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo supera el tamaño máximo permitido de 5MB.');
        return;
      }
      
      setError(null);
      setSelectedFile(file);
    }
  };

  // Limpia el archivo seleccionado y resetea el valor del selector input
  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se dispare el evento clic de la caja contenedora
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validador final y procesador del envío del formulario de postulación
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Por favor completá todos los campos requeridos (*).');
      return;
    }
    if (!selectedFile) {
      setError('Por favor adjuntá tu Currículum Vitae en formato PDF.');
      return;
    }

    setError(null);
    setIsSubmitted(true); // Cambia el estado para desplegar la confirmación de éxito
  };

  // Restablece todos los estados al valor inicial para permitir una nueva postulación
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: 'Docente Nivel Inicial',
      message: '',
    });
    setSelectedFile(null);
    setIsSubmitted(false);
  };

  return (
    <div className="animate-fadeIn">
      {/* Sección Hero: Encabezado descriptivo de la sección */}
      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-16 px-4 text-center relative overflow-hidden">
        <img src={imagenHero} alt="" className='absolute inset-0 w-full h-full object-cover opacity-50' />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Trabajá con nosotros</h1>
          <p className="text-edu-accent text-sm md:text-base max-w-xl mx-auto">
            Sumate a nuestro equipo docente y no docente para transformar juntos el futuro de la educación
          </p>
        </div>
      </section>

      {/* Sección del Formulario */}
      <section className="py-12 max-w-xl mx-auto px-4">
        <div className="bg-edu-card border border-slate-200/60 rounded-lg p-6 shadow-sm">
          <h2 className="text-base font-bold text-edu-primary mb-6 pb-2 border-b border-edu-light uppercase tracking-wide">
            Enviar currículum
          </h2>

          {isSubmitted ? (
            /* Pantalla Animada de Éxito */
            <div className="text-center py-8 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-sm font-bold text-edu-dark">¡Postulación recibida con éxito!</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Muchas gracias por tu interés en formar parte de <strong>Educar para Transformar</strong>. Nuestro equipo de recursos humanos evaluará tu CV y se pondrá en contacto si tu perfil coincide con alguna vacante disponible.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 bg-edu-primary hover:bg-edu-primary/95 text-white font-semibold text-xs px-5 py-2.5 rounded shadow-sm transition-all cursor-pointer"
              >
                ENVIAR OTRA POSTULACIÓN
              </button>
            </div>
          ) : (
            /* Formulario Interactivo */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded text-[11px] text-red-600 flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Nombre completo */}
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Pérez"
                  className="w-full h-9 px-3 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-edu-primary focus:border-edu-primary bg-white transition-all text-edu-dark"
                  required
                />
              </div>

              {/* Fila Correo y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Correo */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ej: juan@gmail.com"
                    className="w-full h-9 px-3 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-edu-primary focus:border-edu-primary bg-white transition-all text-edu-dark"
                    required
                  />
                </div>
                {/* Teléfono */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                    Teléfono de contacto *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej: 3624123456"
                    className="w-full h-9 px-3 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-edu-primary focus:border-edu-primary bg-white transition-all text-edu-dark"
                    required
                  />
                </div>
              </div>

              {/* Puesto deseado */}
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                  Puesto al que se postula *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full h-9 px-2 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-edu-primary focus:border-edu-primary bg-white transition-all text-edu-dark cursor-pointer"
                >
                  <option value="Docente Nivel Inicial">Docente Nivel Inicial</option>
                  <option value="Docente Nivel Primario">Docente Nivel Primario</option>
                  <option value="Docente Nivel Secundario">Docente Nivel Secundario</option>
                  <option value="Personal Administrativo">Personal Administrativo</option>
                  <option value="Personal de Maestranza y Servicios">Personal de Maestranza y Servicios</option>
                </select>
              </div>

              {/* Área interactiva Drag-and-Drop de PDF */}
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                  Adjuntar Currículum Vitae (PDF) *
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-edu-accent/40 hover:border-edu-primary/60 transition-colors p-5 text-center rounded-lg cursor-pointer bg-[#F8FAFC]/50 flex flex-col items-center justify-center space-y-1.5"
                >
                  {selectedFile ? (
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded px-3 py-2 text-xs text-edu-dark shadow-sm">
                      <FileText size={16} className="text-edu-primary shrink-0" />
                      <span className="font-semibold max-w-[220px] truncate">{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-slate-400 hover:text-red-500 transition-colors shrink-0 p-0.5 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload size={22} className="text-edu-primary" />
                      <span className="text-[10px] text-edu-primary font-semibold">
                        Hacé clic para seleccionar o arrastrá tu archivo aquí
                      </span>
                      <span className="text-[8px] text-slate-400">
                        Formatos permitidos: PDF. Máx 5MB
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Mensaje o presentación breve */}
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                  Breve presentación / Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Contanos brevemente sobre tu experiencia e interés en formar parte..."
                  className="w-full p-3 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-edu-primary focus:border-edu-primary bg-white transition-all text-edu-dark h-20 resize-none"
                />
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                className="w-full bg-edu-secondary hover:bg-edu-secondary/90 text-white font-bold text-xs py-3 rounded shadow-sm transition-all cursor-pointer uppercase tracking-wider"
              >
                ENVIAR POSTULACIÓN
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
