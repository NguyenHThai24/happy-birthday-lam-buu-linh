import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const backgroundLetters = "HAPPYBIRTHDAYLÂMBỬULINH".split("");

const BackgroundLetters = () => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const arr = Array.from({ length: 200 }).map(() => ({
      letter:
        backgroundLetters[Math.floor(Math.random() * backgroundLetters.length)],
      x: Math.random() * width,
      y: -Math.random() * height,
      duration: 4 + Math.random() * 6,
      size: 7 + Math.random() * 24,
    }));

    setLetters(arr);
  }, []);

  return (
    <>
      {letters.map((item, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            // fontSize: item.size,
            fontSize: "1rem",
            color: "#1105FC",
            // fontWeight: "bold",
            userSelect: "none",
            opacity: 0.4,
          }}
          initial={{ y: item.y }}
          animate={{ y: window.innerHeight + 50 }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {item.letter}
        </motion.div>
      ))}
    </>
  );
};

export default BackgroundLetters;
