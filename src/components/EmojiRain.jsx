import React, { useMemo } from "react";
import { motion } from "framer-motion";
import hbImage from "../assets/happy-birthday.png";

const EmojiHeart = () => {
  const total = 50;

  const getHeartPoints = (n) => {
    const points = [];
    for (let i = 0; i < n; i++) {
      const t = (Math.PI * 2 * i) / n;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      points.push({ x: x * 13, y: -y * 13 });
    }
    return points;
  };

  const emojis = useMemo(() => {
    const heartPoints = getHeartPoints(total);
    const emojiList = ["🎂", "🎉", "🎈", "🎁", "✨", "💝", "🌸", "🦋"];
    return heartPoints.map((p, i) => ({
      ...p,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      delay: i * 0.05,
      rotation: Math.random() * 360,
    }));
  }, [total]);

  // Confetti particles
  const confetti = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      emoji: ["🎊", "🎉", "⭐", "✨", "💫"][Math.floor(Math.random() * 5)],
      x: Math.random() * 100,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-300 to-purple-400 overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Falling confetti */}
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-3xl"
          style={{ left: `${item.x}%`, top: -50 }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Heart shape container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Glow effect behind heart */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Emoji heart */}
        <div className="relative">
          {emojis.map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                x: item.x,
                y: item.y,
                opacity: 1,
                scale: 1,
                rotate: item.rotation,
              }}
              transition={{
                duration: 2.5,
                delay: item.delay,
                ease: "easeOut",
              }}
              className="absolute text-3xl"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
              }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                }}
              >
                {item.emoji}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center decorative elements */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, type: "spring" }}
      >
        <motion.div
          className="text-8xl"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💖
        </motion.div>
      </motion.div>

      {/* Happy Birthday Image with animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          delay: 3,
          duration: 1,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={hbImage}
            alt="Happy Birthday"
            className="w-[350px] md:w-[400px] drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
            }}
          />
        </motion.div>

        {/* Sparkles around image */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${20 + i * 15}%`,
              top: i % 2 === 0 ? "-20px" : "auto",
              bottom: i % 2 === 1 ? "-20px" : "auto",
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3 + 3,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>

      {/* Floating bubbles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute w-4 h-4 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: -20,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.random() * 100 - 50],
            scale: [0, 1, 0.5],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default EmojiHeart;
