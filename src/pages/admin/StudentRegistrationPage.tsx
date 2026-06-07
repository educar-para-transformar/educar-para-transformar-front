import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  KeyRound,
  LoaderCircle,
  Search,
  UserRoundSearch,
} from 'lucide-react';
import {
  createStudentAccount,
  getDefaultStudentPayload,
  getInstitutionalStudentByDni,
  getSession,
} from '../../features/auth/services/demoAuth';
import { markEnrollmentAccountCreatedByDni } from '../../features/inscripcion/services/enrollmentStore';

export const StudentRegistrationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialDni = searchParams.get('dni')?.replace(/\D/g, '') || '46463269';
  const [dni, setDni] = useState(initialDni);
  const [searchedDni, setSearchedDni] = useState(initialDni);
  const [accountVersion, setAccountVersion] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const student = useMemo(
    () => getInstitutionalStudentByDni(searchedDni.trim()),
    [accountVersion, searchedDni],
  );

  React.useEffect(() => {
    setDni(initialDni);
    setSearchedDni(initialDni);
  }, [initialDni]);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    setSuccessMessage(null);

    if (!dni.trim()) {
      setError('Ingresa un DNI para consultar el padron institucional.');
      return;
    }

    setError(null);
    setSearchedDni(dni.trim());
  }

  async function handleCreateAccount() {
    if (!student) {
      setError('El DNI ingresado no pertenece a un alumno habilitado para esta demo.');
      return;
    }

    if (student.hasAccount) {
      setError('Este alumno ya tiene cuenta registrada en la demo.');
      return;
    }

    const session = getSession();

    if (!session || session.role !== 'authority') {
      setError('Necesitas iniciar sesion como autoridad para crear la cuenta.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await createStudentAccount(session.token, getDefaultStudentPayload(student));
      markEnrollmentAccountCreatedByDni(student.dni);
      setAccountVersion((current) => current + 1);
      setSuccessMessage(
        'Cuenta creada con exito. El alumno ya puede iniciar sesion con juan@educar.com y la contrasena programacion2026.',
      );
      setSearchedDni(student.dni);
    } catch (creationError) {
      setError(
        creationError instanceof Error
          ? creationError.message
          : 'No se pudo crear la cuenta del alumno.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="animate-fadeIn space-y-6">
      <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="max-w-3xl space-y-3 text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0f52ba]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f52ba]">
            <UserRoundSearch className="h-4 w-4" />
            Crear cuenta de alumno
          </span>
          <h1 className="text-2xl font-bold text-edu-primary">
            Crear cuenta desde el padron institucional
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            Este flujo prueba exactamente lo que hoy soporta el backend: validar
            el DNI en frontend, crear al alumno con
            <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
              POST /students
            </code>
            y dejar las credenciales listas para el segundo login.
          </p>
          <p className="text-xs font-medium text-slate-500">
            En esta pantalla el alta disponible es solo para
            <strong className="mx-1 text-slate-700">Alumno</strong>. Las cuentas de
            <strong className="mx-1 text-slate-700">Docente</strong> y
            <strong className="mx-1 text-slate-700">Autoridad</strong> quedan fuera
            porque el backend actual no expone ese flujo.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                DNI del alumno
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={dni}
                  onChange={(event) => setDni(event.target.value.replace(/\D/g, ''))}
                  placeholder="46463269"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#0f52ba] px-5 text-sm font-semibold text-white transition hover:bg-[#0c449e]"
            >
              <Search className="h-4 w-4" />
              Consultar padron
            </button>
          </form>

          {error && (
            <div className="mt-5 flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mt-5 flex items-start gap-2 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          {!student ? (
            <div className="flex min-h-[260px] h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-6 text-center">
              <BadgeCheck className="mb-4 h-8 w-8 text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">
                No encontramos el DNI en el padron demo.
              </p>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-500">
                Proba con el alumno institucional cargado para esta prueba:
                <strong className="mx-1 text-slate-700">46463269</strong>.
              </p>
            </div>
          ) : (
            <div className="space-y-5 text-left">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Alumno encontrado
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-800">
                    {student.firstName} {student.lastName}
                  </h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    student.hasAccount
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {student.hasAccount ? 'Cuenta creada' : 'Sin cuenta'}
                </span>
              </div>

              <dl className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    DNI
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-slate-700">
                    {student.dni}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Correo demo
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-slate-700">
                    {student.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Curso
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-slate-700">
                    {student.schoolYear} {student.division}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Nivel
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-slate-700">
                    {student.educationalLevel}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Rol asignado
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-slate-700">
                    Alumno
                  </dd>
                </div>
              </dl>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Credenciales que quedaran listas
                </p>
                <div className="mt-3 flex items-start gap-3">
                  <KeyRound className="mt-0.5 h-4 w-4 text-[#0f52ba]" />
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>
                      <strong className="text-slate-800">Correo:</strong>{' '}
                      {student.email}
                    </p>
                    <p>
                      <strong className="text-slate-800">Contrasena:</strong>{' '}
                      programacion2026
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={student.hasAccount || isSubmitting}
                onClick={handleCreateAccount}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#0f52ba] px-5 text-sm font-semibold text-white transition hover:bg-[#0c449e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : student.hasAccount ? (
                  'Cuenta ya registrada'
                ) : (
                  'Crear cuenta del alumno'
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
