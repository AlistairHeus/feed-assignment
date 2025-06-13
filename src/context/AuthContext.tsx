import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  AuthContextType,
  AuthState,
  LoginCredentials,
  ModalState,
  User,
} from "../types/auth.types";
import { TEST_ACCOUNTS } from "../mock-data/test-accounts.mock-data";

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const initialModalState: ModalState = {
  isOpen: false,
  type: "signin",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    await new Promise((resolve) => setTimeout(resolve, 500));

    const account = TEST_ACCOUNTS.find(
      (acc) =>
        acc.email === credentials.email && acc.password === credentials.password
    );

    if (account) {
      const user: User = {
        id: account.email === "demo@example.com" ? "demo-user" : "test-user",
        ...account.user,
      };

      localStorage.setItem("auth_user", JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      closeModal();
      return true;
    } else {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Invalid email or password",
      }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setAuthState(initialAuthState);
  };

  const openModal = (type: "signin" | "signup") => {
    setModalState({ isOpen: true, type });
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "signin" });
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  const switchModal = () => {
    setModalState((prev) => ({
      ...prev,
      type: prev.type === "signin" ? "signup" : "signin",
    }));
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const contextValue: AuthContextType = {
    authState,
    modalState,
    login,
    logout,
    openModal,
    closeModal,
    switchModal,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
