// Nanti convert ke Bahasa Indonesia
const config = {
  data: {
    title: "Мархулан & Асемгүл той салтанаты",
    description:
      "Біз үйленеміз және сізді осы қуанышты сәтті бізбен бірге тойлауға шақырамыз.",
    groomName: "Мархулан",
    brideName: "Асемгүл",
    parentGroom: "М.Абзал & Л.Назигүл",
    parentBride: "И.Мажиг & Р.Манекей",
    date: "2025-07-02",
    time: "18:00",
    location: "Ақтілек тойханасы",
    address: "Баян Өлгий аймағы, Цэнгэл сумыны",
    maps_url:
      "https://maps.google.com/?q=Баян+Өлгий+аймағы+Цэнгэл+сумыны+Ақтілек+тойханасы",
    maps_embed: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22781.706170939775!2d89.13819590227979!3d48.93748030772034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5c2a1ab75265fa91%3A0x64afc3a058b4c8a3!2sTsengel%2C+Mongolia!5e0!3m2!1sen!2skz!4v1566305600000`,
    ogImage: "/images/og-image.jpg",
    favicon: "/images/favicon.ico",
    agenda: [
      {
        title: "Той",
        date: "2025-07-02",
        startTime: "18:00",
        endTime: "23:00",
        location: "Ақтілек тойханасы",
        address: "Цэнгэл сумыны",
      },
    ],
    audio: {
      src: "/audio/toi.mp3",
      title: "Көңілді әуен",
      autoplay: true,
      loop: true,
    },
    banks: [
      {
        bank: "Қазақстан Халық Банкі",
        accountNumber: "KZ1234567890",
        accountName: "Мархулан & Асемгүл",
      },
      {
        bank: "Kaspi Bank",
        accountNumber: "KZ0987654321",
        accountName: "Мархулан & Асемгүл",
      },
    ],

    // Web sharing images
    shareImages: {
      ogImage: "/images/og-share.jpg",
      thumbnail: "/images/thumbnail.jpg",
      couplePhoto: "/images/Magu/1.jpg", // Changed from relative to absolute path
      banner: "/images/12.jpeg", // Changed from relative to absolute path
    },
  },
};

export default config;
