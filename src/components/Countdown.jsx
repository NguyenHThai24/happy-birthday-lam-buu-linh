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
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 60, 0],
            y: [0, 40, 0],
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
            x: [0, -40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-rose-300/25 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating hearts and sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${20 + Math.random() * 20}px`,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 0.6, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          {["💕", "💖", "💗", "✨", "⭐", "🌸"][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {/* Intro steps */}
        {count === null && stepIndex < steps.length && (
          <motion.div
            key={steps[stepIndex].text}
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
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
              {/* Glow behind text */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

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
                      scale: [1, 1.8, 1],
                      opacity: [0.4, 1, 0.4],
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

            {/* Decorative floating elements */}
            <motion.div
              className="absolute"
              animate={{
                y: [-30, 30],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ top: "15%", left: "10%" }}
            >
              <span className="text-8xl opacity-40 drop-shadow-xl">💖</span>
            </motion.div>
            <motion.div
              className="absolute"
              animate={{
                y: [30, -30],
                rotate: [0, -15, 15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ bottom: "15%", right: "10%" }}
            >
              <span className="text-8xl opacity-40 drop-shadow-xl">🎂</span>
            </motion.div>
            <motion.div
              className="absolute"
              animate={{
                y: [-20, 20],
                x: [-10, 10],
                rotate: [0, 20, -20, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ top: "25%", right: "15%" }}
            >
              <span className="text-7xl opacity-35 drop-shadow-xl">🎉</span>
            </motion.div>
            <motion.div
              className="absolute"
              animate={{
                y: [20, -20],
                x: [10, -10],
                rotate: [0, -20, 20, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ bottom: "25%", left: "15%" }}
            >
              <span className="text-7xl opacity-35 drop-shadow-xl">🌸</span>
            </motion.div>
          </motion.div>
        )}

        {/* Countdown numbers */}
        {count !== null && count > 0 && (
          <motion.div
            key={count}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 180,
              damping: 12,
            }}
          >
            <div className="relative">
              {/* Multiple layered glow effects */}
              <motion.div
                className="absolute inset-0 bg-white/40 rounded-full blur-3xl"
                style={{
                  width: "200%",
                  height: "200%",
                  left: "-50%",
                  top: "-50%",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 bg-pink-200/50 rounded-full blur-2xl"
                style={{
                  width: "150%",
                  height: "150%",
                  left: "-25%",
                  top: "-25%",
                }}
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.5, 0.8, 0.5],
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
                    "0 0 60px rgba(255,255,255,0.8), 0 0 120px rgba(255,182,193,0.6), 0 10px 40px rgba(0,0,0,0.3)",
                }}
                animate={{
                  textShadow: [
                    "0 0 60px rgba(255,255,255,0.8), 0 0 120px rgba(255,182,193,0.6)",
                    "0 0 100px rgba(255,255,255,1), 0 0 160px rgba(255,182,193,0.8)",
                    "0 0 60px rgba(255,255,255,0.8), 0 0 120px rgba(255,182,193,0.6)",
                  ],
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                {count}
              </motion.div>

              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 border-[10px] border-white/60 rounded-full"
                style={{
                  width: "140%",
                  height: "140%",
                  left: "-20%",
                  top: "-20%",
                }}
                initial={{ scale: 0.9, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
              />

              {/* Secondary ring */}
              <motion.div
                className="absolute inset-0 border-[8px] border-pink-200/50 rounded-full"
                style={{
                  width: "130%",
                  height: "130%",
                  left: "-15%",
                  top: "-15%",
                }}
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.1,
                }}
              />
            </div>

            {/* Sparkle burst */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: Math.cos((i * Math.PI * 2) / 16) * 250,
                  y: Math.sin((i * Math.PI * 2) / 16) * 250,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Heart burst */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-4xl"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1, 0.5],
                  x: Math.cos((i * Math.PI * 2) / 8) * 200,
                  y: Math.sin((i * Math.PI * 2) / 8) * 200,
                  rotate: [0, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
              >
                💕
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Countdown;
