import { useMemo } from 'react';
import { getSession } from './demoAuth';
import { hasPermission, can } from './permissions';
import type { Permission } from './permissions';
import type { DemoUserRole } from '../types';

export function useCurrentRole(): DemoUserRole | null {
  return useMemo(() => {
    const session = getSession();
    return session?.role ?? null;
  }, []);
}

export function usePermission(permission: Permission): boolean {
  const role = useCurrentRole();
  return useMemo(() => hasPermission(role, permission), [role, permission]);
}

export function useCan(permission: Permission): boolean {
  return usePermission(permission);
}

export function checkPermission(permission: Permission): boolean {
  const session = getSession();
  return can(permission, session?.role);
}
