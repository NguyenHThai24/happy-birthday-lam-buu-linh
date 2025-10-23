// src/hooks/useFullscreenOrientation.js
export function useFullscreenOrientation() {
  const enterFullscreenAndLock = async (orientation = "landscape") => {
    const elem = document.documentElement;

    // Vào fullscreen
    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      await elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      await elem.msRequestFullscreen();
    }

    // Khóa orientation
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock(orientation);
      } catch (err) {
        console.log("⚠️ Không thể khóa orientation:", err);
      }
    }
  };

  const lockPortrait = async () => {
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock("portrait");
      } catch (err) {
        console.log("⚠️ Không thể khóa portrait:", err);
      }
    }
  };

  return { enterFullscreenAndLock, lockPortrait };
}
