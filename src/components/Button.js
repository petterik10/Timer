import React from "react";

function Button(props) {
  return (
    <div className="circle-wrapper">
      <div className="circle">
        <div className={props.classContent}></div>
      </div>
      <p onClick={props.click} type="button">
        {props.name}
      </p>
    </div>
  );
}

export default Button;
