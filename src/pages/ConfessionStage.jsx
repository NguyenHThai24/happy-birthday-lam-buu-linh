import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfessionStage = ({ onComplete }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  // Memoize confession steps to prevent unnecessary re-renders
  const confessionSteps = useMemo(
    () => [
      { text: "...", duration: 4000 },
      { text: "Em có vài điều muốn chia sẻ với chị...", duration: 3500 },
      { text: "Từ ngày đầu tiên nói chuyện, 27/08", duration: 4000 },
      { text: "Em đã nhận ra chị là một người rất đặc biệt", duration: 4000 },
      { text: "Mỗi lần được trò chuyện cùng chị", duration: 3500 },
      { text: "Hay những lần chơi cầu lông cùng nhau", duration: 4000 },
      { text: "Đều mang lại cho em những cảm xúc rất đẹp", duration: 4000 },
      { text: "Chị có một năng lượng tích cực kỳ lạ", duration: 3500 },
      { text: "Cách chị cười, cách chị nói chuyện", duration: 3500 },
      {
        text: "Luôn khiến mọi thứ xung quanh trở nên tươi sáng hơn",
        duration: 4000,
      },
      { text: "Nhờ có chị, em đã học được nhiều điều", duration: 4000 },
      {
        text: "Về sự trưởng thành, về cách suy nghĩ chín chắn",
        duration: 4000,
      },
      { text: "Và em thực sự trân trọng điều đó", duration: 3500 },
      {
        text: "Em biết cuộc sống không phải lúc nào cũng màu hồng",
        duration: 4000,
      },
      { text: "Sẽ có những ngày chị cảm thấy mệt mỏi", duration: 3500 },
      {
        text: "Những lúc chị nghi ngờ về các lựa chọn của mình",
        duration: 4000,
      },
      { text: "Nhưng chị hãy nhớ một điều...", duration: 3500 },
      { text: "Dù chị có điều gì sai lầm hay vấp ngã", duration: 4000 },
      { text: "Dù chị có chọn ai hay con đường nào", duration: 4000 },
      { text: "Thì em vẫn sẽ ở đây, chờ đợi chị", duration: 4000 },
      { text: "Không phải như một áp lực", duration: 3500 },
      {
        text: "Mà như một điểm tựa bình yên chị có thể tìm về",
        duration: 4000,
      },
      { text: "Điều em muốn nói là...", duration: 3500 },
      { text: "Dù tương lai thế nào, dù chị lựa chọn điều gì", duration: 4000 },
      { text: "Thì điều quan trọng nhất với em", duration: 4000 },
      { text: "Là được thấy chị luôn hạnh phúc", duration: 3500 },
      { text: "Được thấy nụ cười tỏa nắng của chị", duration: 4000 },
      { text: "Được thấy chị sống thật vui vẻ và nhẹ nhàng", duration: 4000 },
      { text: "Với em, chỉ cần được làm một người bạn", duration: 3500 },
      { text: "Được đồng hành và chia sẻ cùng chị", duration: 4000 },
      { text: "Cũng đã là một điều quý giá rồi", duration: 4000 },
      { text: "Em chúc chị luôn giữ được sự lạc quan ấy", duration: 3500 },
      { text: "Luôn tìm thấy niềm vui trong cuộc sống", duration: 4000 },
      { text: "Và hãy cứ là chính mình, như chị vẫn luôn thế", duration: 5000 },
      { text: "Cảm ơn chị vì tất cả 🌟", duration: 5000 },
    ],
    []
  );

  // Optimized background elements with pre-calculated values
  const backgroundHearts = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        fontSize: 20 + Math.random() * 30,
        duration: 45 + Math.random() * 30,
        delay: Math.random() * 12,
      })),
    []
  );

  const backgroundBubbles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 40 + Math.random() * 80,
        duration: 25 + Math.random() * 20,
        delay: Math.random() * 8,
      })),
    []
  );

  const cardHearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.cos((i * Math.PI * 2) / 8) * 250,
        top: Math.sin((i * Math.PI * 2) / 8) * 200,
        duration: 8 + i * 0.8,
      })),
    []
  );

  const innerHearts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: i * 1.2,
      })),
    []
  );

  // Heart explosion elements
  const heartExplosionElements = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        rotate: Math.random() * 360,
        type: ["💕", "💖", "💗", "💝", "✨"][Math.floor(Math.random() * 5)],
      })),
    []
  );

  // Memoized progress calculation
  const totalSteps = confessionSteps.length;
  const progressPercent = useMemo(
    () => ((stage + 1) / totalSteps) * 100,
    [stage, totalSteps]
  );

  // Password handlers
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "2708") {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("Mật khẩu không đúng 💔");
      setPassword("");
    }
  };

  const handleNumberClick = (num) => {
    if (password.length < 4) {
      setPassword(password + num);
      setError("");
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
    setError("");
  };

  // Optimized useEffect with cleanup
  useEffect(() => {
    if (!isUnlocked) return;

    if (stage < confessionSteps.length) {
      const currentStep = confessionSteps[stage];
      let progressInterval;

      const timer = setTimeout(() => {
        setStage(stage + 1);
      }, currentStep.duration);

      setProgress(0);
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (currentStep.duration / 100);
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, currentStep.duration / 100);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else if (stage === confessionSteps.length) {
      const timer = setTimeout(() => {
        onComplete?.("completed");
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [stage, confessionSteps, onComplete, isUnlocked]);

  // Password screen
  if (!isUnlocked) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden flex items-center justify-center">
        {/* Background hearts */}
        <div className="absolute inset-0">
          {backgroundHearts.slice(0, 8).map((heart) => (
            <motion.div
              key={`heart-${heart.id}`}
              className="absolute text-pink-400/30 pointer-events-none"
              style={{
                left: `${heart.left}%`,
                top: `${heart.top}%`,
                fontSize: `${heart.fontSize}px`,
              }}
              animate={{
                y: [0, -80, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
                ease: "easeInOut",
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-pink-200 p-8 md:p-12 shadow-2xl max-w-md w-full mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-6xl text-center mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔐
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-light text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-center mb-2">
            Nhập mật khẩu
          </h2>
          <p className="text-pink-500 text-center mb-8 text-sm">
            Để xem lời nhắn đặc biệt 💖
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            {/* Password display */}
            <div className="flex justify-center gap-3 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-14 h-14 rounded-2xl border-2 border-pink-300 bg-pink-50 flex items-center justify-center text-2xl font-medium text-pink-600"
                  animate={password.length === i ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {password[i] ? "•" : ""}
                </motion.div>
              ))}
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-500 text-center text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Number pad */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  type="button"
                  onClick={() => handleNumberClick(num.toString())}
                  className="h-14 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 font-medium text-xl transition-all shadow-sm"
                  whileTap={{ scale: 0.95 }}
                >
                  {num}
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={handleDelete}
                className="h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium text-sm transition-all shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                Xóa
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleNumberClick("0")}
                className="h-14 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 font-medium text-xl transition-all shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                0
              </motion.button>
              <motion.button
                type="submit"
                disabled={password.length !== 4}
                className="h-14 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: password.length === 4 ? 0.95 : 1 }}
              >
                OK
              </motion.button>
            </div>
          </form>

          <p className="text-pink-400 text-center mt-6 text-xs">
            Gợi ý: Ngày đầu tiên chúng ta nói chuyện 💕
          </p>
        </motion.div>
      </div>
    );
  }

  // Main confession content
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden">
      {/* Optimized Floating hearts background */}
      <div className="absolute inset-0">
        {backgroundHearts.map((heart) => (
          <motion.div
            key={`heart-${heart.id}`}
            className="absolute text-pink-400/30 pointer-events-none"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: `${heart.fontSize}px`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut",
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Optimized Floating bubbles */}
      <div className="absolute inset-0">
        {backgroundBubbles.map((bubble) => (
          <motion.div
            key={`bubble-${bubble.id}`}
            className="absolute rounded-full bg-gradient-to-br from-pink-300/20 to-rose-300/20 backdrop-blur-sm pointer-events-none"
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Main confession cards */}
        {stage < confessionSteps.length && (
          <motion.div
            key={`stage-${stage}`}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Optimized Animated hearts around card */}
            {cardHearts.map((heart) => (
              <motion.div
                key={`card-heart-${heart.id}`}
                className="absolute text-4xl z-0 pointer-events-none"
                style={{
                  left: `calc(50% + ${heart.left}px)`,
                  top: `calc(50% + ${heart.top}px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: heart.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {["💖", "💝", "💗", "💕"][heart.id % 4]}
              </motion.div>
            ))}

            {/* Main card */}
            <motion.div
              className="max-w-4xl w-full relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-pink-200 shadow-2xl overflow-hidden">
                {/* Pink gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-rose-100/30 to-transparent" />

                {/* Optimized Floating small hearts inside card */}
                <div className="absolute inset-0 overflow-hidden">
                  {innerHearts.map((heart) => (
                    <motion.div
                      key={`inner-heart-${heart.id}`}
                      className="absolute text-pink-300/25 text-2xl pointer-events-none"
                      style={{
                        left: `${heart.left}%`,
                        top: `${heart.top}%`,
                      }}
                      animate={{
                        y: [0, -25, 0],
                        opacity: [0.15, 0.4, 0.15],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: heart.delay,
                      }}
                    >
                      💕
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <div className="relative p-8 md:p-16 min-h-[400px] flex items-center justify-center">
                  <motion.h1
                    className="text-3xl md:text-5xl lg:text-6xl font-light text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 bg-clip-text text-center leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {confessionSteps[stage].text}
                  </motion.h1>
                </div>

                {/* Bottom progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-pink-100">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Hint text */}
              <motion.p
                className="text-pink-600 text-center mt-6 text-sm flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="animate-pulse">💗</span>
                Đang đọc...
                <span className="animate-pulse">💗</span>
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {/* Final response */}
        {stage === confessionSteps.length && (
          <motion.div
            key="final"
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Heart explosion */}
            {heartExplosionElements.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-2xl pointer-events-none"
                style={{ left: "50%", top: "50%" }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0.8],
                  x: heart.x,
                  y: heart.y,
                  rotate: heart.rotate,
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              >
                {heart.type}
              </motion.div>
            ))}

            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-pink-200 p-10 md:p-16 shadow-2xl max-w-2xl text-center relative z-10"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <motion.div
                className="text-7xl mb-6"
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5 }}
              >
                💝
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-light text-transparent text-center bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text mb-4">
                Cảm ơn chị đã đọc những dòng tâm sự này.
                <br />
                Em luôn ở đây chờ chị
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfessionStage;
