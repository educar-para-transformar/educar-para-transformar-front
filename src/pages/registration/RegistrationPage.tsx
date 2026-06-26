import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import {
  getInstitutionalStudentByDni,
  registerInstitutionalUser,
} from '../../features/auth/services/demoAuth';
import type { DemoUserRole } from '../../features/auth/types';

type RegistrationRole = Extract<DemoUserRole, 'student' | 'teacher' | 'parent'>;

const roleLabels: Record<RegistrationRole, string> = {
  student: 'Alumno',
  teacher: 'Docente',
  parent: 'Familia',
};

function normalizeRole(value: string | null): RegistrationRole {
  if (value === 'teacher' || value === 'parent') {
    return value;
  }

  return 'student';
}

export const RegistrationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = normalizeRole(searchParams.get('role'));
  const initialDni = searchParams.get('dni')?.replace(/\D/g, '') ?? '';
  const [formData, setFormData] = useState({
    role: initialRole,
    dni: initialDni,
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successUser, setSuccessUser] = useState<{
    role: RegistrationRole;
    dni: string;
    email: string;
  } | null>(null);
  const studentMatch = useMemo(
    () => getInstitutionalStudentByDni(formData.dni),
    [formData.dni],
  );
  const isStudentRegistration = formData.role === 'student';
  const hasCompleteStudentDni = /^\d{7,8}$/.test(formData.dni);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!/^\d{7,8}$/.test(formData.dni)) {
      setError('Ingresa un DNI valido de 7 u 8 digitos.');
      return;
    }

    if (isStudentRegistration && !studentMatch) {
      setError(
        'Este DNI todavía no está habilitado por administración. Enviá primero la solicitud de inscripción y esperá la aprobación del panel institucional.',
      );
      return;
    }

    if (studentMatch && isStudentRegistration && studentMatch.hasAccount) {
      setError(
        'Este alumno ya tiene una cuenta activa. Puede iniciar sesión directamente.',
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Ingresa un correo valido.');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contrasena debe tener al menos 8 caracteres.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('La confirmacion de contrasena no coincide.');
      return;
    }

    try {
      await registerInstitutionalUser({
        role: formData.role,
        email: formData.email,
        dni: formData.dni,
        password: formData.password,
      });

      setSuccessUser({
        role: formData.role,
        dni: formData.dni,
        email: formData.email.trim().toLowerCase(),
      });
    } catch (registrationError) {
      setError(
        registrationError instanceof Error
          ? registrationError.message
          : 'No se pudo completar el registro.',
      );
    }
  };

  return (
    <div className="min-h-screen bg-edu-bg text-slate-800 animate-fadeIn">
      {/* Premium Gradient Header Banner */}
      <section className="bg-gradient-to-r from-edu-dark via-edu-primary to-edu-secondary-dark px-6 py-14 text-white relative overflow-hidden shadow-sm">
        {/* Decorative glowing elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-edu-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Habilita tu Acceso al Portal
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-edu-secondary-light/80 md:text-base">
            Si ya formas parte de la institución como docente, familia o personal autorizado, crea tus credenciales para ingresar.
          </p>
        </div>
      </section>

      {/* Main content grid */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[0.88fr_1.12fr]">
        <aside className="space-y-6">
          {/* Requisito de Registro Card (Simpler explanation as requested) */}
          <div className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_25px_60px_rgba(15,45,89,0.08)] space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-edu-secondary/10 px-3 py-1 text-xs font-semibold text-edu-primary">
                <ShieldCheck className="h-4 w-4" />
                Validación de Acceso
              </span>
              <h3 className="mt-3 text-lg font-bold text-edu-dark">
                Requisito de Registro
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Para utilizar esta pantalla debes figurar en el sistema de la institución. Al ingresar tu DNI, el sistema comprobará tu vinculación activa.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <p className="text-xs text-slate-400 font-medium">¿Necesitas ayuda?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  to="/inscripcion"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Solicitud de inscripción
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-edu-primary/10 px-4 text-xs font-bold text-edu-primary transition hover:bg-edu-primary/15"
                >
                  Ir al Login
                </Link>
              </div>
            </div>
          </div>

          {isStudentRegistration && hasCompleteStudentDni && !studentMatch && (
            <div className="rounded-[28px] border border-amber-100 bg-amber-50/70 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    Pendiente de aprobación
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-800">
                    DNI no habilitado todavía
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Para crear una cuenta de alumno, primero debe existir una solicitud aprobada desde el panel de administración.
                  </p>
                  <Link
                    to="/inscripcion"
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-xl bg-amber-600 px-4 text-xs font-bold text-white transition hover:bg-amber-700"
                  >
                    Iniciar solicitud de inscripción
                  </Link>
                </div>
              </div>
            </div>
          )}

          {studentMatch && isStudentRegistration && (
            <div className={`rounded-[28px] border p-6 shadow-sm backdrop-blur-sm ${
              studentMatch.hasAccount
                ? 'border-amber-100 bg-amber-50/70'
                : 'border-emerald-100 bg-emerald-50/60'
            }`}>
              <div className="flex items-start gap-3">
                <Sparkles className={`mt-0.5 h-5 w-5 shrink-0 ${
                  studentMatch.hasAccount ? 'text-amber-600' : 'text-emerald-600 animate-pulse'
                }`} />
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    studentMatch.hasAccount ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    DNI habilitado
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-800">
                    {studentMatch.firstName} {studentMatch.lastName}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {studentMatch.hasAccount
                      ? 'Este alumno ya tiene una cuenta activa. Por favor, ve directamente a iniciar sesión.'
                      : 'La administración ya habilitó este DNI. Podés crear las credenciales para acceder al portal.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Registration Form Card */}
        <div className="rounded-[30px] border border-slate-100 bg-white p-8 shadow-[0_35px_80px_rgba(15,45,89,0.12)] md:p-10 transition-all duration-300 hover:shadow-[0_45px_100px_rgba(15,45,89,0.16)]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-edu-dark">
              Crear Credenciales
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Ingresa tus datos personales y elige una contraseña segura. Estos datos te permitirán entrar directamente desde la pantalla de Login.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successUser ? (
            <div className="space-y-6 rounded-[24px] border border-emerald-100 bg-emerald-50/50 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    Cuenta creada correctamente
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-700">
                    ¡Todo listo! Ahora puedes iniciar sesión con <strong>{successUser.email}</strong>.
                  </p>
                </div>
              </div>

              <dl className="grid gap-3 rounded-2xl bg-white p-4 text-sm text-slate-600 sm:grid-cols-2 shadow-sm border border-slate-100">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Perfil
                  </dt>
                  <dd className="font-semibold text-slate-800">{roleLabels[successUser.role]}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    DNI
                  </dt>
                  <dd className="font-semibold text-slate-800">{successUser.dni}</dd>
                </div>
                <div className="sm:col-span-2 border-t border-slate-100 pt-3 mt-1">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Estado
                  </dt>
                  <dd className="text-slate-800">Tu cuenta ya está lista y configurada.</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/login"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-edu-primary px-6 text-sm font-semibold text-white transition hover:bg-edu-secondary-dark shadow-md shadow-edu-primary/10 hover:shadow-lg"
                >
                  Ir a login
                </Link>
                <button
                  type="button"
                  onClick={() => setSuccessUser(null)}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-white border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Crear otra cuenta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Perfil
                </span>
                <select
                  value={formData.role}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      role: event.target.value as RegistrationRole,
                    }))
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition-all duration-300 focus:border-edu-primary focus:bg-white focus:ring-4 focus:ring-edu-primary/10"
                >
                  <option value="student">Alumno</option>
                  <option value="teacher">Docente</option>
                  <option value="parent">Familia</option>
                </select>
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  DNI
                </span>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Tu número de documento"
                    value={formData.dni}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        dni: event.target.value.replace(/\D/g, ''),
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-edu-primary focus:bg-white focus:ring-4 focus:ring-edu-primary/10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Correo electrónico
                </span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="usuario@educar.com"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-edu-primary focus:bg-white focus:ring-4 focus:ring-edu-primary/10"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Contraseña
                  </span>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      value={formData.password}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-edu-primary focus:bg-white focus:ring-4 focus:ring-edu-primary/10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Confirmar contraseña
                  </span>
                  <input
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        confirmPassword: event.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition-all duration-300 focus:border-edu-primary focus:bg-white focus:ring-4 focus:ring-edu-primary/10"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-edu-primary text-sm font-semibold text-white shadow-md shadow-edu-primary/10 hover:shadow-lg hover:shadow-edu-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Crear mi cuenta
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
