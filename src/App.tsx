import { Heart, MessageCircle, Share, X } from "lucide-react";
import React from "react";
import Button from "./components/ui/Button";
import { AuthProvider } from "./context/AuthContext";

const ButtonShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Button Component Showcase
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Primary Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">
              Small Primary
            </Button>
            <Button variant="primary" size="md">
              Medium Primary
            </Button>
            <Button variant="primary" size="lg">
              Large Primary
            </Button>
            <Button variant="primary" loading>
              Loading Primary
            </Button>
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Secondary Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="sm">
              Small Secondary
            </Button>
            <Button variant="secondary" size="md">
              Medium Secondary
            </Button>
            <Button variant="secondary" size="lg">
              Large Secondary
            </Button>
            <Button variant="secondary" loading>
              Loading Secondary
            </Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ghost Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="ghost" size="sm">
              Small Ghost
            </Button>
            <Button variant="ghost" size="md">
              Medium Ghost
            </Button>
            <Button variant="ghost" size="lg">
              Large Ghost
            </Button>
            <Button variant="ghost" loading>
              Loading Ghost
            </Button>
            <Button variant="ghost" disabled>
              Disabled Ghost
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Icon Buttons</h2>
          <div className="flex flex-wrap gap-4">
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

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Design-Specific Examples
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" className="w-full max-w-sm">
              Sign In
            </Button>

            <Button variant="ghost" size="md">
              Login
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

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Interactive Test</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={() => alert("Primary button clicked!")}
            >
              Click Me (Primary)
            </Button>
            <Button
              variant="secondary"
              onClick={() => alert("Secondary button clicked!")}
            >
              Click Me (Secondary)
            </Button>
            <Button
              variant="ghost"
              onClick={() => alert("Ghost button clicked!")}
            >
              Click Me (Ghost)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ButtonShowcase />
    </AuthProvider>
  );
};

export default App;
