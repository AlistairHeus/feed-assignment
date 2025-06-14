import React, { createContext, useEffect, useState } from "react";
import { TEST_ACCOUNTS } from "../mock-data/test-accounts.mock-data";
import type {
  AuthContextType,
  AuthState,
  LoginCredentials,
  ModalState,
  SignUpCredentials,
  User,
} from "../types/auth.types";

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

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const getRegisteredUsers = (): {
  email: string;
  password: string;
  user: User;
}[] => {
  const registeredUsersJSON = localStorage.getItem("registered_users");
  if (registeredUsersJSON) {
    try {
      return JSON.parse(registeredUsersJSON);
    } catch (error) {
      console.error("Error parsing registered users:", error);
      return [];
    }
  }
  return [];
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    console.log("Login attempt with:", credentials.email);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const testAccount = TEST_ACCOUNTS.find(
      (acc) =>
        acc.email === credentials.email && acc.password === credentials.password
    );
    console.log("Test account match:", testAccount ? "Yes" : "No");

    const registeredUsers = getRegisteredUsers();
    console.log("Registered users:", registeredUsers);

    const registeredAccount = registeredUsers.find(
      (acc) =>
        acc.email === credentials.email && acc.password === credentials.password
    );
    console.log("Registered account match:", registeredAccount ? "Yes" : "No");

    const account = testAccount || registeredAccount;

    if (account) {
      const userId =
        registeredAccount?.user?.id ||
        (account.email === "demo@example.com"
          ? "demo-user"
          : `user-${Date.now()}`);

      const user: User = {
        id: userId,
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

  const signup = async (credentials: SignUpCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    console.log("Signup attempt with:", credentials.email);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const emailExistsInTestAccounts = TEST_ACCOUNTS.some(
      (acc) => acc.email === credentials.email
    );

    const registeredUsers = getRegisteredUsers();
    console.log("Current registered users:", registeredUsers);

    const emailExistsInRegisteredUsers = registeredUsers.some(
      (acc) => acc.email === credentials.email
    );

    if (emailExistsInTestAccounts || emailExistsInRegisteredUsers) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Email already exists",
      }));
      return false;
    }

    const userId = `user-${Date.now()}`;
    const newUser: User = {
      id: userId,
      email: credentials.email,
      username: credentials.email.split("@")[0],
    };

    const newRegisteredUser = {
      email: credentials.email,
      password: credentials.password,
      user: newUser,
    };

    registeredUsers.push(newRegisteredUser);
    localStorage.setItem("registered_users", JSON.stringify(registeredUsers));
    console.log("Updated registered users:", registeredUsers);

    localStorage.setItem("auth_user", JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    closeModal();
    return true;
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setAuthState(initialAuthState);
  };

  const clearRegisteredUsers = () => {
    localStorage.removeItem("registered_users");
    console.log("All registered users cleared from localStorage");
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
    signup,
    logout,
    openModal,
    closeModal,
    switchModal,
    clearRegisteredUsers,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
