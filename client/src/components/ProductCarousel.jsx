import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import "swiper/css";
import "../styles/productcarousel.css";

const categories = [
  { title: "Nuevos ingresos", image: "https://placehold.co/300" },
  { title: "Más vendidos", image: "https://placehold.co/300" },
  { title: "Ofertas", image: "https://placehold.co/300" },
  { title: "Urbanas", image: "https://placehold.co/300" },
  { title: "Deportivas", image: "https://placehold.co/300" },
];

function ProductCarousel() {
  return (
    <div className="carousel">
      <h2 className="carousel-title">🔥 Destacados</h2>

      <Swiper
  modules={[Autoplay, Navigation]}
  spaceBetween={16}
  slidesPerView={1}   
  autoplay={{ delay: 2500 }}
  navigation
  loop={true}
  breakpoints={{
    480: { slidesPerView: 2, spaceBetween: 16 },   
    768: { slidesPerView: 2, spaceBetween: 20 },   
    1024: { slidesPerView: 3, spaceBetween: 24 },  
  }}
>
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.05 }}
            >
              <img src={cat.image} alt={cat.title} />
              <h3>{cat.title}</h3>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductCarousel;