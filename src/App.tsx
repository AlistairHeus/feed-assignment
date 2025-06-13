import { Heart, LogIn, MessageCircle, Share, X } from "lucide-react";
import React, { useState } from "react";
import Avatar from "./components/ui/Avatar";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import { AuthProvider } from "./context/AuthContext";

const UIShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const validateEmail = () => {
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            UI Components Showcase
          </h1>
          <p className="text-muted-foreground">
            Foundational components for our feed assignment
          </p>
        </div>

        <section className="bg-card rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Button Component</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Primary Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
                <Button variant="primary" loading>
                  Loading
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="secondary" loading>
                    Loading
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Ghost Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="ghost">Login</Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Icon Buttons</h3>
              <div className="flex gap-3">
                <Button variant="icon" size="sm">
                  <X size={16} />
                </Button>
                <Button variant="icon" size="md">
                  <Heart size={20} />
                </Button>
                <Button variant="icon" size="lg">
                  <Share size={24} />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                Design-Specific Examples
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="lg" className="min-w-[200px]">
                  <LogIn size={16} className="mr-2" />
                  Sign In
                </Button>
                <Button variant="secondary" size="sm">
                  <Heart size={16} className="mr-2" />
                  Like
                </Button>
                <Button variant="secondary" size="sm">
                  <MessageCircle size={16} className="mr-2" />
                  Comment
                </Button>
                <Button variant="secondary" size="sm">
                  <Share size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
            Input Component
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Inputs</h3>

              <Input
                label="Email or username"
                type="email"
                placeholder="Enter your email or username"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
                error={emailError}
              />

              <Input
                label="Password"
                variant="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Enter your password again"
                helperText="Password must be at least 8 characters"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Input States</h3>

              <Input
                label="Normal State"
                placeholder="This is a normal input"
              />

              <Input
                label="Error State"
                placeholder="This input has an error"
                error="This field is required"
              />

              <Input
                label="Disabled State"
                placeholder="This input is disabled"
                disabled
              />

              <Input
                placeholder="Input without label"
                helperText="This input has no label but has helper text"
              />
            </div>
          </div>
        </section>

        <section className="bg-card rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
            Avatar Component
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Sizes</h3>
              <div className="flex items-center gap-4">
                <Avatar size="xs" fallback="XS" />
                <Avatar size="sm" fallback="SM" />
                <Avatar size="md" fallback="MD" />
                <Avatar size="lg" fallback="LG" />
                <Avatar size="xl" fallback="XL" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">With Initials</h3>
              <div className="flex items-center gap-4">
                <Avatar fallback="John Doe" />
                <Avatar fallback="Jane Smith" />
                <Avatar fallback="Demo User" />
                <Avatar fallback="Test User" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">
                With Images (Fallback Demo)
              </h3>
              <div className="flex items-center gap-4">
                <Avatar
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
                  fallback="Demo User"
                />
                <Avatar
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=test"
                  fallback="Test User"
                />
                <Avatar src="invalid-url" fallback="Fallback User" />
                <Avatar />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
            Modal Component
          </h2>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Click the button below to test the modal component:
            </p>

            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                      onClick={() => setIsModalOpen(false)}
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
          </div>
        </section>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UIShowcase />
    </AuthProvider>
  );
};

export default App;
