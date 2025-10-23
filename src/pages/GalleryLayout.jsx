import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import img72 from "../assets/images/72.jpg";

const bgImage = img72;

const images = import.meta.glob("../assets/images/*.jpg", { eager: true });
const imageList = Object.values(images).map((module) => module.default);

const messages = {
  0: "Chúc mừng sinh nhật chị! Chúc chị tuổi mới thật nhiều niềm vui và hạnh phúc 🎉",
  1: "Sinh nhật vui vẻ! Mong chị luôn rạng rỡ và xinh đẹp như hoa 🌸",
  2: "Chúc chị tuổi mới sức khỏe dồi dào, thành công rực rỡ 💪",
  3: "Happy Birthday! Chúc chị một ngày thật đặc biệt và ý nghĩa ✨",
  4: "Chúc mừng sinh nhật! Mong điều tốt đẹp nhất sẽ đến với chị 🎂",
  5: "Sinh nhật an lành! Chúc chị luôn tỏa sáng như ánh mặt trời 🌟",
  6: "Chúc chị tuổi mới gặp nhiều may mắn và thành công 🍀",
  7: "Happy Birthday! Chúc chị mãi xinh đẹp và trẻ trung 👑",
  8: "Chúc mừng sinh nhật! Mong chị luôn hạnh phúc và bình an 💖",
  9: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều niềm vui 🎊",
  10: "Chúc chị sinh nhật tràn ngập yêu thương và tiếng cười 😊",
  11: "Happy Birthday! Chúc chị một năm mới thật nhiều thành công 🎯",
  12: "Chúc mừng sinh nhật! Mong chị luôn khỏe mạnh và hạnh phúc 💕",
  13: "Sinh nhật an lành! Chúc chị tuổi mới thật nhiều điều tốt đẹp 🌈",
  14: "Chúc chị sinh nhật vui vẻ, mãi xinh đẹp và thành công 🌺",
  15: "Happy Birthday! Chúc chị một ngày thật tuyệt vời 🎁",
  16: "Chúc mừng sinh nhật! Mong chị luôn gặp nhiều may mắn ✨",
  17: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều hạnh phúc 💫",
  18: "Chúc chị sinh nhật an lành, sức khỏe dồi dào 🏆",
  19: "Happy Birthday! Chúc chị luôn tỏa sáng và thành công ⭐",
  20: "Chúc mừng sinh nhật! Mong chị mãi mãi hạnh phúc 🎂",
  21: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều niềm vui 🎉",
  22: "Chúc chị sinh nhật tràn ngập yêu thương và hạnh phúc 💝",
  23: "Happy Birthday! Chúc chị một năm mới thật ý nghĩa 🌟",
  24: "Chúc mừng sinh nhật! Mong chị luôn thành công và hạnh phúc 💕",
  25: "Sinh nhật an lành! Chúc chị tuổi mới thật nhiều điều tốt 🍀",
  26: "Chúc chị sinh nhật vui vẻ, mãi xinh đẹp và trẻ trung 👑",
  27: "Happy Birthday! Chúc chị một ngày thật đặc biệt ✨",
  28: "Chúc mừng sinh nhật! Mong chị luôn gặp nhiều may mắn 🎊",
  29: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều hạnh phúc 💖",
  30: "Chúc chị sinh nhật an lành, sức khỏe và thành công 💪",
  31: "Happy Birthday! Chúc chị luôn tỏa sáng như kim cương 💎",
  32: "Chúc mừng sinh nhật! Mong chị mãi mãi hạnh phúc 🎂",
  33: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều niềm vui 🌸",
  34: "Chúc chị sinh nhật tràn ngập yêu thương và tiếng cười 😄",
  35: "Happy Birthday! Chúc chị một năm mới thật thành công 🎯",
  36: "Chúc mừng sinh nhật! Mong chị luôn khỏe mạnh và vui vẻ 💕",
  37: "Sinh nhật an lành! Chúc chị tuổi mới thật nhiều điều tốt 🌈",
  38: "Chúc chị sinh nhật vui vẻ, mãi xinh đẹp và thành công 🌺",
  39: "Happy Birthday! Chúc chị một ngày thật tuyệt vời 🎁",
  40: "Chúc mừng sinh nhật! Mong chị luôn gặp nhiều may mắn ✨",
  41: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều hạnh phúc 💫",
  42: "Chúc chị sinh nhật an lành, sức khỏe dồi dào 🏆",
  43: "Happy Birthday! Chúc chị luôn tỏa sáng và thành công ⭐",
  44: "Chúc mừng sinh nhật! Mong chị mãi mãi hạnh phúc 🎂",
  45: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều niềm vui 🎉",
  46: "Chúc chị sinh nhật tràn ngập yêu thương và hạnh phúc 💝",
  47: "Happy Birthday! Chúc chị một năm mới thật ý nghĩa 🌟",
  48: "Chúc mừng sinh nhật! Mong chị luôn thành công và hạnh phúc 💕",
  49: "Sinh nhật an lành! Chúc chị tuổi mới thật nhiều điều tốt 🍀",
  50: "Chúc chị sinh nhật vui vẻ, mãi xinh đẹp và trẻ trung 👑",
  51: "Happy Birthday! Chúc chị một ngày thật đặc biệt ✨",
  52: "Chúc mừng sinh nhật! Mong chị luôn gặp nhiều may mắn 🎊",
  53: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều hạnh phúc 💖",
  54: "Chúc chị sinh nhật an lành, sức khỏe và thành công 💪",
  55: "Happy Birthday! Chúc chị luôn tỏa sáng như kim cương 💎",
  56: "Chúc mừng sinh nhật! Mong chị mãi mãi hạnh phúc 🎂",
  57: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều niềm vui 🌸",
  58: "Chúc chị sinh nhật tràn ngập yêu thương và tiếng cười 😄",
  59: "Happy Birthday! Chúc chị một năm mới thật thành công 🎯",
  60: "Chúc mừng sinh nhật! Mong chị luôn khỏe mạnh và vui vẻ 💕",
  61: "Sinh nhật an lành! Chúc chị tuổi mới thật nhiều điều tốt 🌈",
  62: "Chúc chị sinh nhật vui vẻ, mãi xinh đẹp và thành công 🌺",
  63: "Happy Birthday! Chúc chị một ngày thật tuyệt vời 🎁",
  64: "Chúc mừng sinh nhật! Mong chị luôn gặp nhiều may mắn ✨",
  65: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều hạnh phúc 💫",
  66: "Chúc chị sinh nhật an lành, sức khỏe dồi dào 🏆",
  67: "Happy Birthday! Chúc chị luôn tỏa sáng và thành công ⭐",
  68: "Chúc mừng sinh nhật! Mong chị mãi mãi hạnh phúc 🎂",
  69: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều niềm vui 🎉",
  70: "Chúc chị sinh nhật tràn ngập yêu thương và hạnh phúc 💝",
  71: "Happy Birthday! Chúc chị một năm mới thật ý nghĩa 🌟",
  72: "Chúc mừng sinh nhật! Mong chị luôn thành công và hạnh phúc 💕",
  73: "Sinh nhật an lành! Chúc chị tuổi mới thật nhiều điều tốt 🍀",
  74: "Chúc chị sinh nhật vui vẻ, mãi xinh đẹp và trẻ trung 👑",
  75: "Happy Birthday! Chúc chị một ngày thật đặc biệt ✨",
  76: "Chúc mừng sinh nhật! Mong chị luôn gặp nhiều may mắn 🎊",
  77: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều hạnh phúc 💖",
  78: "Chúc chị sinh nhật an lành, sức khỏe và thành công 💪",
  79: "Happy Birthday! Chúc chị luôn tỏa sáng như kim cương 💎",
  80: "Chúc mừng sinh nhật! Mong chị mãi mãi hạnh phúc 🎂",
  81: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều niềm vui 🌸",
  82: "Chúc chị sinh nhật tràn ngập yêu thương và tiếng cười 😄",
  83: "Happy Birthday! Chúc chị một năm mới thật thành công 🎯",
  84: "Chúc mừng sinh nhật! Mong chị luôn khỏe mạnh và vui vẻ 💕",
  85: "Sinh nhật an lành! Chúc chị tuổi mới thật nhiều điều tốt 🌈",
  86: "Chúc chị sinh nhật vui vẻ, mãi xinh đẹp và thành công 🌺",
  87: "Happy Birthday! Chúc chị một ngày thật tuyệt vời 🎁",
  88: "Chúc mừng sinh nhật! Mong chị luôn gặp nhiều may mắn ✨",
  89: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều hạnh phúc 💫",
  90: "Chúc chị sinh nhật an lành, sức khỏe dồi dào 🏆",
  91: "Happy Birthday! Chúc chị luôn tỏa sáng và thành công ⭐",
  92: "Chúc mừng sinh nhật! Mong chị mãi mãi hạnh phúc 🎂",
  93: "Sinh nhật vui vẻ! Chúc chị tuổi mới thật nhiều niềm vui 🎉",
  94: "Chúc chị sinh nhật tràn ngập yêu thương và hạnh phúc 💝",
  95: "Happy Birthday! Chúc chị một năm mới thật ý nghĩa 🌟",
  96: "Chúc mừng sinh nhật! Mong chị luôn thành công và hạnh phúc 💕",
  97: "Sinh nhật an lành! Chúc chị tuổi mới thật nhiều điều tốt 🍀",
  98: "Chúc chị sinh nhật vui vẻ, mãi xinh đẹp và trẻ trung 👑",
  99: "Happy Birthday! Chúc chị một ngày thật đặc biệt và ý nghĩa nhất ✨",
  100: "Chúc mừng sinh nhật chị! Mong chị luôn hạnh phúc và thành công trong cuộc sống 🎂💖",
  101: "Chúc chị sinh nhật thật nhiều ý nghĩa, tuổi mới thêm xinh đẹp và tỏa sáng 💫",
  102: "Happy Birthday! Chúc chị một ngày sinh nhật ngập tràn hạnh phúc và tiếng cười 🎈",
  103: "Chúc mừng sinh nhật chị! Mong chị luôn giữ được nét duyên dáng và sự tươi trẻ 🌷",
  104: "Sinh nhật vui vẻ! Chúc chị tuổi mới gặt hái nhiều thành công trong sự nghiệp 🏅",
  105: "Chúc chị sinh nhật an lành, mãi là người phụ nữ tuyệt vời và đáng yêu 💐",
  106: "Happy Birthday! Chúc chị một năm mới với thật nhiều trải nghiệm thú vị 🌍",
  107: "Chúc mừng sinh nhật! Mong chị luôn được yêu thương và trân trọng nhất 🥰",
  108: "Sinh nhật vui vẻ chị nhé! Chúc chị tuổi mới thêm nhiều niềm vui mới 🎠",
  109: "Chúc chị sinh nhật hạnh phúc, luôn giữ được nụ cười rạng rỡ trên môi 😊",
  110: "Happy Birthday! Chúc chị một ngày thật đặc biệt bên gia đình và bạn bè 🎪",
};

const GalleryLayout = ({ onConfession }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Memoize grid patterns để không tính toán lại
  const gridPatterns = useMemo(() => {
    const patterns = [
      { col: "col-span-2 md:col-span-4", row: "row-span-2" },
      { col: "col-span-2 md:col-span-2", row: "row-span-1" },
      { col: "col-span-2 md:col-span-3", row: "row-span-2" },
      { col: "col-span-2 md:col-span-3", row: "row-span-1" },
      { col: "col-span-2 md:col-span-2", row: "row-span-2" },
      { col: "col-span-4 md:col-span-5", row: "row-span-2" },
    ];
    return imageList.map((_, i) => patterns[i % patterns.length]);
  }, []);

  return (
    <div className="w-screen h-screen relative bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Simplified background - chỉ gradient, bỏ ảnh nền */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-pink-100/50 via-rose-100/50 to-purple-100/50" />

      {/* Giảm số lượng floating hearts từ 15 xuống 8 */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/30 text-3xl"
            style={{
              left: `${i * 12.5 + 5}%`,
              top: `${(i % 4) * 25 + 10}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          >
            {["💕", "💖"][i % 2]}
          </motion.div>
        ))}
      </div>

      {/* Simplified header */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-lg shadow-lg border-b border-pink-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-center">
            💝 Kỷ Niệm Đáng Nhớ 💝
          </h1>
          <p className="text-gray-600 text-center mt-1 text-sm md:text-base">
            Hover để xem lời nhắn ✨
          </p>
        </div>
      </motion.div>

      {/* Modern Grid - Simplified animations */}
      <div className="absolute inset-0 z-10 overflow-y-auto pt-28 pb-20 px-3">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-3 auto-rows-[100px] md:auto-rows-[150px]">
            {imageList.map((img, i) => {
              const span = gridPatterns[i];
              const isHovered = hoveredIndex === i;

              return (
                <motion.div
                  key={i}
                  className={`relative group ${span.col} ${span.row}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.01, duration: 0.4 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    {/* Image with lazy loading hint */}
                    <img
                      src={img}
                      alt={`${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Simplified overlay - chỉ hiện khi hover */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-pink-500/95 via-rose-500/95 to-purple-500/95 flex items-center justify-center p-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-white/95 rounded-xl p-2 md:p-3 shadow-xl max-w-full">
                          <p className="text-[0.9rem] sm:text-xs md:text-sm font-semibold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text leading-snug text-center">
                            {messages[i]}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Number badge - simplified */}
                    <div className="absolute top-2 right-2 bg-white/90 text-pink-600 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      {i + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simplified button */}
      {onConfession && (
        <motion.button
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-6 py-3 rounded-full shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConfession}
        >
          💌 Gửi lá thư
        </motion.button>
      )}
    </div>
  );
};

export default GalleryLayout;
