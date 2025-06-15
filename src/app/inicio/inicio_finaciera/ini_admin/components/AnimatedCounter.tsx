// components/AnimatedCounter.tsx
import { useEffect, useState } from "react";

interface Props {
  value: number;
  duration?: number; // en ms
  formatter?: (val: number) => string;
}

export function AnimatedCounter({ value, duration = 1000, formatter }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * value);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return <>{formatter ? formatter(count) : count}</>;
}
