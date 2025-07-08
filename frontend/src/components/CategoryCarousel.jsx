import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "DevOps Engineer",
  "Mobile Developer",
  "UI/UX Designer",
  "ML Engineer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <section className="relative max-w-full bg-[#111111] text-[#E0E0E0] py-20 overflow-hidden">
      {/* Optional Background Glow with Grey Tone */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_20%_20%,#444444_0%,transparent_25%),radial-gradient(circle_at_80%_80%,#333333_0%,transparent_30%)] animate-pulse" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">
          🔥 Explore by <span className="text-[#B0B0B0]">Category</span>
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Autoplay]}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <button
                onClick={() => searchJobHandler(cat)}
                className="w-full rounded-full px-6 py-2 font-medium text-sm text-[#D1D1D1] border-2 border-[#555555] bg-transparent hover:text-white transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">{cat}</span>
                {/* Grey Hover Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#555555] to-[#333333] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCarousel;
