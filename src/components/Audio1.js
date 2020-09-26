import React from "react";
export default function Audio1(props) {
  return (
    <audio id="beep" ref={props.audio}>
      <source
        src="https://www.soundjay.com/button/sounds/beep-01a.mp3"
        type="audio/mpeg"
      />
    </audio>
  );
}
