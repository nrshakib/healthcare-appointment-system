"use client";

import { useState, useCallback, useEffect } from "react";

export interface AuthUser {
  role: string;
  email: string;
}

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const syncUser = useCallback(() => {
    try {
      const role = localStorage.getItem("userRole");
      const email = localStorage.getItem("userEmail");
      if (
        role?.toLowerCase() === "patient" &&
        email &&
        email.trim().length > 0
      ) {
        setUser({ role, email: email.trim() });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, [syncUser]);

  const logout = useCallback((onDone?: () => void) => {
    try {
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      document.cookie =
        "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
    setUser(null);
    onDone?.();
  }, []);

  return { user, setUser, logout };
}
