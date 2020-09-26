import React from "react";
import { motion } from "framer-motion";

function Alarm(props) {
  return (
    
      <motion.div
        animate={{
          scale: [0, 0.2, 0.5, 1, 1.4],
          // rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "20%", "20%", "20%"],
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          loop: Infinity,
          repeatDelay: 0.1,
        }}
         className="beep"
      >
        <p className="clear">Clear the alarm by clicking ok </p>
        <button onClick={props.alarm} className="ok-button">
          OK
        </button>
      </motion.div>
  );
}

export default Alarm;
