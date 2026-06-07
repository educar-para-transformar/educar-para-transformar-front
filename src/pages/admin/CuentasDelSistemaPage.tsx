import React, { useMemo } from 'react';
import { ShieldCheck, UserCheck, Clock3, Users } from 'lucide-react';
import { getRegisteredUsers } from '../../features/auth/services/demoAuth';
import { institutionalStudents } from '../../features/auth/data/institutionalStudents';
import { listDynamicInstitutionalStudents } from '../../features/inscripcion/services/dynamicInstitutionalStore';
import { localDemoAccounts } from '../../features/auth/data/localDemoAccounts';
import type { DemoUserRole } from '../../features/auth/types';

type AccountStatus = 'registered' | 'pending_registration';

interface SystemAccount {
  id: string;
  name: string;
  email: string;
  role: DemoUserRole | 'authority';
  dni?: string;
  status: AccountStatus;
}

const roleLabels: Record<string, string> = {
  student: 'Alumno',
  teacher: 'Docente',
  parent: 'Familia',
  authority: 'Autoridad',
};

export const CuentasDelSistemaPage: React.FC = () => {
  const accounts = useMemo(() => {
    const list: SystemAccount[] = [];
    const registeredRaw = getRegisteredUsers();
    const registered = Array.isArray(registeredRaw) ? registeredRaw : [];

    // 1. Add static institutional students
    institutionalStudents.forEach((student) => {
      const isRegistered = registered.some((r) => r.dni === student.dni);
      list.push({
        id: `static-${student.dni}`,
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        role: 'student',
        dni: student.dni,
        status: isRegistered ? 'registered' : 'pending_registration',
      });
    });

    // 2. Add dynamic institutional students
    const dynamicRaw = listDynamicInstitutionalStudents();
    const dynamicStudents = Array.isArray(dynamicRaw) ? dynamicRaw : [];
    
    dynamicStudents.forEach((student) => {
      const isRegistered = registered.some((r) => r.dni === student.dni);
      // Avoid duplicates just in case
      if (!list.some((l) => l.dni === student.dni)) {
        list.push({
          id: `dynamic-${student.dni}`,
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          role: 'student',
          dni: student.dni,
          status: isRegistered ? 'registered' : 'pending_registration',
        });
      }
    });

    // 3. Add local demo accounts (teachers, parents)
    localDemoAccounts.forEach((account) => {
      list.push({
        id: `demo-${account.email}`,
        name: account.name,
        email: account.email,
        role: account.role,
        status: 'registered',
      });
    });

    // 4. Add the default authority account
    list.push({
      id: 'auth-director',
      name: 'Director Demo',
      email: 'director@educar.com',
      role: 'authority',
      status: 'registered',
    });

    // 5. Add any other self-registered users not caught above
    registered.forEach((r) => {
      if (!r || !r.email) return;
      if (!list.some((l) => l.email === r.email || (r.dni && l.dni === r.dni))) {
        list.push({
          id: `reg-${r.email}`,
          name: r.email.split('@')[0], // Fallback name
          email: r.email,
          role: r.role,
          dni: r.dni,
          status: 'registered',
        });
      }
    });

    return list;
  }, []);

  const totalRegistered = accounts.filter((a) => a.status === 'registered').length;
  const totalPending = accounts.filter((a) => a.status === 'pending_registration').length;

  return (
    <div className="animate-fadeIn space-y-6">
      <section className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0f52ba]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f52ba]">
              <Users className="h-4 w-4" />
              Directorio Institucional
            </span>
            <h1 className="mt-3 text-2xl font-bold text-edu-primary">
              Cuentas del Sistema
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Aqui puedes ver a todas las personas dadas de alta en la institucion. 
              Muestra tanto las cuentas ya registradas y activas como aquellas que 
              tienen alta institucional pero aun no completaron su registro.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 px-4 py-4 text-left">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                <UserCheck className="h-4 w-4" />
                Cuentas activas
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">
                {totalRegistered}
              </p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-4 py-4 text-left">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600">
                <Clock3 className="h-4 w-4" />
                Falta registro
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-700">
                {totalPending}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200/70 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 border-b border-slate-200/70">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">DNI</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{account.name}</div>
                    <div className="text-xs text-slate-500">{account.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                      {roleLabels[account.role] || account.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {account.dni || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {account.status === 'registered' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        <ShieldCheck className="h-3 w-3" />
                        Registrado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                        <Clock3 className="h-3 w-3" />
                        Alta dada (Sin cuenta)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {accounts.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No hay cuentas registradas en el sistema.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
