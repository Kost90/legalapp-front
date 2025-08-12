import { motion } from 'framer-motion';

import { flipCardAppear, flipCardRotate } from '@/lib/constants/cardsAnimationsVariants';
import { CardProps } from '@/types/cards';

const FlipCard = ({ icon, title, description, bgColor, textColor, delay = 0 }: CardProps) => {
  return (
    <motion.div
      className={`h-[215px] w-[180px] flex-shrink-0 cursor-pointer [perspective:1000px] md:w-[205px]`}
      variants={flipCardAppear(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="relative h-full w-full rounded-xl [transform-style:preserve-3d]"
        variants={flipCardRotate}
        initial="initial"
        whileHover="hover"
      >
        <div
          className="absolute flex h-full w-full flex-col items-center justify-center rounded-xl p-4 text-center [backface-visibility:hidden]"
          style={{ backgroundColor: bgColor }}
        >
          <div className="mb-2">{icon}</div>
          <h3 className={`text-base font-bold ${textColor}`}>{title}</h3>
        </div>

        <div
          className="absolute flex h-full w-full flex-col items-center justify-center rounded-xl p-4 text-center [backface-visibility:hidden]"
          style={{ backgroundColor: bgColor, transform: 'rotateY(180deg)' }}
        >
          <p className={`text-sm ${textColor}`}>{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
