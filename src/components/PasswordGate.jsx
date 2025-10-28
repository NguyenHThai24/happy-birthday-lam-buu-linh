import { useState } from "react";

const PasswordGate = ({ onSuccess }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleNumberClick = (number) => {
    if (code.length < 4) {
      setCode(code + number);
    }
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  const handleSubmit = () => {
    if (code === "0111") {
      setError("");
      onSuccess();
    } else {
      setError("Sai mật mã, chị nhập lại nha.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setCode("");
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200 p-4 sm:p-6">
      {/* Subtle background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${1.5 + Math.random() * 1}rem`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main content card */}
      <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 sm:p-8">
        {/* Lock icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-2xl sm:text-3xl">🔒</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
            Nhập mật khẩu
          </h2>
          <p className="text-sm text-gray-600">Để xem lời chúc đặc biệt 💌</p>
        </div>

        {/* Password dots */}
        <div className="mb-6">
          <div
            className={`bg-pink-50 rounded-2xl p-5 ${
              isShaking ? "animate-shake" : ""
            }`}
          >
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                    code.length > index
                      ? "bg-gradient-to-br from-pink-400 to-rose-400 border-pink-400 scale-105"
                      : "bg-white border-pink-200"
                  }`}
                >
                  {code.length > index && (
                    <span className="text-lg sm:text-xl">💖</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Number pad - Compact */}
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number.toString())}
                className="h-12 sm:h-14 rounded-xl bg-pink-50 hover:bg-pink-100 active:bg-pink-200 border border-pink-200 text-gray-800 text-lg sm:text-xl font-medium transition-all duration-150 hover:shadow-sm active:scale-95"
              >
                {number}
              </button>
            ))}
            <button
              onClick={handleDelete}
              className="h-12 sm:h-14 rounded-xl bg-rose-400 hover:bg-rose-500 active:bg-rose-600 text-white text-sm font-medium transition-all duration-150 hover:shadow-sm active:scale-95"
            >
              Xóa
            </button>
            <button
              onClick={() => handleNumberClick("0")}
              className="h-12 sm:h-14 rounded-xl bg-pink-50 hover:bg-pink-100 active:bg-pink-200 border border-pink-200 text-gray-800 text-lg sm:text-xl font-medium transition-all duration-150 hover:shadow-sm active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleSubmit}
              className="h-12 sm:h-14 rounded-xl bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white text-sm font-medium transition-all duration-150 hover:shadow-sm active:scale-95"
            >
              OK
            </button>
          </div>
        </div>

        {/* Hint */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full border border-pink-100">
            <span className="text-sm">💡</span>
            <p className="text-xs sm:text-sm text-pink-800">Gợi ý: "DDMM"</p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 animate-shake">
            <p className="text-xs sm:text-sm text-rose-600 text-center font-medium">
              {error}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PasswordGate;
