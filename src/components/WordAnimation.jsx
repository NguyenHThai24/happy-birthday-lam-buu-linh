import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const getRandomOutside = (width, height) => {
  const side = Math.floor(Math.random() * 4);
  switch (side) {
    case 0:
      return { x: Math.random() * width, y: -100 };
    case 1:
      return { x: width + 100, y: Math.random() * height };
    case 2:
      return { x: Math.random() * width, y: height + 100 };
    default:
      return { x: -100, y: Math.random() * height };
  }
};

const WordAnimation = ({
  letters,
  y,
  onComplete,
  stayTime = 3000,
  animationStyle = "fly",
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Tách thành các từ để xuống dòng nguyên từ
  const text = letters.join("");
  const words = text.split(" ");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, stayTime + 2000);
    return () => clearTimeout(timer);
  }, [onComplete, stayTime]);

  const getAnimationProps = (randomStart, randomEnd, index) => {
    const baseProps = {
      initial: { x: randomStart.x, y: randomStart.y, opacity: 0 },
      animate: {
        x: [randomStart.x, 0, 0, randomEnd.x],
        y: [randomStart.y, 0, 0, randomEnd.y],
        opacity: [0, 1, 1, 0],
      },
      transition: {
        times: [0, 0.25, 0.75, 1],
        duration: 1.5 + stayTime / 1000 + 1.5,
        ease: "easeInOut",
        delay: index * 0.1,
      },
    };

    switch (animationStyle) {
      case "bounce":
        return {
          ...baseProps,
          animate: {
            ...baseProps.animate,
            scale: [0, 1.2, 1, 0],
            rotate: [-180, 0, 0, 180],
          },
        };
      case "scale":
        return {
          ...baseProps,
          animate: {
            ...baseProps.animate,
            scale: [0, 1.5, 1, 0],
          },
        };
      case "twist":
        return {
          ...baseProps,
          animate: {
            ...baseProps.animate,
            rotate: [0, 360, 360, -360],
            scale: [0, 1, 1, 0],
          },
        };
      default:
        return baseProps;
    }
  };

  const getLetterStyle = () => {
    return {
      display: "inline-block",
      fontSize: `${Math.min(screenWidth, screenHeight) * 0.08}px`,
      fontWeight: "900",
      color: "#FF1493",
      userSelect: "none",
      fontFamily: '"Playfair Display", serif',
      margin: "0 4px",
      textShadow: `
        3px 3px 0 #FF69B4,
        6px 6px 0 #FFB6C1,
        9px 9px 0 #FFC0CB,
        12px 12px 15px rgba(255,20,147,0.4),
        -1px -1px 0 #C71585,
        1px 1px 0 #C71585
      `,
      transform: "translateZ(0)",
      position: "relative",
      WebkitTextStroke: "2px #C71585",
      paintOrder: "stroke fill",
    };
  };

  const getWordStyle = () => {
    return {
      display: "inline-block",
      whiteSpace: "nowrap",
      margin: "8px 16px",
    };
  };

  let letterIndex = 0;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "1200px",
        textAlign: "center",
        lineHeight: 1.8,
        pointerEvents: "none",
        zIndex: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {words.map((word, wordIdx) => {
        const wordLetters = word.split("");
        return (
          <div key={wordIdx} style={getWordStyle()}>
            {wordLetters.map((letter, letterIdx) => {
              const currentIndex = letterIndex++;
              const randomStart = getRandomOutside(screenWidth, screenHeight);
              const randomEnd = getRandomOutside(screenWidth, screenHeight);
              const animationProps = getAnimationProps(
                randomStart,
                randomEnd,
                currentIndex
              );

              return (
                <motion.span
                  key={letterIdx}
                  style={getLetterStyle()}
                  {...animationProps}
                  whileHover={{
                    scale: 1.15,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WordAnimation;
