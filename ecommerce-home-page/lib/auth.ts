export type AuthState = {
  username: string
  role: 'user' | 'admin'
}

export const AUTH_STORAGE_KEY = 'shophub_auth'

export function getAuth(): AuthState | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthState
  } catch {
    return null
  }
}

export function setAuth(auth: AuthState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export function clearAuth() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}
