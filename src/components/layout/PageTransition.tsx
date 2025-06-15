import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
  
    const element = ref.current;
    if (element) {
      element.classList.add("animate-slide-in-down");
    }

    return () => {
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className)}
    >
      {children}
    </div>
  );
};

export default PageTransition;
