import { Calendar, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import config from "@/config/config";
import { formatEventDate } from "@/lib/formatEventDate";
import { safeBase64 } from "@/lib/base64";

export default function Hero() {
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("guest");

    if (guestParam) {
      try {
        const decodedName = safeBase64.decode(guestParam);
        setGuestName(decodedName);
      } catch (error) {
        console.error("Error decoding guest name:", error);
        setGuestName("");
      }
    }
  }, []);

  const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    function calculateTimeLeft() {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          күн: Math.floor(difference / (1000 * 60 * 60 * 24)),
          сағат: Math.floor((difference / (1000 * 60 * 60)) % 24),
          минут: Math.floor((difference / 1000 / 60) % 60),
          секунд: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    }
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {Object.keys(timeLeft).map((interval) => (
          <motion.div
            key={interval}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
          >
            <span className="text-xl sm:text-2xl font-bold text-rose-600">
              {timeLeft[interval]}
            </span>
            <span className="text-xs text-gray-500 capitalize">{interval}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  const FloatingHearts = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              x: Math.random() * window.innerWidth,
              y: -100,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
            className="absolute"
          >
            <Heart
              className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${
                i % 3 === 0
                  ? "text-rose-400"
                  : i % 3 === 1
                    ? "text-pink-400"
                    : "text-red-400"
              }`}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center relative overflow-hidden bg-gradient-to-b from-rose-50 via-white to-rose-50"
      >
        {/* Animated Background Patterns */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/bg-pattern.png')] opacity-5 animate-fade-in" />
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-100/20 to-pink-100/20" />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-rose-200/20 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-pink-200/20 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />

          {/* Floating Particles */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-rose-300/50 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 relative z-10 w-full max-w-4xl mx-auto"
        >
          {/* Couple's Photo with Gallery */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Main Photo */}
            <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-500/20 group-hover:opacity-75 transition-opacity" />
              <motion.img
                src={config.data.shareImages.couplePhoto}
                alt={`${config.data.groomName} & ${config.data.brideName}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                loading="eager"
                onClick={() =>
                  window.open(config.data.shareImages.couplePhoto, "_blank")
                }
                onError={(e) => {
                  console.error("Error loading image:", e);
                  e.target.src = "../../public/images/gallery/2.jpg";
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-rose-600 text-sm font-medium">
                    Үлкейту
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -inset-2 border-4 border-rose-100/50 rounded-full -z-10"
            />
          </motion.div>

          {/* Save the Date Banner */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mx-auto relative"
          >
            <span className="absolute inset-0 bg-rose-200 blur-md opacity-50" />
            <span className="relative px-6 py-2 text-sm bg-rose-50 text-rose-600 rounded-full border border-rose-200 shadow-sm">
              Маңызды күнді белгілеңіз
            </span>
          </motion.div>

          {/* Names and Message */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 font-arabic text-lg sm:text-xl"
            >
              ﷽
            </motion.p>
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl sm:text-6xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600 leading-relaxed"
            >
              {config.data.groomName}
              <span className="inline-block mx-4">
                <Heart
                  className="w-8 h-8 sm:w-12 sm:h-12 text-rose-400 inline"
                  fill="currentColor"
                />
              </span>
              {config.data.brideName}
            </motion.h2>
          </div>

          {/* Event Details Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl" />
            <div className="relative px-6 py-8 rounded-2xl border border-rose-100">
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-40 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              </div>

              <div className="space-y-6 text-center">
                {/* Date and Time */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center space-x-3"
                  >
                    <Calendar className="w-5 h-5 text-rose-500" />
                    <span className="text-gray-800 font-medium">
                      {formatEventDate(config.data.date, "full")}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-center space-x-3"
                  >
                    <Clock className="w-5 h-5 text-rose-500" />
                    <span className="text-gray-800 font-medium">
                      {config.data.time}
                    </span>
                  </motion.div>
                </div>

                {/* Guest Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-2 py-4"
                >
                  <p className="text-gray-600 font-serif italic">Құрметті</p>
                  <p className="text-gray-700 font-medium">Мырза/Ханым</p>
                  <p className="text-2xl text-rose-600 font-semibold">
                    {guestName ? guestName : "Нурбек Маратұлы"} "}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <CountdownTimer targetDate={config.data.date} />

          <FloatingHearts />
        </motion.div>
      </section>
    </>
  );
}
