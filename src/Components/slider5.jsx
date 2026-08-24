import { SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';
export function slider5(d) {
  return d.map((el, i) => {
    const isSpecial = [1, 3, 4, 5, 6, 7, 8, 9, 10].includes(i);
    return (
      <SwiperSlide key={i} className="flex justify-center">
        <div className="w-[90%]">
          <ProductCard el={el} i={i} isSpecial={isSpecial} />
        </div>
      </SwiperSlide>
    );
  });
}