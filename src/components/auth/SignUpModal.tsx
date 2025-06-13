import { LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SignUpModal = (props: SignUpModalProps) => {
  const { authState, switchModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // For now, just show an alert since we don't have signup implementation
    alert("Sign up functionality not fully implemented yet. Please use the test accounts to sign in.");
  };

  const handleSignInClick = () => {
    switchModal();
  };
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Modal.Header className="p-0"></Modal.Header>

      <Modal.Content className="p-3 rounded-3xl ">
        <div className="bg-popover rounded-3xl p-10">
          <div className="text-center ">
            <div className="flex justify-center mb-6">
              <div className="rounded-full flex items-center justify-center">
                <LogIn size={25} className="text-popover-foreground" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-popover-foreground">
              Create an account to continue
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              Create an account to access all the features on this app
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

            <Input
              label="Repeat password"
              variant="password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {(error || authState.error) && (
              <p className="text-red-500 text-sm text-center">{error || authState.error}</p>
            )}

            <Button
              variant="primary"
              className="w-full text-sm font-medium"
              size="lg"
              onClick={handleSignUp}
              disabled={authState.isLoading}
            >
              {authState.isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </div>
        </div>
      </Modal.Content>

      <Modal.Footer className="p-4 pt-3">
        <span className="text-muted-foreground font-medium text-sm">
          Already have an account?{" "}
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 font-semibold text-sm p-0 h-auto"
            onClick={handleSignInClick}
          >
            Sign In
          </Button>
        </span>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;
