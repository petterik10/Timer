import React from "react";

function Timer(props) {
  return (
    <div>
      <h1>Timer</h1>
      <div className="timer">{props.timer(props.time)}</div>
    </div>
  );
}

export default Timer;
