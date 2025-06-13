import React, { useState } from "react";
import { LogIn } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login, authState } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const success = await login({ email, password });
    if (success) {
      navigate('/');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div className="p-3 pb-0 rounded-3xl bg-muted-dark relative w-full max-w-md">
        <div className="bg-popover rounded-3xl p-10">
          <div className="text-center ">
            <div className="flex justify-center mb-6">
              <div className="rounded-full flex items-center justify-center">
                <LogIn size={25} className="text-popover-foreground" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-popover-foreground">
              Sign in to continue
            </h2>
            <p className="text-sm text-muted-foreground font-light ">
              Sign in to access all the features on this app
            </p>
          </div>
          <div className="pt-16 px-2 space-y-4">
            <Input
              label="Email or username"
              type="email"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              variant="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {authState.error && (
              <p className="text-red-500 text-sm text-center">{authState.error}</p>
            )}

            <Button
              variant="primary"
              className="w-full text-sm font-medium"
              size="lg"
              onClick={handleSignIn}
              disabled={authState.isLoading}
            >
              {authState.isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </div>

        <div className="p-4 pt-3 text-center">
          <span className="text-muted-foreground font-medium text-sm">
            Do not have an account?{" "}
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80 font-semibold text-sm p-0 h-auto"
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
