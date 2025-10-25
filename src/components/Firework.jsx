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
    // Giảm từ 500 xuống 100 particles
    const particleCount = 100;
    const particles = Array.from({ length: particleCount }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const power = 250 + Math.random() * 150;
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

    setTimeout(() => setExplosions([]), 3000);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {explosions.map((exp) =>
        exp.particles.map((p, i) => (
          <motion.div
            key={exp.id + "-" + i}
            style={{
              position: "absolute",
              fontSize: 20,
              color: p.color,
              willChange: "transform",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: p.x,
              y: p.y + 150,
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
            }}
          >
            {p.char}
          </motion.div>
        ))
      )}
    </div>
  );
};

export default Firework;
