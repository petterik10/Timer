import React, { useState, useRef, useEffect, useReducer } from "react";
import Alarm from "./Alarm";
import Button from "./Button";
import Audio1 from "./Audio1";
import Timer from "./Timer";
import timeMinutes from "../minutes";

function App() {
  const [time, setTime] = useState(25 * 60);
  const optionRef = useRef();
  const [interValID, setInterValId] = useState(null);
  const audioElement = useRef(null);

  function reducer(state, action) {
    switch (action.type) {
      case "resetTimer":
        return { ...state, playAndPause: false, timerOption: false };
      case "stopPlaying": {
        return { ...state, playAndPause: true };
      }
      case "timerOptions": {
        return { ...state, timerOption: true };
      }
      case "alarmOff": {
        return {
          ...state,
          timerState: state.anothersTime,
          playAndPause: false,
          timerOption: false,
          music: false,
        };
      }
      case "playMusic": {
        return { ...state, music: true };
      }
      default: {
        return { ...state };
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    playAndPause: false,
    timerOption: false,
    anothersTime: 25 * 60,
    timerState: 25 * 60,
    music: false,
  });

  useEffect(() => {
    if (time === 0) {
      dispatch({ type: "playMusic" });
      audioElement.current.play();
      clearInterval(interValID);
      setInterValId(null);
    }
  }, [time, interValID]);

  const timeConverter = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  const showTimerOptions = () => {
    dispatch({ type: "timerOptions" });
  };

  const setTimerAfterOption = () => {
    clearInterval(interValID);
    setInterValId(null);
    setTime(optionRef.current.value);
    dispatch({ type: "stopPlaying" });
    dispatch({ type: "resetTimer" });
  };

  const handlePlayAndPause = () => {
    if (!state.playAndPause) {
      dispatch({ type: "stopPlaying" });
      const newIntervalId = setInterval(() => {
        setTime((preValue) => {
          return preValue - 1;
        });
      }, 1000);
      setInterValId(newIntervalId);
    } else if (state.playAndPause) {
      dispatch({ type: "resetTimer" });
      clearInterval(interValID);
      setInterValId(null);
    }
  };

  const refreshTimer = (event) => {
    const targ = event.target;
    targ.classList.add("pressed");
    setTimeout(() => {
      targ.classList.remove("pressed");
    }, 100);
    if (state.playAndPause) {
      clearInterval(interValID);
      setInterValId(null);
      dispatch({ type: "alarmOff" });
      setTime(state.anothersTime);
    }
  };

  const setTheAlarmOff = () => {
    dispatch({ type: "alarmOff" });
    setTime(state.anothersTime);
    audioElement.current.load();
  };

  return (
    <div className="wrapper">
      <Timer timer={timeConverter} time={time} />
      <div className="wrapper-2">
        <Audio1 audio={audioElement} />

        <Button click={showTimerOptions} classContent="modify" name="Modify" />

        <Button click={refreshTimer} classContent="refresh" name="Refresh" />

        {state.playAndPause ? (
          <Button
            click={handlePlayAndPause}
            classContent="start"
            name="Pause"
          />
        ) : (
          <Button
            click={handlePlayAndPause}
            classContent="pause"
            name="Start"
          />
        )}

        {state.timerOption ? (
          <div className="form-group">
            <label htmlFor="option"> </label>
            <select id="option" onChange={setTimerAfterOption} ref={optionRef}>
              {timeMinutes.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {timeConverter(option)}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          ""
        )}

        {state.music ? <Alarm alarm={setTheAlarmOff} /> : ""}
      </div>
    </div>
  );
}

export default App;
