const TOKEN_KEY = 'mv_admin_token';

export function getAdminToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export async function crmFetch(path: string, options: RequestInit = {}) {
  const token = getAdminToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  return res.json();
}
