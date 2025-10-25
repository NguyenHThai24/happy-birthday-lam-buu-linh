import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Countdown = ({ onComplete }) => {
  const steps = [{ text: "Chúc chị một ngày đặc biệt...", duration: 3000 }];

  const [stepIndex, setStepIndex] = useState(0);
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (count === null && stepIndex < steps.length) {
      const timer = setTimeout(
        () => setStepIndex((prev) => prev + 1),
        steps[stepIndex].duration
      );
      return () => clearTimeout(timer);
    } else if (count === null && stepIndex === steps.length) {
      setCount(3);
    } else if (count !== null && count > 0) {
      const timer = setTimeout(() => setCount((c) => c - 1), 1500);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      if (onComplete) onComplete();
    }
  }, [stepIndex, count, steps, onComplete]);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 overflow-hidden">
      {/* Simplified animated background blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Reduced floating hearts - only 10 instead of 30 */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${25 + Math.random() * 15}px`,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        >
          {["💕", "💖", "✨"][Math.floor(Math.random() * 3)]}
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {/* Intro steps */}
        {count === null && stepIndex < steps.length && (
          <motion.div
            key={steps[stepIndex].text}
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center relative"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h1 className="relative text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
                {steps[stepIndex].text}
              </h1>

              <motion.div
                className="flex justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 bg-white rounded-full shadow-lg"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Simplified decorative elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 text-7xl opacity-30"
              animate={{ y: [-20, 20] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              💖
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 right-1/4 text-7xl opacity-30"
              animate={{ y: [20, -20] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🎂
            </motion.div>
          </motion.div>
        )}

        {/* Countdown numbers */}
        {count !== null && count > 0 && (
          <motion.div
            key={count}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <div className="relative">
              {/* Simplified glow */}
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full blur-3xl"
                style={{
                  width: "200%",
                  height: "200%",
                  left: "-50%",
                  top: "-50%",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              />

              {/* Number */}
              <motion.div
                className="relative text-white font-black drop-shadow-2xl"
                style={{
                  fontSize: "clamp(8rem, 25vw, 20rem)",
                  textShadow:
                    "0 0 60px rgba(255,255,255,0.8), 0 10px 40px rgba(0,0,0,0.3)",
                }}
              >
                {count}
              </motion.div>

              {/* Single pulsing ring */}
              <motion.div
                className="absolute inset-0 border-8 border-white/50 rounded-full"
                style={{
                  width: "140%",
                  height: "140%",
                  left: "-20%",
                  top: "-20%",
                }}
                initial={{ scale: 0.9, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
              />

              {/* Reduced sparkle burst - only 8 instead of 16 */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 8) * 200,
                    y: Math.sin((i * Math.PI * 2) / 8) * 200,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Countdown;
