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
      { text: "Em muốn nói với chị...", duration: 3500 },
      { text: "Từ lần đầu tiên gặp chị", duration: 4000 },
      { text: "Em đã cảm thấy điều gì đó khác biệt", duration: 4000 },
      { text: "Có lẽ đó là định mệnh", duration: 3500 },
      { text: "Em còn nhớ ngày 27/08", duration: 3500 },
      { text: "Là ngày đầu tiên chúng ta nói chuyện", duration: 4000 },
      { text: "Em vẫn nhớ cảm giác đó", duration: 4000 },
      { text: "Từng chơi cầu lông, rồi cùng nhau nói chuyện", duration: 3500 },
      { text: "Đều khiến em hạnh phúc", duration: 3500 },
      { text: "27/08 - một ngày thật đặc biệt", duration: 4000 },
      { text: "Khi cuộc đời em bắt đầu thay đổi", duration: 4000 },
      { text: "Nhờ có chị bước vào", duration: 3500 },
      {
        text: "Chị đã giúp em nhận ra nhiều điều trong cuộc sống",
        duration: 4000,
      },
      {
        text: "Dạy em cách suy nghĩ chín chắn và trưởng thành hơn",
        duration: 4000,
      },
      {
        text: "Có những lúc em còn trẻ con, nói những lời không phải",
        duration: 4000,
      },
      { text: "Nhưng chính những lần vấp ngã ấy", duration: 3500 },
      {
        text: "Lại giúp em nhận ra giá trị của sự trưởng thành",
        duration: 4000,
      },
      {
        text: "Em đã dành thời gian suy ngẫm về những sai sót",
        duration: 4000,
      },
      { text: "Để hoàn thiện bản thân mỗi ngày", duration: 3500 },
      { text: "Để xứng đáng hơn với tình cảm của chị", duration: 4000 },
      { text: "Mỗi lần nhìn thấy chị", duration: 3500 },
      { text: "Tim em lại đập nhanh hơn", duration: 4000 },
      { text: "Giọng nói của chị", duration: 3500 },
      { text: "Luôn ngập tràn sự hồn nhiên, tươi vui", duration: 4000 },
      {
        text: "Như một làn gió xua tan mọi muộn phiền",
        duration: 4000,
      },
      { text: "Chị biết không...", duration: 3500 },
      { text: "Kể từ ngày 27/08 ấy", duration: 3500 },
      { text: "Mọi thứ với em đều trở nên ý nghĩa", duration: 4000 },
      { text: "Em thích cách chị cười", duration: 3500 },
      { text: "Em thích cách chị nói chuyện", duration: 3500 },
      { text: "Em thích tất cả những gì về chị", duration: 4000 },
      { text: "Mỗi ngày trôi qua", duration: 3500 },
      { text: "Kể từ ngày đầu tiên 27/08", duration: 3500 },
      { text: "Em lại càng thêm yêu quý chị", duration: 4000 },
      { text: "Cảm giác này...", duration: 3500 },
      { text: "Thật khó để diễn tả bằng lời", duration: 4000 },
      { text: "Nhưng em biết chắc một điều", duration: 3500 },
      { text: "Chị là người đặc biệt nhất", duration: 4000 },
      { text: "Trong cuộc đời em", duration: 4000 },
      { text: "Em muốn được ở bên chị", duration: 3500 },
      { text: "Chia sẻ niềm vui", duration: 3500 },
      { text: "Cùng vượt qua khó khăn", duration: 4000 },
      { text: "Em muốn được chăm sóc chị", duration: 3500 },
      { text: "Bảo vệ chị", duration: 3500 },
      { text: "Và luôn làm chị hạnh phúc", duration: 4000 },
      { text: "Em hứa sẽ cố gắng", duration: 3500 },
      { text: "Để trở thành người tốt hơn", duration: 4000 },
      { text: "Xứng đáng với chị", duration: 4000 },
      { text: "Em biết mình còn nhiều thiếu sót", duration: 3500 },
      { text: "Nhưng em sẽ học hỏi", duration: 3500 },
      { text: "Và trưởng thành mỗi ngày", duration: 4000 },
      { text: "Để có thể đồng hành cùng chị", duration: 4000 },
      { text: "Trên con đường phía trước", duration: 4000 },
      { text: "Em không biết tương lai sẽ ra sao", duration: 3500 },
      { text: "Nhưng em biết rằng...", duration: 3500 },
      { text: "Kể từ 27/08 định mệnh ấy", duration: 3500 },
      { text: "Em muốn chị ở trong đó", duration: 5000 },
      { text: "Em yêu chị rất nhiều 💖", duration: 5000 },
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
