import Button from "../ui/Button";

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
  return (
    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
          <span className="text-background text-sm font-bold">f</span>
        </div>
        <span className="text-foreground font-semibold">foo-rum</span>
      </div>

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
    </div>
  );
};

export default Navbar;
