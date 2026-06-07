/**
 * Local Credentials Store
 *
 * INTENTIONAL: Stores registration credentials in localStorage so that the
 * full register → login flow works without a running backend.
 * In production, this entire module would be removed — all authentication
 * would go through the backend's POST /auth/login endpoint exclusively.
 *
 * Persistence: localStorage (key: educar_demo_local_credentials)
 */

const CREDENTIALS_KEY = 'educar_demo_local_credentials';

interface LocalCredential {
  email: string;
  password: string;
}

function readCredentials(): LocalCredential[] {
  const raw = localStorage.getItem(CREDENTIALS_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as LocalCredential[];
  } catch {
    return [];
  }
}

function writeCredentials(credentials: LocalCredential[]): void {
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
}

/**
 * Saves a credential pair for local demo authentication.
 * Overwrites any previous credential for the same email.
 */
export function saveLocalCredential(email: string, password: string): void {
  const normalized = email.trim().toLowerCase();
  const filtered = readCredentials().filter((item) => item.email !== normalized);
  writeCredentials([{ email: normalized, password }, ...filtered]);
}

/**
 * Verifies an email/password pair against locally stored credentials.
 * Returns true only if both email and password match exactly.
 */
export function verifyLocalCredential(email: string, password: string): boolean {
  const normalized = email.trim().toLowerCase();
  const credential = readCredentials().find((item) => item.email === normalized);
  return credential?.password === password;
}
