import { useState, useEffect, useRef } from 'react';

interface AnimationOptions {
  duration?: number;
  enterClass?: string;
  exitClass?: string;
  onExited?: () => void;
}


export function useAnimation(
  isVisible: boolean,
  options: AnimationOptions = {}
) {
  const {
    duration = 300,
    enterClass = 'animate-fade-in',
    exitClass = 'animate-fade-out',
    onExited
  } = options;

  const [shouldRender, setShouldRender] = useState(isVisible);
  const [animationClass, setAnimationClass] = useState(isVisible ? enterClass : '');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: number;

    if (isVisible) {
      setShouldRender(true);

      requestAnimationFrame(() => {
        setAnimationClass(enterClass);
      });
    } else if (shouldRender) {
      setAnimationClass(exitClass);

      timer = setTimeout(() => {
        setShouldRender(false);
        if (onExited) onExited();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, enterClass, exitClass, duration, shouldRender, onExited]);

  return { shouldRender, animationClass, ref: elementRef };
}


export function useHoverAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const hoverProps = {
    className: `transition-transform ${isHovered ? 'hover-scale' : ''} ${isActive ? 'active-scale' : ''}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false);
      setIsActive(false);
    },
    onMouseDown: () => setIsActive(true),
    onMouseUp: () => setIsActive(false),
  };

  return hoverProps;
}
