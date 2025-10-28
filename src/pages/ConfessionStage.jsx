import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfessionStage = ({ onComplete }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [currentLines, setCurrentLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  const letterContainerRef = useRef(null);

  // Memoize confession content
  const confessionContent = useMemo(
    () => [
      "Gửi chị...",
      "Có vài điều em muốn gửi đến chị.",
      "Từ ngày 27/08 - ngày đầu tiên chúng ta trò chuyện,",
      "em đã nhận ra chị là một người rất đặc biệt.",
      "Mỗi lần được nói chuyện cùng chị,",
      "mỗi lần chơi cầu lông cùng nhau,",
      "đều mang đến cho em những cảm xúc thật đẹp.",
      "",
      "Chị luôn mang lại cho em năng lượng tích cực.",
      "Nụ cười, giọng nói của chị",
      "luôn khiến mọi thứ trở nên dịu dàng.",
      "",
      "Nhờ có chị, em học được nhiều điều",
      "về sự trưởng thành, về cách suy nghĩ chín chắn.",
      "Em trân trọng điều đó vô cùng.",
      "",
      "Em biết cuộc sống không phải lúc nào",
      "cũng êm đềm và dễ dàng.",
      "Sẽ có những ngày chị mệt mỏi,",
      "thì em vẫn sẽ ở đây, chia sẽ sự mệt mỏi cùng chị.",
      "",
      "Điều em mong muốn nhất",
      "là được thấy chị luôn hạnh phúc.",
      "Được thấy nụ cười rạng rỡ của chị,",
      "được thấy chị sống thật vui vẻ.",
      "",
      "Chỉ cần được làm một người bạn",
      "đồng hành cùng chị,",
      "với em đó đã là điều quý giá.",
      "",
      "Em chúc chị luôn giữ được",
      "sự lạc quan và nhiệt huyết ấy.",
      "Hãy cứ là chính mình,",
      "như chị vẫn luôn tỏa sáng.",
      "",
      "Cảm ơn chị vì tất cả...",
      "💝",
    ],
    []
  );

  // Tính toán số dòng hiển thị dựa trên kích thước màn hình
  const MAX_VISIBLE_LINES = useMemo(() => {
    if (windowSize.height < 600) return 6;
    if (windowSize.height < 700) return 8;
    if (windowSize.height < 800) return 10;
    if (windowSize.height < 900) return 12;
    return 14;
  }, [windowSize.height]);

  // Tính toán chiều cao lá thư dựa trên kích thước màn hình
  const letterHeight = useMemo(() => {
    if (windowSize.height < 600) return 400;
    if (windowSize.height < 700) return 450;
    if (windowSize.height < 800) return 500;
    if (windowSize.height < 900) return 550;
    return 600;
  }, [windowSize.height]);

  // Tính toán kích thước chữ dựa trên kích thước màn hình
  const fontSize = useMemo(() => {
    if (windowSize.width < 640) return "text-base"; // mobile
    if (windowSize.width < 768) return "text-lg"; // tablet
    return "text-xl"; // desktop
  }, [windowSize.width]);

  // Tính toán padding dựa trên kích thước màn hình
  const padding = useMemo(() => {
    if (windowSize.width < 640) return "p-6";
    if (windowSize.width < 768) return "p-8";
    return "p-12";
  }, [windowSize.width]);

  // Background elements
  const backgroundInk = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 30 + Math.random() * 50,
        rotation: Math.random() * 360,
        duration: 40 + Math.random() * 30,
        delay: Math.random() * 15,
      })),
    []
  );

  // Theo dõi kích thước màn hình
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

  // Password handlers
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "2708") {
      setIsUnlocked(true);
      setError("");
      setTimeout(() => setShowLetter(true), 1000);
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

  // Typewriter effect với từng chữ
  useEffect(() => {
    if (!showLetter || !isTyping) return;

    if (currentLineIndex < confessionContent.length) {
      const currentLine = confessionContent[currentLineIndex];

      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 80);

        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLines((prev) => {
            const newLine = {
              text: currentLine,
              id: currentLineIndex,
              isNew: true,
            };

            const newLines = [...prev, newLine];

            if (newLines.length > MAX_VISIBLE_LINES) {
              return newLines
                .slice(1)
                .map((line) => ({ ...line, isNew: false }));
            }
            return newLines;
          });

          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300);

        return () => clearTimeout(timer);
      }
    } else {
      setIsTyping(false);
    }
  }, [
    showLetter,
    isTyping,
    currentLineIndex,
    currentCharIndex,
    confessionContent,
    MAX_VISIBLE_LINES,
  ]);

  // Password screen (giữ nguyên)
  if (!isUnlocked) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden flex items-center justify-center p-4">
        {/* Background hearts */}
        <div className="absolute inset-0">
          {backgroundInk.slice(0, 6).map((ink) => (
            <motion.div
              key={`ink-${ink.id}`}
              className="absolute text-pink-400/20 pointer-events-none"
              style={{
                left: `${ink.left}%`,
                top: `${ink.top}%`,
                fontSize: `${ink.size}px`,
                transform: `rotate(${ink.rotation}deg)`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.25, 0.1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: ink.duration,
                repeat: Infinity,
                delay: ink.delay,
                ease: "easeInOut",
              }}
            >
              ✎
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-pink-200 p-4 md:p-8 lg:p-12 shadow-2xl max-w-md w-full mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-4xl md:text-6xl text-center mb-4 md:mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✉️
          </motion.div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-center mb-2">
            Nhập mật khẩu
          </h2>
          <p className="text-pink-500 text-center mb-6 md:mb-8 text-xs md:text-sm">
            Để mở lá thư đặc biệt 💌
          </p>

          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4 md:space-y-6"
          >
            {/* Password display */}
            <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-8">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-pink-300 bg-pink-50 flex items-center justify-center text-lg md:text-2xl font-medium text-pink-600"
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
                  className="text-red-500 text-center text-xs md:text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Number pad */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  type="button"
                  onClick={() => handleNumberClick(num.toString())}
                  className="h-12 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 font-medium text-base md:text-xl transition-all shadow-sm"
                  whileTap={{ scale: 0.95 }}
                >
                  {num}
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={handleDelete}
                className="h-12 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium text-xs md:text-sm transition-all shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                Xóa
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleNumberClick("0")}
                className="h-12 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 font-medium text-base md:text-xl transition-all shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                0
              </motion.button>
              <motion.button
                type="submit"
                disabled={password.length !== 4}
                className="h-12 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium text-xs md:text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: password.length === 4 ? 0.95 : 1 }}
              >
                Mở thư
              </motion.button>
            </div>
          </form>

          <p className="text-pink-400 text-center mt-4 md:mt-6 text-xs">
            Gợi ý: Ngày đầu tiên chúng ta nói chuyện 💕
          </p>
        </motion.div>
      </div>
    );
  }

  // Letter content với responsive design
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden flex items-center justify-center p-2 sm:p-4">
      {/* Background ink splashes */}
      <div className="absolute inset-0">
        {backgroundInk.map((ink) => (
          <motion.div
            key={`ink-${ink.id}`}
            className="absolute text-blue-300/15 pointer-events-none"
            style={{
              left: `${ink.left}%`,
              top: `${ink.top}%`,
              fontSize: `${ink.size}px`,
              transform: `rotate(${ink.rotation}deg)`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.15, 0.05],
              rotate: [ink.rotation, ink.rotation + 10, ink.rotation],
            }}
            transition={{
              duration: ink.duration,
              repeat: Infinity,
              delay: ink.delay,
              ease: "easeInOut",
            }}
          >
            ✑
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showLetter && (
          <motion.div
            className="relative z-10 w-full max-w-4xl mx-2 sm:mx-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring" }}
          >
            {/* Paper với chiều cao responsive */}
            <div
              className="relative bg-[#fefefe] border-l-4 border-blue-300 shadow-2xl overflow-hidden"
              style={{ height: `${letterHeight}px` }}
            >
              {/* Hiệu ứng giấy viết thư */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent" />
              <div className="absolute left-8 sm:left-12 md:left-16 top-0 bottom-0 w-0.5 bg-blue-200/30" />

              {/* Các dòng kẻ ngang */}
              <div className="absolute inset-0 opacity-20">
                {Array.from(
                  { length: Math.floor(letterHeight / 32) },
                  (_, i) => (
                    <div
                      key={i}
                      className="w-full h-6 sm:h-8 border-b border-blue-100"
                      style={{ marginTop: `${i * 32}px` }}
                    />
                  )
                )}
              </div>

              {/* Nội dung thư với container responsive */}
              <div
                ref={letterContainerRef}
                className={`relative h-full font-handwriting overflow-hidden ${padding}`}
              >
                {/* Tiêu đề - chỉ hiển thị khi chưa có nhiều dòng */}
                {currentLines.length < 5 && (
                  <motion.div
                    className="text-center mb-4 sm:mb-6 md:mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-900 mb-2 tracking-wide">
                      Thư gửi chị
                    </h1>
                    <div className="w-20 sm:w-24 md:w-32 h-0.5 bg-blue-400 mx-auto opacity-60" />
                  </motion.div>
                )}

                {/* Nội dung chính với hiệu ứng gõ từng chữ */}
                <div
                  className={`space-y-1 text-blue-900 leading-7 sm:leading-8 ${fontSize}`}
                >
                  <AnimatePresence>
                    {currentLines.map((line, index) => (
                      <motion.div
                        key={line.id}
                        className={`${line.text === "" ? "h-3 sm:h-4" : ""} ${
                          line.text.includes("💝")
                            ? "text-center text-xl sm:text-2xl"
                            : ""
                        }`}
                        initial={{
                          opacity: 0,
                          y: line.isNew ? 20 : -20,
                          x: line.isNew ? -10 : 0,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -20,
                          height: 0,
                          transition: { duration: 0.3 },
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        layout
                      >
                        {line.text === "" ? (
                          <br />
                        ) : (
                          <span className="inline-block">{line.text}</span>
                        )}
                      </motion.div>
                    ))}

                    {/* Dòng đang được gõ */}
                    {currentLineIndex < confessionContent.length && (
                      <motion.div
                        className={`text-blue-900 leading-7 sm:leading-8 ${fontSize}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <span className="inline-block">
                          {confessionContent[currentLineIndex].substring(
                            0,
                            currentCharIndex
                          )}
                          <motion.span
                            className="ml-0.5 text-blue-600"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            ▊
                          </motion.span>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Chữ ký - chỉ hiển thị khi đến cuối */}
                {!isTyping && currentLineIndex >= confessionContent.length && (
                  <motion.div
                    className="text-center mt-6 sm:mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="inline-block text-right">
                      <p className="text-blue-800 text-base sm:text-lg mb-1">
                        Với tất cả sự chân thành,
                      </p>
                      <div className="w-32 sm:w-40 md:w-48 h-0.5 bg-blue-400 mb-2 opacity-60" />
                      <p className="text-blue-900 text-xl sm:text-2xl font-bold tracking-wider">
                        Một người bạn
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Dấu mực trang trí */}
              <motion.div
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 text-blue-400/40"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
              >
                💧
              </motion.div>
            </div>

            {/* Nút đóng */}
            {!isTyping && currentLineIndex >= confessionContent.length && (
              <motion.button
                onClick={() => onComplete?.("completed")}
                className="mt-4 sm:mt-6 md:mt-8 mx-auto block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-handwriting text-base sm:text-lg transition-all shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Gấp thư lại
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thêm CSS cho font chữ viết tay */}
      <style jsx>{`
        .font-handwriting {
          font-family: "Comic Sans MS", "Segoe UI", cursive, sans-serif;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ConfessionStage;
