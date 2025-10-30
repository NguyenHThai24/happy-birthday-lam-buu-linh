import { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import FallingLetters from "./pages/FallingLetters";
import GalleryLayout from "./pages/GalleryLayout";
import ConfessionStage from "./pages/ConfessionStage";
import PasswordGate from "./components/PasswordGate";

function App() {
  const [stage, setStage] = useState("password");
  const [player, setPlayer] = useState(null);
  const [confessionResult, setConfessionResult] = useState(null);
  const [showConfession, setShowConfession] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const mainPlayerRef = useRef(null);
  const confessionPlayerRef = useRef(null);

  useEffect(() => {
    if (stage === "fallingLetters") {
      const timer = setTimeout(() => {
        setStage("gallery");
      }, 85000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "confession") {
      setShowConfession(false);
      const timer = setTimeout(() => {
        setShowConfession(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handlePasswordSuccess = () => {
    setAudioEnabled(true); // ✅ Bật âm thanh khi nhập mật khẩu thành công
    setStage("fallingLetters");

    // Kích hoạt player nếu đã ready
    if (mainPlayerRef.current) {
      mainPlayerRef.current.playVideo();
      mainPlayerRef.current.setVolume(80);
    }
  };

  const handleConfessionComplete = (result) => {
    setConfessionResult(result);
    setTimeout(() => {
      setStage("gallery");
    }, 0);
  };

  // Hàm xử lý khi YouTube main player ready
  const handleMainPlayerReady = (event) => {
    setPlayer(event.target);
    mainPlayerRef.current = event.target;

    // Nếu đã có tương tác (qua password), bật âm thanh ngay
    if (audioEnabled) {
      event.target.playVideo();
      event.target.setVolume(80);
    } else {
      // Trên iOS, bắt đầu với mute và chờ tương tác
      event.target.mute();
      event.target.playVideo();
    }
  };

  // Hàm xử lý khi YouTube confession player ready
  const handleConfessionPlayerReady = (event) => {
    confessionPlayerRef.current = event.target;

    // Luôn bật âm thanh cho confession vì đã có tương tác trước đó
    if (audioEnabled) {
      event.target.setVolume(80);
      event.target.playVideo();
    }
  };

  return (
    <div className="w-screen h-screen relative bg-black">
      {stage === "password" && (
        <PasswordGate onSuccess={handlePasswordSuccess} />
      )}

      {stage !== "password" && stage !== "confession" && (
        <>
          <YouTube
            videoId="2-V3-WM-T-Y"
            opts={{
              height: "0",
              width: "0",
              playerVars: {
                autoplay: 1,
                loop: 1,
                playlist: "2-V3-WM-T-Y",
                // Quan trọng: bắt đầu với mute để iOS cho phép autoplay
                mute: audioEnabled ? 0 : 1,
              },
            }}
            onReady={handleMainPlayerReady}
            onPlay={() => {
              // Khi video bắt đầu play, unmute nếu đã có tương tác
              if (audioEnabled && mainPlayerRef.current) {
                mainPlayerRef.current.unMute();
                mainPlayerRef.current.setVolume(80);
              }
            }}
          />

          {stage === "fallingLetters" && <FallingLetters />}
          {stage === "gallery" && (
            <GalleryLayout onConfession={() => setStage("confession")} />
          )}
        </>
      )}

      {stage === "confession" && (
        <>
          <YouTube
            videoId="IOe0tNoUGv8"
            opts={{
              height: "0",
              width: "0",
              playerVars: {
                autoplay: 1,
                loop: 1,
                playlist: "IOe0tNoUGv8",
                mute: 0, // Không cần mute vì đã có tương tác
              },
            }}
            onReady={handleConfessionPlayerReady}
          />
          {showConfession && (
            <ConfessionStage onComplete={handleConfessionComplete} />
          )}
        </>
      )}

      {/* Hiển thị thông báo nếu cần kích hoạt âm thanh thủ công */}
      {stage !== "password" && !audioEnabled && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="text-center text-white p-6">
            <p className="text-xl mb-4">🎵 Bấm để bật nhạc 🎵</p>
            <button
              onClick={() => setAudioEnabled(true)}
              className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-full text-lg font-bold"
            >
              Bật Nhạc
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
