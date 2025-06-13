import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { SignInPage } from "./pages";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SignInPage />
    </AuthProvider>
  );
};

export default App;
