// Nanti convert ke Bahasa Indonesia
const config = {
  data: {
    title: "Жандос & Айнагүл той салтанаты",
    description:
      "Біз үйленеміз және сізді осы қуанышты сәтті бізбен бірге тойлауға шақырамыз.",
    groomName: "Жандос",
    brideName: "Айнагүл",
    parentGroom: "Күйеу жігіттің әкесі & Күйеу жігіттің анасы",
    parentBride: "Қалыңдықтың әкесі & Қалыңдықтың анасы",
    date: "2025-06-29", // Changed to June 29
    maps_url: "https://maps.app.goo.gl/dkKFTNR6PcJGg6Mt8",
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2501.5972040213146!2d71.35835867692391!3d51.17927583481283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585a605525605%3A0x4dff4a1973310b80!2sAkim%20Kosshi!5e0!3m2!1sen!2skz!4v1709715238040!5m2!1sen!2skz",
    time: "16:00",
    location: "Хан сарайы",
    address: "Улица Республики, 155, Қосшы",
    ogImage: "/images/og-image.jpg",
    favicon: "/images/favicon.ico",
    agenda: [
      {
        title: "Неке қию рәсімі",
        date: "2025-06-29",
        startTime: "16:00",
        endTime: "17:30",
        location: "Хан сарайы",
        address: "Улица Республикасы, 155, Қосшы",
      },
      {
        title: "Той",
        date: "2025-06-29",
        startTime: "16:00",
        endTime: "17:30",
        location: "Хан сарайы",
        address: "Улица Республикасы, 155, Қосшы",
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
        accountName: "Жандос & Айнагүл",
      },
      {
        bank: "Kaspi Bank",
        accountNumber: "KZ0987654321",
        accountName: "Жандос & Айнагүл",
      },
    ],

    // Web sharing images
    shareImages: {
      ogImage: "/images/og-share.jpg",
      thumbnail: "/images/thumbnail.jpg",
      couplePhoto: "/images/gallery/2.jpg", // Changed from relative to absolute path
      banner: "/images/2.jpg", // Changed from relative to absolute path
    },
  },
};

export default config;
