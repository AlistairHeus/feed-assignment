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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            UI Components Showcase
          </h1>
          <p className="text-gray-600">
            Foundational components for our feed assignment
          </p>
        </div>

        <section className="bg-white rounded-lg shadow-md p-8">
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

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Input Component</h2>

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

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Avatar Component</h2>

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

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Modal Component</h2>

          <div className="space-y-4">
            <p className="text-gray-600">
              Click the button below to test the modal component:
            </p>

            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Sign in to continue"
              subtitle="Sign in to access all the features on this app"
              size="md"
            >
              <div className="space-y-4">
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

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="text-center pt-2">
                  <span className="text-sm text-gray-600">
                    Do not have an account?{" "}
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign Up
                    </button>
                  </span>
                </div>
              </div>
            </Modal>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Integration Example</h2>
          <p className="text-gray-600 mb-6">
            Here's how our components work together in a realistic scenario:
          </p>

          <div className="max-w-md mx-auto border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar fallback="Demo User" />
                <div>
                  <h3 className="font-medium">Demo User</h3>
                  <p className="text-sm text-gray-500">5 mins ago</p>
                </div>
              </div>
              <Button variant="icon" size="sm">
                <X size={16} />
              </Button>
            </div>

            <p className="text-gray-800 mb-4">
              This is how our components look when integrated together in a real
              post card!
            </p>

            <div className="flex gap-2">
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
