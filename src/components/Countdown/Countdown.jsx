import { useState, useEffect } from "react";

function Countdown({ startCountdown, onCountdownComplete }) {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    let interval;
    if (startCountdown) {
      let timer = 3;
      setCountdown(timer);

      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);

        if (timer <= 0) {
          clearInterval(interval);
          setCountdown(null);
          onCountdownComplete();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startCountdown]);

  return <>{countdown !== null && <h1>{countdown}</h1>}</>;
}

export default Countdown;
