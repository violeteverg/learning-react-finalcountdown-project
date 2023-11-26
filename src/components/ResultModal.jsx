import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLose = remainingTime <= 0;
  const userRemainingTime = (remainingTime / 1000).toFixed(2);
  const userScore = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLose && <h2>you lose</h2>}
      {!userLose && <h2>your score: {userScore}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>{" "}
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{userRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
