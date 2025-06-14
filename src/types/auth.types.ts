export interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  authState: AuthState;
  modalState: ModalState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignUpCredentials) => Promise<boolean>;
  logout: () => void;
  openModal: (type: 'signin' | 'signup') => void;
  closeModal: () => void;
  switchModal: () => void;
  clearRegisteredUsers: () => void; // Utility function for debugging
}

export interface TestAccount {
  email: string;
  password: string;
  user: Omit<User, 'id'>;
}

export interface ModalState {
  isOpen: boolean;
  type: 'signin' | 'signup';
}
