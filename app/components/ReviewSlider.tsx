'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { testimonials } from '../landing/review';
import ReviewCard from './ReviewCard';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function ReviewSlider() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      breakpoints={{
        768: { slidesPerView: 3 },
      }}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="!pb-10"
    >
      {testimonials.map((item, idx) => (
        <SwiperSlide key={idx}>
          <ReviewCard {...item} highlight={idx === 1} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
