# Plataforma Web — Educar para Transformar (Frontend)

Este repositorio contiene la interfaz de usuario moderna, modular y responsiva para la plataforma de la institución educativa **Educar para Transformar** de Resistencia, Chaco. Desarrollada con **React, TypeScript, Vite y Tailwind CSS v4**, la estructura está optimizada para ser fácilmente escalable por cualquier miembro del equipo técnico.

---
📋 Requisitos Previos

Antes de iniciar, asegurate de tener instalado:

Node.js (versión recomendada: 20+)
npm (incluido con Node.js)
Un editor de código como:
VS Code
Cursor
Antigravity

Verificá las versiones ejecutando:

node -v
npm -v
📂 ¿En qué carpeta se ejecutan los comandos?

Todos los comandos deben ejecutarse dentro de la carpeta raíz del frontend.

Ejemplo:

frontend/
├── src/
├── public/
├── package.json
├── vite.config.ts
└── tsconfig.json

La carpeta correcta es la que contiene el archivo:

package.json

2. Ingresar a la carpeta del proyecto
   
cd desktop/educarparatransformar/frontend

4. Instalar dependencias
   
Este comando descarga React, Vite, Tailwind y todas las librerías necesarias.

npm install

---

## 🛠️ Filosofía de Desarrollo y Comentarios
Todo el código fuente ha sido escrito con un enfoque puramente profesional y humano.
- **Sin comentarios artificiales:** No vas a encontrar comentarios genéricos o marcas de agua de IA (como `"AI generated"` o explicaciones obvias de importaciones de React).
- **Comentarios con propósito:** Los comentarios en el código explican exclusivamente flujos lógicos específicos, simulaciones de estados de carga, validaciones personalizadas o la estructura de secciones clave.

---

## 📂 Arquitectura de Directorios

La estructura de carpetas sigue un patrón modular limpio para facilitar el mantenimiento y la delegación de tareas:

```bash
src/
├── pages/                  # Vistas principales de la aplicación
│   ├── about/              # Sección "Quiénes Somos"
│   │   └── AboutPage.tsx
│   ├── home/               # Página de Inicio (Sección Principal)
│   │   ├── HomePage.tsx
│   │   └── components/     # Componentes locales de la pantalla de inicio
│   │       ├── Hero.tsx
│   │       ├── GallerySection.tsx
│   │       ├── ContactSection.tsx
│   │       └── TestimonialsSection.tsx
│   ├── levels/             # Oferta Académica por Niveles
│   │   └── LevelsPage.tsx
│   ├── news/               # Portal de Noticias y Filtros
│   │   └── NewsPage.tsx
│   ├── jobs/               # Portal de Empleo y Envío de CV (PDF)
│   │   └── JobsPage.tsx
│   ├── login/              # Acceso Privado para Familias y Personal
│   │   └── LoginPage.tsx
│   └── BienestarPage.tsx   # Portal de Bienestar y FAQ Interactivo
│
├── shared/                 # Componentes y utilidades de uso global
│   └── components/
│       └── layout/         # Estructura base de navegación de la app
│           ├── Header.tsx      # Barra superior de navegación SPA
│           ├── Footer.tsx      # Pie de página responsivo de 3 columnas
│           └── MainLayout.tsx  # Contenedor común y transiciones
│
├── App.tsx                 # Enrutamiento centralizado de la app
├── index.css               # Directivas de Tailwind CSS v4 y variables de tema
└── main.tsx                # Punto de entrada de React
```

---

## 🌟 Detalle de Funcionalidades Implementadas

1. **Navegación Fluida (SPA):** Gracias a `react-router-dom`, las transiciones entre páginas son instantáneas sin recargar el navegador. Se configuró el `<Header />` y `<Footer />` globales utilizando el componente de enrutamiento `<Link>`.
2. **Muro de Opiniones Reactivo (`HomePage.tsx`):** Un sistema dinámico donde los usuarios pueden redactar un comentario y enviarlo en vivo. El comentario se añade instantáneamente a la pantalla con formato de fecha real, ideal para conectar posteriormente con una API de base de datos.
3. **Timeline Histórico (`AboutPage.tsx`):** Un recorrido temporal estilizado desde 1998 hasta 2024 utilizando bordes continuos y micro-detalles responsivos.
4. **Buscador y Filtrado Dinámico de Noticias (`NewsPage.tsx`):** Los usuarios pueden buscar noticias por título en tiempo real y segmentarlas por categorías (**Todas**, **Institucional**, **Deportes**, **Eventos**).
5. **Cargador Drag-and-Drop de Archivos (`JobsPage.tsx`):** Formulario laboral con selector dinámico de puestos y un área interactiva para soltar o seleccionar el CV en formato PDF, con validación de peso (máx. 5MB) y extensión.
6. **Simulación de Autenticación Segura (`LoginPage.tsx`):** Selector de tipo de perfil (Familia/Personal) con una simulación realista de inicio de sesión que incluye un spinner de carga activa y mensaje de bienvenida interactivo.

---

## 🚀 Guía para Escalar la Aplicación

Si necesitás expandir o modificar la aplicación en el futuro, seguí estas pautas de buenas prácticas:

### 1. ¿Cómo agregar una nueva ruta/página?
1. Crea el componente de tu página en `src/pages/nom-pagina/MiPagina.tsx`.
2. Importa tu componente en `src/App.tsx`.
3. Registra la nueva ruta dentro del bloque `<Routes>`:
   ```tsx
   <Route path="/mi-nueva-ruta" element={<MiPagina />} />
   ```
4. Actualiza los enlaces en `Header.tsx` o `Footer.tsx` utilizando `<Link to="/mi-nueva-ruta">`.

### 2. Uso y Modificación de Colores (Tailwind CSS v4)
En Tailwind CSS v4, el tema se declara directamente en `src/index.css` mediante la directiva `@theme`. No existe un archivo `tailwind.config.js` externo.
- Para cambiar los colores institucionales globales, modifica las variables dentro de `@theme` en `src/index.css`:
  ```css
  @theme {
    --color-edu-primary: #1a5276;    /* Azul Oscuro Principal */
    --color-edu-secondary: #2e86c1;  /* Azul Vibrante */
    --color-edu-accent: #a9cce3;     /* Azul Claro */
    --color-edu-light: #d6eaf8;      /* Fondo Suave */
  }
  ```
- Al escribir clases en tus componentes, consumilas de forma natural: `className="bg-edu-primary text-edu-accent"`.

### 3. Conexión de Formularios con un Backend
Todos los formularios (`ContactSection`, `TestimonialsSection`, `JobsPage`, `LoginPage`) cuentan con estados de React locales (`useState`) ya configurados y funciones de envío (`onSubmit`).
- Para conectarlos con un servidor en el futuro, solo debés reemplazar el código simulado por una petición HTTP real utilizando `fetch` o `axios`:
  ```typescript
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.tucolegio.edu.ar/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) setIsSubmitted(true);
    } catch (err) {
      setError('Hubo un error al procesar la solicitud.');
    }
  };
  ```

---

## 💻 Comandos Útiles para el Desarrollo

Para correr el proyecto localmente o generar un paquete listo para producción:

- **Iniciar Servidor de Desarrollo:** `npm run dev`
- **Compilar en TypeScript y Empaquetar para Producción:** `npm run build`
- **Previsualizar la Compilación de Producción:** `npm run preview`
