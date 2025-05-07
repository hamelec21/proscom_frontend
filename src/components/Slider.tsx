import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    desktopSrc: '/slider/slider-desktop-1.jpg',
    mobileSrc: '/slider/slider-mobile-1.jpg',
    alt: 'Slide 1',
  },
  {
    id: 2,
    desktopSrc: '/slider/slider-desktop-2.jpg',
    mobileSrc: '/slider/slider-mobile-2.jpg',
    alt: 'Slide 2',
  },
  {
    id: 3,
    desktopSrc: '/slider/slider-desktop-3.jpg',
    mobileSrc: '/slider/slider-mobile-3.jpg',
    alt: 'Slide 3',
  },
];

export default function Slider() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient) return null; // Previene errores de hidratación

  return (
    <div className="w-full overflow-hidden my-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        spaceBetween={0} // Asegúrate de que no haya espacio extra entre los slides
        slidesPerView={1} // Asegura que solo un slide se vea a la vez
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={isMobile ? slide.mobileSrc : slide.desktopSrc}
              alt={slide.alt}
              className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
