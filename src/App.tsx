import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AuthTest: React.FC = () => {
  const {
    authState,
    modalState,
    login,
    logout,
    openModal,
    closeModal,
    switchModal,
  } = useAuth();

  const handleTestLogin = async () => {
    const success = await login({
      email: "demo@example.com",
      password: "password123",
    });
    console.log("Login success:", success);
  };

  const handleTestLoginFail = async () => {
    const success = await login({
      email: "wrong@email.com",
      password: "wrongpass",
    });
    console.log("Login success:", success);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Auth Context Test</h1>

        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h2 className="font-semibold mb-2">Auth State:</h2>
          <p>
            <strong>Authenticated:</strong>{" "}
            {authState.isAuthenticated ? "Yes" : "No"}
          </p>
          <p>
            <strong>Loading:</strong> {authState.isLoading ? "Yes" : "No"}
          </p>
          <p>
            <strong>User:</strong>{" "}
            {authState.user ? authState.user.username : "None"}
          </p>
          <p>
            <strong>Error:</strong> {authState.error || "None"}
          </p>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h2 className="font-semibold mb-2">Modal State:</h2>
          <p>
            <strong>Open:</strong> {modalState.isOpen ? "Yes" : "No"}
          </p>
          <p>
            <strong>Type:</strong> {modalState.type}
          </p>
        </div>

        <div className="space-y-4">
          {!authState.isAuthenticated ? (
            <>
              <button
                onClick={handleTestLogin}
                disabled={authState.isLoading}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
              >
                {authState.isLoading
                  ? "Logging in..."
                  : "Test Login (demo@example.com)"}
              </button>

              <button
                onClick={handleTestLoginFail}
                disabled={authState.isLoading}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
              >
                Test Failed Login
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
            >
              Logout
            </button>
          )}

          <div className="mt-4">
            <button
              onClick={() => openModal("signin")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Open Sign In Modal
            </button>

            <button
              onClick={() => openModal("signup")}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mr-2"
            >
              Open Sign Up Modal
            </button>

            {modalState.isOpen && (
              <>
                <button
                  onClick={switchModal}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2"
                >
                  Switch Modal
                </button>

                <button
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Close Modal
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold mb-2">Test Accounts:</h3>
          <p>• demo@example.com / password123</p>
          <p>• test@user.com / testpass</p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthTest />
    </AuthProvider>
  );
};

export default App;
