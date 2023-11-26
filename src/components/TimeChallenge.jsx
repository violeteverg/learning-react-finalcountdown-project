import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimeChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  let timeTarget = targetTime * 1000;

  const [timeRemaining, setTimeRemaining] = useState(timeTarget);

  const timerActive = timeRemaining > 0 && timeRemaining < timeTarget;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function resetTimer() {
    setTimeRemaining(timeTarget);
  }

  function timerStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function timerStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={resetTimer}
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerActive ? timerStop : timerStart}>
            {timerActive ? "stop" : "start"} Challenge
          </button>
        </p>
        <p className={timerActive ? "active" : undefined}>
          {timerActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
