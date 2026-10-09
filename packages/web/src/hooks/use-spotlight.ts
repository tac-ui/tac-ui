import { useRef, useState, useCallback } from 'react';

export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  }, []);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  const spotlightStyle: React.CSSProperties = {
    '--spotlight-x': `${position.x}%`,
    '--spotlight-y': `${position.y}%`,
    '--spotlight-opacity': isHovered ? '1' : '0',
  } as React.CSSProperties;

  return { ref, spotlightStyle, onMouseMove, onMouseEnter, onMouseLeave, isHovered };
}
