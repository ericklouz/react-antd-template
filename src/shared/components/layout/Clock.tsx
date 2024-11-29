import { useEffect, useState } from 'react';

function Clock({ className, ...others }: React.HTMLAttributes<HTMLDivElement>) {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // Limpieza del intervalo
  }, []);

  return (
    <div className={`digital-clock ${className}`} {...others}>
      {currentTime}
    </div>
  );
}

export default Clock;
