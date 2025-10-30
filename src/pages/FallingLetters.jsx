// FallingLetters.jsx - Single Line Version
import { useState } from "react";
import BackgroundLetters from "../components/BackgroundLetters";
import Countdown from "../components/Countdown";
import Firework from "../components/Firework";
import WordAnimation from "../components/WordAnimation";
import EmojiRain from "../components/EmojiRain";

const FallingLetters = ({ onStartMusic }) => {
  const [stage, setStage] = useState("countdown");

  const centerY = window.innerHeight / 6;
  const isBeforeFirework = stage === "countdown";

  const handleCountdownComplete = () => {
    onStartMusic?.();
    setStage("firework");
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden text-white">
      {/* Background */}
      {isBeforeFirework ? <BackgroundLetters /> : <EmojiRain />}

      {/* Stage logic */}
      {stage === "countdown" && (
        <Countdown onComplete={handleCountdownComplete} />
      )}

      {stage === "firework" && (
        <Firework onComplete={() => setStage("birthday")} />
      )}

      {/* Birthday wish */}
      {stage === "birthday" && (
        <WordAnimation
          letters={"HAPPY BIRTHDAY".split("")}
          y={centerY}
          stayTime={4000}
          onComplete={() => setStage("name")}
        />
      )}

      {/* Name reveal */}
      {stage === "name" && (
        <WordAnimation
          letters={"LÂM BỬU LINH".split("")}
          y={centerY}
          stayTime={4000}
          onComplete={() => setStage("date")}
        />
      )}
      {/* Date */}
      {stage === "date" && (
        <WordAnimation
          letters={"01-11-2025".split("")}
          y={centerY}
          stayTime={5000}
          onComplete={() => setStage("age")}
        />
      )}

      {/* Age celebration */}
      {stage === "age" && (
        <WordAnimation
          letters={"CHÚC MỪNG TUỔI MỚI".split("")}
          y={centerY}
          stayTime={3000}
          onComplete={() => setStage("wish1")}
        />
      )}

      {/* Wishes - Lời chúc 1 */}
      {stage === "wish1" && (
        <WordAnimation
          letters={"CHÚC CHỊ LUÔN XINH ĐẸP".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish2")}
        />
      )}

      {stage === "wish2" && (
        <WordAnimation
          letters={"LUÔN VUI VẺ TƯƠI TẮN".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish3")}
        />
      )}

      {stage === "wish3" && (
        <WordAnimation
          letters={"THÀNH CÔNG RỰC RỠ".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish4")}
        />
      )}

      {stage === "wish4" && (
        <WordAnimation
          letters={"SỨC KHỎE DỒI DÀO".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish5")}
        />
      )}

      {stage === "wish5" && (
        <WordAnimation
          letters={"MỌI ĐIỀU ĐỀU THUẬN LỢI".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish6")}
        />
      )}

      {/* Thêm các lời chúc mới */}
      {stage === "wish6" && (
        <WordAnimation
          letters={"GẶP NHIỀU MAY MẮN".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish7")}
        />
      )}

      {stage === "wish7" && (
        <WordAnimation
          letters={"HẠNH PHÚC TRÀN ĐẦY".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish8")}
        />
      )}

      {stage === "wish8" && (
        <WordAnimation
          letters={"THỰC HIỆN ĐƯỢC ƯỚC MƠ".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish9")}
        />
      )}

      {stage === "wish9" && (
        <WordAnimation
          letters={"LUÔN TỎA SÁNG".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish11")}
        />
      )}

      {stage === "wish11" && (
        <WordAnimation
          letters={"BÌNH AN MỖI NGÀY".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish12")}
        />
      )}

      {stage === "wish12" && (
        <WordAnimation
          letters={"THÀNH CÔNG VƯỢT BẬC".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish13")}
        />
      )}

      {stage === "wish13" && (
        <WordAnimation
          letters={"LUÔN MẠNH MẼ".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("wish14")}
        />
      )}

      {stage === "wish14" && (
        <WordAnimation
          letters={"TỰ TIN TỎA SÁNG".split("")}
          y={centerY}
          stayTime={3500}
          onComplete={() => setStage("love")}
        />
      )}

      {/* Love message */}
      {stage === "love" && (
        <WordAnimation
          letters={"YÊU CHỊ RẤT NHIỀU".split("")}
          y={centerY}
          stayTime={4000}
        />
      )}
    </div>
  );
};

export default FallingLetters;
