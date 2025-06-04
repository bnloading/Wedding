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
    maps_url: "https://2gis.kz/astana/firm/70000001088027861",
    maps_embed:
      "https://widgets.2gis.com/widget?type=firmcard&options=%7B%22position%22%3A%7B%22lat%22%3A50.956267%2C%22lon%22%3A71.348615%2C%22zoom%22%3A16%7D%2C%22firmId%22%3A%2270000001088027861%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22400%22%7D",
    location: "Хан сарайы",
    address: "Республика көшесі, 155, Қосшы, 050400",
    ogImage: "/images/og-image.jpg",
    favicon: "/images/favicon.ico",
    agenda: [
      // {
      //   title: "Неке қию рәсімі",
      //   date: "2025-06-29",
      //   startTime: "16:00",
      //   endTime: "18:00",
      //   location: "Хан сарайы",
      //   address: "Республика көшесі, 155, Қосшы, 050400",
      // },
      {
        title: "Той",
        date: "2025-06-29",
        startTime: "16:00",
        endTime: "23:00",
        location: "Хан сарайы",
        address: "Республика көшесі, 155, Қосшы, 050400",
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
      couplePhoto: "/images/gallery/12.jpeg", // Changed from relative to absolute path
      banner: "/images/12.jpeg", // Changed from relative to absolute path
    },
  },
};

export default config;
