import hbImage from "../assets/happy-birthday.png";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

const EmojiHeart = () => {
  const total = 30;
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tính toán kích thước trái tim dựa trên kích thước màn hình
  const getHeartSize = () => {
    const minDimension = Math.min(windowSize.width, windowSize.height);
    // Trái tim sẽ chiếm 30-40% của kích thước màn hình nhỏ hơn
    return Math.max(300, minDimension * 0.35);
  };

  const getHeartPoints = (n, heartSize) => {
    const points = [];
    const scale = heartSize / 40; // Scale factor based on heart size

    for (let i = 0; i < n; i++) {
      const t = (Math.PI * 2 * i) / n;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      points.push({
        x: x * scale,
        y: -y * scale,
      });
    }
    return points;
  };

  const heartSize = getHeartSize();
  const emojis = useMemo(() => {
    const heartPoints = getHeartPoints(total, heartSize);
    const emojiList = ["🎂", "🎉", "🎈", "🎁", "✨", "💝"];
    return heartPoints.map((p, i) => ({
      ...p,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      delay: i * 0.05,
      rotation: Math.random() * 360,
    }));
  }, [total, heartSize]);

  const confetti = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      emoji: ["🎊", "🎉", "⭐"][Math.floor(Math.random() * 3)],
      x: Math.random() * 100,
      delay: Math.random() * 3,
    }));
  }, []);

  // Tính toán font size cho emoji dựa trên kích thước trái tim
  const emojiFontSize = Math.max(16, heartSize / 20);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-300 to-purple-400 overflow-hidden">
      {/* Background blob responsive */}
      <motion.div
        className="absolute top-0 left-0 bg-white/20 rounded-full blur-3xl"
        style={{
          width: heartSize * 1.5,
          height: heartSize * 1.5,
        }}
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
          style={{
            left: `${item.x}%`,
            top: -50,
            willChange: "transform",
            fontSize: `${emojiFontSize * 0.8}px`,
          }}
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
        {/* Responsive glow effect */}
        <motion.div
          className="absolute bg-pink-500/30 rounded-full blur-[80px]"
          style={{
            width: heartSize * 1.3,
            height: heartSize * 1.3,
          }}
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

        {/* Responsive emoji heart */}
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
              className="absolute"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                willChange: "transform",
                fontSize: `${emojiFontSize}px`,
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center heart - responsive */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          fontSize: `${heartSize * 0.15}px`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        💖
      </motion.div>

      {/* Happy Birthday Image with responsive sizing */}
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
              style={{
                width: `${Math.min(350, windowSize.width * 0.4)}px`,
                maxWidth: "350px",
              }}
              className="drop-shadow-2xl"
            />
          ) : (
            <div className="text-6xl font-bold text-white drop-shadow-2xl"></div>
          )}
        </motion.div>

        {/* Responsive sparkles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${30 + i * 20}%`,
              top: i % 2 === 0 ? "-20px" : "auto",
              bottom: i % 2 === 1 ? "-20px" : "auto",
              fontSize: `${emojiFontSize * 0.8}px`,
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

      {/* Responsive floating bubbles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: -20,
            willChange: "transform",
            width: `${heartSize * 0.015}px`,
            height: `${heartSize * 0.015}px`,
          }}
          animate={{
            y: [0, -windowSize.height - 100],
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
