import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  backButtonText?: string;
}

const Navbar = ({ 
  showBackButton = true, 
  onBackClick,
  backButtonText = "Back to home" 
}: NavbarProps) => {
  const { authState, logout } = useAuth();
  const { user, isAuthenticated } = authState;
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signin');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
          <span className="text-background text-sm font-bold">f</span>
        </div>
        <span className="text-foreground font-semibold">foo-rum</span>
      </div>

      {/* Right Side Navigation */}
      <div className="flex items-center gap-4">
        {/* Back Button */}
        {showBackButton && (
          <Button 
            variant="ghost" 
            className="text-foreground"
            onClick={onBackClick}
          >
            {backButtonText}
          </Button>
        )}

        {/* Authentication Button */}
        {!showBackButton && (
          isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{user.username || user.email}</span>
              </span>
              <Button 
                variant="ghost" 
                className="text-foreground"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              className="text-foreground"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
