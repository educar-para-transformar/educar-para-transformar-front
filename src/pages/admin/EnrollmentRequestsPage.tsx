import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FolderArchive,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  approveEnrollmentRequest,
  getEnrollmentStatusCount,
  listEnrollmentRequests,
  updateEnrollmentStatus,
} from '../../features/inscripcion/services/enrollmentStore';
import type { EnrollmentRequest, EnrollmentStatus } from '../../features/inscripcion/types';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

const statusLabels: Record<EnrollmentStatus, string> = {
  pending: 'Nueva solicitud',
  reviewed: 'En analisis',
  approved_for_registration: 'Lista para crear cuenta',
  pending_admin_creation: 'Pendiente de carga interna',
  account_created: 'Cuenta creada',
  archived: 'Cerrada',
};

const statusClasses: Record<EnrollmentStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200/50',
  reviewed: 'bg-sky-50 text-sky-700 border border-sky-200/50',
  approved_for_registration: 'bg-emerald-50 text-emerald-700 border border-emerald-200/50',
  pending_admin_creation: 'bg-violet-50 text-violet-700 border border-violet-200/50',
  account_created: 'bg-blue-50 text-blue-750 border border-blue-200/50',
  archived: 'bg-slate-100 text-slate-650 border border-slate-250/50',
};

const filters: Array<{ value: EnrollmentStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Nuevas' },
  { value: 'approved_for_registration', label: 'Crear cuenta' },
  { value: 'account_created', label: 'Cuenta lista' },
  { value: 'pending_admin_creation', label: 'Carga interna' },
  { value: 'archived', label: 'Cerradas' },
];

type StepView = {
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel?: string;
  ctaPath?: string;
  accent: string;
};

function getStepView(request: EnrollmentRequest): StepView {
  switch (request.status) {
    case 'approved_for_registration':
      return {
        eyebrow: 'Habilitado',
        headline: 'Listo para auto-registro',
        body: 'El alta institucional está completa. El alumno ya está habilitado para crear su cuenta ingresando su DNI en el portal de registro.',
        ctaLabel: 'Ir a registro',
        ctaPath: `/registro?role=student&dni=${request.studentDni}`,
        accent: 'border-emerald-100 bg-emerald-50/60 text-emerald-850',
      };
    case 'pending_admin_creation':
      return {
        eyebrow: 'Carga Pendiente',
        headline: 'Requiere registro previo en el sistema interno',
        body: 'Antes de permitir el registro del usuario, un administrador debe cargar formalmente los datos de este alumno en la base institucional.',
        accent: 'border-violet-100 bg-violet-50/60 text-violet-850',
      };
    case 'reviewed':
      return {
        eyebrow: 'En Revisión',
        headline: 'En proceso de evaluación',
        body: 'La solicitud está siendo evaluada para determinar si corresponde su aprobación directa o si requiere una revisión de datos internos.',
        accent: 'border-sky-100 bg-sky-50/60 text-sky-850',
      };
    case 'account_created':
      return {
        eyebrow: 'Cuenta Lista',
        headline: 'Acceso habilitado en el sistema',
        body: 'La cuenta se encuentra creada y activa. El estudiante ya puede ingresar al portal privado utilizando sus credenciales.',
        ctaLabel: 'Ir al Login',
        ctaPath: '/login',
        accent: 'border-blue-100 bg-blue-50/50 text-blue-850',
      };
    case 'archived':
      return {
        eyebrow: 'Cerrado',
        headline: 'Caso finalizado y archivado',
        body: 'Esta solicitud ha sido archivada. No requiere gestiones adicionales en el flujo actual de admisiones.',
        accent: 'border-slate-200 bg-slate-100/50 text-slate-800',
      };
    case 'pending':
    default:
      return {
        eyebrow: 'Acción Pendiente',
        headline: 'Evaluar y procesar solicitud',
        body: 'Revise los antecedentes del aspirante para decidir si se aprueba su alta directa o si requiere una verificación previa.',
        accent: 'border-amber-100 bg-amber-50/60 text-amber-850',
      };
  }
}

export const EnrollmentRequestsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<EnrollmentStatus | 'all'>('all');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [successModalData, setSuccessModalData] = useState<{
    studentName: string;
    studentDni: string;
    email: string;
    level: string;
  } | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'resolve' | 'archive';
    request: EnrollmentRequest;
  } | null>(null);

  const [requests, setRequests] = useState(() => listEnrollmentRequests());

  useEffect(() => {
    const handleUpdate = () => {
      setRequests(listEnrollmentRequests());
    };

    window.addEventListener('enrollment-updated', handleUpdate);
    return () => {
      window.removeEventListener('enrollment-updated', handleUpdate);
    };
  }, []);

  const visibleRequests =
    activeFilter === 'all'
      ? requests
      : requests.filter((item) => item.status === activeFilter);

  const resolveRequest = (request: EnrollmentRequest) => {
    const updated = approveEnrollmentRequest(request.id);

    if (!updated) {
      setFeedback('No se pudo actualizar la solicitud seleccionada.');
      return;
    }

    if (updated.status === 'approved_for_registration') {
      setActiveFilter('approved_for_registration');
      setSuccessModalData({
        studentName: `${request.studentFirstName} ${request.studentLastName}`,
        studentDni: request.studentDni,
        email: request.email,
        level: `${request.educationalLevel} · ${request.schoolYear}`,
      });
      return;
    }

    setFeedback(
      `Solicitud procesada: Se determinó que ${request.studentFirstName} ${request.studentLastName} requiere primero ser registrado en la base escolar interna.`,
    );
  };

  const archiveRequest = (request: EnrollmentRequest) => {
    updateEnrollmentStatus(request.id, 'archived');
    setActiveFilter('archived');
    setFeedback(
      `Solicitud archivada: Se cerró la solicitud de inscripción para ${request.studentFirstName} ${request.studentLastName}.`,
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0f52ba]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f52ba]">
              <ClipboardList className="h-4 w-4" />
              Flujo de inscripcion
            </span>
            <h1 className="mt-3 text-2xl font-bold text-edu-primary">
              Desde la solicitud hasta la cuenta lista
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 w-full lg:w-auto shrink-0">
            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 px-4 py-3 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
                Pendientes
              </p>
              <p className="mt-1 text-xl font-extrabold text-amber-800">
                {getEnrollmentStatusCount('pending')}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                Habilitados
              </p>
              <p className="mt-1 text-xl font-extrabold text-emerald-800">
                {getEnrollmentStatusCount('approved_for_registration')}
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                Con Cuenta
              </p>
              <p className="mt-1 text-xl font-extrabold text-blue-800">
                {getEnrollmentStatusCount('account_created')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {feedback && (
        <div className="flex items-start gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <section className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-100 pb-5">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                activeFilter === filter.value
                  ? 'bg-[#0f52ba] text-white shadow-md shadow-blue-500/15 scale-[1.02]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {visibleRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <SearchCheck className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-4 text-sm font-semibold text-slate-700">
              No hay solicitudes en este filtro.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {visibleRequests.map((request) => {
              const stepView = getStepView(request);
              const canResolve =
                request.status === 'pending' || request.status === 'reviewed';
              const canArchive =
                request.status !== 'archived' && request.status !== 'account_created';

              return (
                <article
                  key={request.id}
                  className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Card Header */}
                  <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-lg font-bold text-slate-800">
                            {request.studentFirstName} {request.studentLastName}
                          </h2>
                          <span
                            className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusClasses[request.status]}`}
                          >
                            {statusLabels[request.status]}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500 font-medium">
                          DNI: <span className="font-mono">{request.studentDni}</span> · Recibida: {formatDate(request.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full bg-white border border-slate-200/60 px-4 py-1.5 shadow-sm text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        <Sparkles className="h-3.5 w-3.5 text-edu-secondary" />
                        <span>{request.educationalLevel}</span>
                        <span className="text-slate-300">|</span>
                        <span>{request.schoolYear}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body (3-Column Metadata Layout) */}
                  <div className="p-6 grid gap-6 md:grid-cols-3 text-sm text-slate-600">
                    <div className="space-y-1">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Responsable tutor
                      </dt>
                      <dd className="font-semibold text-slate-800">
                        {request.responsibleFullName}
                      </dd>
                      <dd className="text-xs text-slate-505">
                        Relación: {request.responsibleRelation}
                      </dd>
                    </div>

                    <div className="space-y-1">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Información de contacto
                      </dt>
                      <dd className="font-semibold text-slate-800 truncate">
                        {request.email}
                      </dd>
                      <dd className="text-xs text-slate-505">
                        Teléfono: {request.phone}
                      </dd>
                    </div>

                    <div className="space-y-1">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Observaciones adicionales
                      </dt>
                      <dd className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-h-20 overflow-y-auto">
                        "{request.notes || 'Sin observaciones adicionales.'}"
                      </dd>
                    </div>
                  </div>

                  {/* Card Footer (Full-width Dynamic Action Panel) */}
                  <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-6 py-4 border-t ${stepView.accent}`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/60 px-2.5 py-0.5 rounded border border-slate-200/40">
                          {stepView.eyebrow}
                        </span>
                        <h3 className="text-sm font-bold text-slate-800">
                          {stepView.headline}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                        {stepView.body}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {canResolve && (
                        <button
                          type="button"
                          onClick={() => setConfirmAction({ type: 'resolve', request })}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f52ba] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#0c449e] transition-all duration-200 active:scale-95 cursor-pointer"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Procesar Solicitud</span>
                        </button>
                      )}

                      {!canResolve && stepView.ctaPath && stepView.ctaLabel && (
                        <Link
                          to={stepView.ctaPath}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f52ba] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#0c449e] transition-all duration-200 active:scale-95"
                        >
                          <span>{stepView.ctaLabel}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}

                      {canArchive && (
                        <button
                          type="button"
                          onClick={() => setConfirmAction({ type: 'archive', request })}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-all duration-200 active:scale-95 cursor-pointer"
                        >
                          <FolderArchive className="h-3.5 w-3.5" />
                          <span>Cerrar caso</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-[28px] border border-slate-100 bg-white p-6 shadow-2xl space-y-5">
            <div className="space-y-2 text-left">
              <h3 className="text-lg font-bold text-slate-800">
                {confirmAction.type === 'resolve'
                  ? '¿Confirmar aprobación de solicitud?'
                  : '¿Confirmar cierre de caso?'}
              </h3>
              <p className="text-xs leading-relaxed text-slate-500">
                {confirmAction.type === 'resolve'
                  ? `¿Estás seguro de procesar y aprobar el alta institucional para ${confirmAction.request.studentFirstName} ${confirmAction.request.studentLastName}? El alumno quedará habilitado para auto-registrarse.`
                  : `¿Estás seguro de archivar y cerrar la solicitud de ${confirmAction.request.studentFirstName} ${confirmAction.request.studentLastName}? Esta acción finalizará el caso.`}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                className="flex-1 h-11 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const req = confirmAction.request;
                  const actionType = confirmAction.type;
                  setConfirmAction(null);
                  if (actionType === 'resolve') {
                    resolveRequest(req);
                  } else {
                    archiveRequest(req);
                  }
                }}
                className={`flex-1 h-11 rounded-2xl text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${
                  confirmAction.type === 'resolve'
                    ? 'bg-[#0f52ba] hover:bg-[#0c449e] shadow-blue-500/10'
                    : 'bg-slate-700 hover:bg-slate-800'
                }`}
              >
                {confirmAction.type === 'resolve' ? 'Confirmar y habilitar' : 'Confirmar y cerrar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {successModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-[28px] border border-slate-100 bg-white p-6 shadow-2xl text-center space-y-5">
            {/* Success Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-800">
                ¡Alta completada con éxito!
              </h3>
              <p className="text-xs text-slate-500">
                El alumno fue dado de alta institucional correctamente en el sistema.
              </p>
            </div>

            {/* Student Info Box */}
            <div className="rounded-2xl bg-slate-50 p-4 text-left space-y-2 border border-slate-100/50">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Alumno</span>
                <p className="text-sm font-bold text-slate-800">{successModalData.studentName}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100/80 pt-2">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">DNI</span>
                  <p className="text-xs font-semibold text-slate-700">{successModalData.studentDni}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Nivel escolar</span>
                  <p className="text-xs font-semibold text-slate-700">{successModalData.level}</p>
                </div>
              </div>
            </div>

            {/* Acceptance Email Notice */}
            <p className="text-xs text-slate-650 leading-relaxed bg-blue-50/50 px-4 py-3 rounded-2xl border border-blue-100/40">
              Se le mandará el correo de aceptación al tutor con toda la información.
            </p>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSuccessModalData(null)}
              className="w-full h-11 rounded-2xl bg-[#0f52ba] text-sm font-semibold text-white shadow-md shadow-blue-500/10 hover:shadow-lg hover:bg-[#0c449e] transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
