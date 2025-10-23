import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const backgroundLetters = "❤️".split("");

const Firework = ({ onComplete }) => {
  const [explosions, setExplosions] = useState([]);

  useEffect(() => {
    spawnExplosion();
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const spawnExplosion = () => {
    const particleCount = 500;
    const particles = Array.from({ length: particleCount }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const power = 250 + Math.random() * 250;
      const char =
        backgroundLetters[Math.floor(Math.random() * backgroundLetters.length)];
      return {
        x: Math.cos(angle) * power,
        y: Math.sin(angle) * power,
        char,
        color: "red",
      };
    });

    const newExplosion = { id: Date.now(), particles };
    setExplosions([newExplosion]);

    setTimeout(() => setExplosions([]), 5000);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {explosions.map((exp) =>
        exp.particles.map((p, i) => (
          <motion.div
            key={exp.id + "-" + i}
            style={{
              position: "absolute",
              fontSize: 16,
              color: p.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: [0, p.x, p.x * 0.8],
              y: [0, p.y, p.y + 200],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {p.char}
          </motion.div>
        ))
      )}
    </div>
  );
};

export default Firework;
