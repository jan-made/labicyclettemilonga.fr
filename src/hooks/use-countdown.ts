'use client';
import { useEffect, useState } from 'react';

export default function useCountdown({ deadline }: { deadline: Date }) {
  const [countdown, setCountdown] = useState(
    deadline.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(deadline.getTime() - new Date().getTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [deadline]);

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, inFuture: countdown > 0 };
}
