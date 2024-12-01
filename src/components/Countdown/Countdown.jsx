import React, { useState, useEffect } from "react";

const Countdown = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete(); // Notify parent
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer); // Clean up on unmount
  }, [timeLeft, onComplete]);

  return <div>{timeLeft > 0 ? <p>Detecting in {timeLeft}...</p> : null}</div>;
};

export default Countdown;
