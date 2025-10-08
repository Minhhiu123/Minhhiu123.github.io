import { useEffect, useState } from "react";
import couplePhoto from "@/assets/couple-photo.png";
import fireworksBg from "@/assets/fireworks-bg.jpg";
import { Heart, Music, Calendar, MapPin } from "lucide-react";

const WeddingInvitation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(
    () => new Audio("https://cdn.pixabay.com/audio/2024/03/07/audio_27e04a3c93.mp3")
  );

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const flowers = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: i % 4 === 0 ? "🌸" : i % 4 === 1 ? "🌺" : i % 4 === 2 ? "🌹" : "🌼",
    delay: i * 0.3,
    duration: 6 + (i % 3) * 2,
    left: (i * 5) % 100,
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
          className="fixed text-4xl opacity-70 animate-float pointer-events-none"
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

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className="fixed top-8 right-8 z-50 bg-wedding-red/80 hover:bg-wedding-red text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Toggle music"
      >
        <Music className={`w-6 h-6 ${isPlaying ? "animate-pulse" : ""}`} />
      </button>

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
        <div className="max-w-4xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
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

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent flex-1" />
            <span className="text-3xl">🌹</span>
            <div className="h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent flex-1" />
          </div>

          {/* Couple Photo */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
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

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent flex-1" />
            <span className="text-3xl">💐</span>
            <div className="h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent flex-1" />
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
                <span className="font-semibold">Chủ Nhật, 15 Tháng 12, 2024</span>
                <br />
                Lúc 10:00 sáng
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
                <span className="font-semibold">Trung Tâm Tiệc Cưới</span>
                <br />
                123 Đường Hạnh Phúc, TP. HCM
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

          {/* Footer Decorations */}
          <div className="mt-8 flex justify-center gap-3 text-2xl">
            {["🎊", "🎉", "✨", "🎊", "🎉"].map((emoji, i) => (
              <span
                key={i}
                className="animate-sparkle"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </span>
            ))}
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
