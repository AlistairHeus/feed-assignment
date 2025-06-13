import React from "react";
import { User } from "lucide-react";
import { cn } from "../../utils/cn";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  fallback,
  className = "",
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const iconSizes = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  const baseClasses =
    "inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium overflow-hidden";

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getInitials = (text: string): string => {
    return text
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const showImage = src && !imageError && imageLoaded;
  const showFallback = fallback && (!src || imageError || !imageLoaded);

  return (
    <div className={cn(baseClasses, sizeClasses[size], className)}>
      {src && !imageError && (
        <img
          src={src}
          alt={alt || "Avatar"}
          className={cn(
            "w-full h-full object-cover",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}

      {showFallback && (
        <span className="select-none">{getInitials(fallback)}</span>
      )}

      {!showImage && !showFallback && <User size={iconSizes[size]} />}
    </div>
  );
};

export default Avatar;
