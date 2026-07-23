const AUTH_KEY = "wine-hub:auth:v1";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

export function mockLogin(_email: string, _password: string): void {
  try {
    window.localStorage.setItem(AUTH_KEY, "true");
  } catch (err) {
    console.error("Failed to persist auth session", err);
  }
}

export function mockLogout(): void {
  try {
    window.localStorage.removeItem(AUTH_KEY);
  } catch (err) {
    console.error("Failed to clear auth session", err);
  }
}
