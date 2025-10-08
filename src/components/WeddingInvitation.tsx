import { useEffect, useState } from "react";
import couplePhoto from "@/assets/couple-photo.png";
import fireworksBg from "@/assets/fireworks-bg.jpg";
import { Heart, Music, Calendar, MapPin, StopCircle } from "lucide-react";


const WeddingInvitation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio] = useState(() => new Audio("/audio/wedding.mp3"));

  useEffect(() => {
    audio.loop = true;

    // ✅ Tự động phát nhạc khi load trang
    const tryPlay = async () => {
      try {
        await audio.play();
        console.log("🎵 Nhạc tự bật thành công!");
      } catch (err) {
        console.log("⚠️ Trình duyệt chặn autoplay, chờ user click...");
      }
    };
    tryPlay();

    // ✅ Nếu bị chặn, bật nhạc khi user click lần đầu
    const handleFirstInteraction = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);

    return () => {
      audio.pause();
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const stopMusic = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const flowers = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    emoji:
      i % 8 === 0
        ? "🌸"
        : i % 8 === 1
        ? "🌺"
        : i % 8 === 2
        ? "🌹"
        : i % 8 === 3
        ? "🌼"
        : i % 8 === 4
        ? "🌷"
        : i % 8 === 5
        ? "🌻"
        : i % 8 === 6
        ? "🍃"
        : "🌿",
    delay: i * 0.2,
    duration: 8 + (i % 4) * 2,
    left: (i * 2) % 100,
    size:
      i % 3 === 0
        ? "text-3xl"
        : i % 3 === 1
        ? "text-4xl"
        : "text-5xl",
  }));

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Fireworks Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${fireworksBg})`,
          filter: "brightness(0.7)",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

      {/* Floating Flowers */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className={`fixed ${flower.size} opacity-70 animate-float pointer-events-none`}
          style={{
            left: `${flower.left}%`,
            top: "-50px",
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
          }}
        >
          {flower.emoji}
        </div>
      ))}

      {/* Music Controls */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-3">
        <button
          onClick={toggleMusic}
          className="bg-wedding-red/80 hover:bg-wedding-red text-foreground p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label="Phát/Tạm dừng nhạc"
        >
          <Music className={`w-6 h-6 ${isPlaying ? "animate-pulse" : ""}`} />
        </button>
        <button
          onClick={stopMusic}
          className="bg-muted/70 hover:bg-muted text-foreground p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label="Dừng nhạc"
        >
          <StopCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Decorative Hearts */}
        <div className="absolute top-20 left-20 text-wedding-pink text-6xl opacity-30 animate-ping-slow">
          ❤️
        </div>
        <div className="absolute bottom-20 right-20 text-wedding-gold text-6xl opacity-30 animate-ping-slow">
          💕
        </div>

        {/* Invitation Card */}
        <div className="max-w-4xl w-full bg-gradient-to-br from-rose-50/95 via-pink-50/95 to-amber-50/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in border-4 border-wedding-gold/30">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-wedding-red text-5xl md:text-7xl font-bold mb-4 animate-slide-up">
              Thiệp Mời Đám Cưới
            </h1>
            <div className="flex items-center justify-center gap-2 text-wedding-gold text-xl">
              <Heart className="w-6 h-6 fill-current animate-pulse" />
              <span className="font-script">Trăm năm hạnh phúc</span>
              <Heart className="w-6 h-6 fill-current animate-pulse" />
            </div>
          </div>

          {/* Couple Photo */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative group z-10">
              <div className="absolute -inset-4 bg-gradient-to-r from-wedding-red via-wedding-pink to-wedding-gold rounded-full opacity-75 blur-xl group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-white p-2 rounded-full shadow-2xl">
                <img
                  src={couplePhoto}
                  alt="Hoài Bình & Hữu Nghĩa"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Names */}
          <div className="text-center mb-8">
            <div className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-wedding-pink">Hoài Bình</span>
              <span className="text-wedding-gold mx-4">❤️</span>
              <span className="text-wedding-red">Hữu Nghĩa</span>
            </div>
            <p className="font-serif text-xl text-gray-700 italic">
              Hân hạnh được đón tiếp
            </p>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-wedding-rose/30 to-wedding-pink/20 rounded-2xl p-6 border-2 border-wedding-pink/30">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-6 h-6 text-wedding-red" />
                <h3 className="font-display text-2xl font-semibold text-wedding-red">
                  Thời Gian
                </h3>
              </div>
              <p className="font-serif text-lg text-gray-700">
                <span className="font-semibold">...</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-wedding-rose/30 to-wedding-gold/20 rounded-2xl p-6 border-2 border-wedding-gold/30">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-6 h-6 text-wedding-red" />
                <h3 className="font-display text-2xl font-semibold text-wedding-red">
                  Địa Điểm
                </h3>
              </div>
              <p className="font-serif text-lg text-gray-700">
                <span className="font-semibold">...</span>
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="text-center">
            <p className="font-script text-2xl md:text-3xl text-wedding-red mb-4">
              Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
            </p>
            <div className="flex justify-center gap-2 text-3xl">
              <span className="animate-float">🌸</span>
              <span className="animate-float-slow">💝</span>
              <span className="animate-float">🌸</span>
            </div>
          </div>
        </div>

        {/* Bottom Hearts Animation */}
        <div className="mt-8 flex gap-4 text-4xl">
          <span className="animate-float text-wedding-pink">💕</span>
          <span className="animate-float-slow text-wedding-red">❤️</span>
          <span className="animate-float text-wedding-gold">💛</span>
        </div>
      </div>
    </div>
  );
};

export default WeddingInvitation;
