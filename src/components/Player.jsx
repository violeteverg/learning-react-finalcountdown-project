import { useRef, useState } from "react";

export default function Player() {
  const userName = useRef();
  const [enteredName, setEnteredName] = useState(null);

  const buttonHandler = () => {
    setEnteredName(userName.current.value);
    userName.current.value = "";
  };

  return (
    <section id="player">
      <h2>Welcome {enteredName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={userName} />
        <button onClick={buttonHandler}>Set Name</button>
      </p>
    </section>
  );
}
