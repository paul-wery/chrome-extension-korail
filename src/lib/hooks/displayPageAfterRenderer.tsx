import { useEffect, useRef } from 'react';

export function DisplayPageAfterRenderer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      document.documentElement.style.visibility = '';
    }
  }, []);
  return <div ref={ref} />;
}
