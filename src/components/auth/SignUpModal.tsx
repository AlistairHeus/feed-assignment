import { LogIn } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SignUpModal = (props: SignUpModalProps) => {
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
            <p className="text-sm text-muted-foreground">
              Create an account to access all the features on this app
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

            <Input
              label="Repeat password"
              variant="password"
              placeholder="Enter your password again"
            />

            <Button
              variant="primary"
              className="w-full text-sm font-medium"
              size="lg"
              onClick={props.onClose}
            >
              Sign Up
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
          >
            Sign In
          </Button>
        </span>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;
