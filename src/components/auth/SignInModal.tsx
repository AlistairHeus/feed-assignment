import { LogIn } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

type SignInModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SignInModal = (props: SignInModalProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Modal.Header className="p-0"></Modal.Header>

      <Modal.Content className="p-3 rounded-3xl">
        <div className="bg-popover rounded-3xl p-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full flex items-center justify-center">
                <LogIn size={25} className="text-popover-foreground" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-popover-foreground">
              Sign in to continue
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              Sign in to access all the features on this app
            </p>
          </div>
          <div className="pt-16 px-2 space-y-4">
            <Input
              label="Email or username"
              type="email"
              placeholder="Enter your email or username"
            />

            <Input
              label="Password"
              variant="password"
              placeholder="Enter your password"
            />

            <Button
              variant="primary"
              className="w-full text-sm font-medium"
              size="lg"
              onClick={props.onClose}
            >
              Sign In
            </Button>
          </div>
        </div>
      </Modal.Content>

      <Modal.Footer className="p-4 pt-3">
        <span className="text-muted-foreground font-medium text-sm">
          Do not have and account?{" "}
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 font-semibold text-sm p-0 h-auto"
          >
            Sign Up
          </Button>
        </span>
      </Modal.Footer>
    </Modal>
  );
};

export default SignInModal;
