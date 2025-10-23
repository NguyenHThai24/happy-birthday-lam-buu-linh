import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (stage === "fallingLetters") {
      const timer = setTimeout(() => {
        setStage("gallery");
      }, 100000);
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
    setStage("fallingLetters");
  };

  const handleConfessionComplete = (result) => {
    setConfessionResult(result);
    setTimeout(() => {
      setStage("gallery");
    }, 0);
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
              playerVars: { autoplay: 1, loop: 1, playlist: "2-V3-WM-T-Y" },
            }}
            onReady={(e) => {
              setPlayer(e.target);
              e.target.setVolume(80);
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
              },
            }}
            onReady={(e) => {
              e.target.setVolume(80);
            }}
          />
          {showConfession && (
            <ConfessionStage onComplete={handleConfessionComplete} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
