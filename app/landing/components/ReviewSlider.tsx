'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { testimonials } from '../review';
import ReviewCard from './ReviewCard';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function ReviewSlider() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="!pb-10"
    >
      {testimonials.map((item, idx) => (
        <SwiperSlide key={idx} className="flex justify-center">
          <ReviewCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
