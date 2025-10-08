import React, { useEffect, useState } from "react";
import { Heart, Pause, Play } from "lucide-react";
import couplePhoto from "@/assets/couple-photo.png";
import fireworksBg from "@/assets/fireworks-bg.jpg";

const WeddingInvitation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio] = useState(() => new Audio("/audio/wedding.mp3"));

  useEffect(() => {
    audio.loop = true;
    audio.muted = true; // ✅ Bắt đầu ở chế độ im lặng

    const tryPlay = async () => {
      try {
        await audio.play();
        console.log("🎵 Phát nhạc im lặng thành công");

        // ✅ Sau 1 giây thì bật âm thanh trở lại
        setTimeout(() => {
          audio.muted = false;
          console.log("🔊 Bật âm thanh");
        }, 1000);
      } catch (err) {
        console.log("⚠️ Trình duyệt chặn autoplay, sẽ bật khi user click");
      }
    };

    tryPlay();

    // ✅ Nếu vẫn bị chặn, bật khi user click lần đầu
    const handleFirstInteraction = () => {
      audio.muted = false;
      audio.play().catch(() => {});
      document.removeEventListener("click", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);

    return () => {
      audio.pause();
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, [audio]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-center"
      style={{
        backgroundImage: `url(${fireworksBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Nội dung */}
      <div className="relative z-10 text-white p-4">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">
          💍 Lễ Cưới Minh & Hồng 💖
        </h1>
        <img
          src={couplePhoto}
          alt="Couple"
          className="w-64 h-64 object-cover rounded-full mx-auto border-4 border-pink-300 shadow-lg"
        />
        <p className="mt-4 text-lg">Trân trọng kính mời bạn đến dự ngày vui của chúng tôi</p>
        <p className="text-2xl mt-2 font-semibold text-pink-200">20.10.2025</p>
      </div>

      {/* Nút bật/tắt nhạc */}
      <button
        onClick={toggleAudio}
        className="absolute bottom-8 right-8 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition"
        title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
      </button>

      {/* Icon trái tim bay */}
      <Heart
        className="absolute top-10 left-1/2 -translate-x-1/2 text-pink-400 animate-bounce"
        size={48}
      />
    </div>
  );
};

export default WeddingInvitation;
