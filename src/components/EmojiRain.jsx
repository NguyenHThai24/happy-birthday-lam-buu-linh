import hbImage from "../assets/happy-birthday.png";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

const EmojiHeart = () => {
  const total = 30; // Giảm từ 50 xuống 30

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
    const emojiList = ["🎂", "🎉", "🎈", "🎁", "✨", "💝"];
    return heartPoints.map((p, i) => ({
      ...p,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      delay: i * 0.05,
      rotation: Math.random() * 360,
    }));
  }, [total]);

  // Giảm confetti từ 30 xuống 15
  const confetti = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      emoji: ["🎊", "🎉", "⭐"][Math.floor(Math.random() * 3)],
      x: Math.random() * 100,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-300 to-purple-400 overflow-hidden">
      {/* Simplified background blobs - chỉ 1 blob */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Falling confetti */}
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl"
          style={{ left: `${item.x}%`, top: -50, willChange: "transform" }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
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
        {/* Simplified glow effect */}
        <motion.div
          className="absolute w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
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
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: item.x,
                y: item.y,
                opacity: 1,
                scale: 1,
                rotate: item.rotation,
              }}
              transition={{
                duration: 2,
                delay: item.delay,
                ease: "easeOut",
              }}
              className="absolute text-3xl"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                willChange: "transform",
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center heart - bỏ animation pulsing */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        💖
      </motion.div>

      {/* Happy Birthday Image with simplified animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 2.5,
          duration: 1,
          ease: "easeOut",
        }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {hbImage ? (
            <img
              src={hbImage}
              alt="Happy Birthday"
              className="w-[300px] md:w-[350px] drop-shadow-2xl"
            />
          ) : (
            <div className="text-6xl font-bold text-white drop-shadow-2xl"></div>
          )}
        </motion.div>

        {/* Giảm sparkles từ 6 xuống 3 */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${30 + i * 20}%`,
              top: i % 2 === 0 ? "-20px" : "auto",
              bottom: i % 2 === 1 ? "-20px" : "auto",
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5 + 2.5,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>

      {/* Giảm floating bubbles từ 15 xuống 8 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute w-3 h-3 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: -20,
            willChange: "transform",
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            scale: [0, 1, 0.5],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default EmojiHeart;
