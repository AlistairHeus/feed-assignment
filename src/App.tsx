import React from "react";
import { AuthProvider } from "./context/AuthContext";
import UserInterfaceShowcase from "./pages/user-interface-showcase";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserInterfaceShowcase />
    </AuthProvider>
  );
};

export default App;
