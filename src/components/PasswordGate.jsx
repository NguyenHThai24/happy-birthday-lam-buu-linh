import { useState } from "react";

const PasswordGate = ({ onSuccess }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = () => {
    if (code === "0111") {
      setError("");
      onSuccess();
    } else {
      setError("Sai mật mã, chị nhập lại nha. Xem gợi ý bên dưới!");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setCode("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 overflow-hidden">
      {/* Animated floating hearts */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-400 opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
            fontSize: `${20 + Math.random() * 30}px`,
          }}
        >
          {["💕", "💖", "💗", "💝", "🌸", "🌺"][Math.floor(Math.random() * 6)]}
        </div>
      ))}

      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-72 h-72 bg-rose-400/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-rose-300/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div
        className={`relative bg-white/90 backdrop-blur-lg p-12 rounded-[2rem] shadow-2xl text-center max-w-md w-full mx-4 border-4 border-pink-300/50 ${
          isShaking ? "animate-shake" : ""
        }`}
        style={{
          animation: isShaking ? "shake 0.5s" : "none",
          boxShadow:
            "0 25px 50px -12px rgba(236, 72, 153, 0.25), 0 0 0 1px rgba(236, 72, 153, 0.1)",
        }}
      >
        {/* Sparkles decoration */}
        <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
          ✨
        </div>
        <div
          className="absolute -top-4 -right-4 text-4xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </div>

        {/* Lock icon with gradient */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-pink-400/30 rounded-full blur-xl animate-pulse"></div>
        </div>

        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
          Mở Khóa Bất Ngờ
        </h2>
        <p className="text-gray-600 mb-8 text-base font-medium">
          Nhập ngày tháng sinh nhật của chị nhé 🎂
        </p>

        {/* Input container */}
        <div className="relative mb-8">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={4}
            className="w-full px-6 py-5 text-gray-800 rounded-2xl text-center text-3xl tracking-[1.2em] font-bold border-4 border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-6 focus:ring-pink-200/60 transition-all bg-gradient-to-br from-pink-50 via-white to-rose-50 shadow-lg"
            placeholder="••••"
            autoFocus
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-1">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
            <div
              className="w-2 h-2 bg-rose-400 rounded-full animate-ping"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-500 rounded-full animate-ping"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-8 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white rounded-2xl text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300 active:scale-95"
        >
          <span className="flex items-center justify-center gap-3">
            Xác nhận
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border-3 border-red-300 rounded-2xl animate-bounce shadow-lg">
            <p className="text-red-600 font-bold text-base flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          </div>
        )}

        {/* Hint with heart icon */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="text-pink-400">💝</span>
          <p className="text-sm text-gray-500 italic font-medium">
            Gợi ý: 4 chữ số (DDMM)
          </p>
          <span className="text-pink-400">💝</span>
        </div>

        {/* Bottom sparkles */}
        <div
          className="absolute -bottom-4 left-1/4 text-3xl animate-bounce"
          style={{ animationDelay: "0.3s" }}
        >
          🌸
        </div>
        <div
          className="absolute -bottom-4 right-1/4 text-3xl animate-bounce"
          style={{ animationDelay: "0.7s" }}
        >
          🌸
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.3;
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PasswordGate;
