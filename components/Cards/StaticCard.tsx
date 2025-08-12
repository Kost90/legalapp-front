import { motion } from 'framer-motion';

import { staticCardAppear } from '@/lib/constants/cardsAnimationsVariants';
import { CardProps } from '@/types/cards';

const StaticCard = ({ icon, title, description }: CardProps) => (
  <motion.div
    className="bg-background-grey-extra-ligth flex h-full flex-col justify-center rounded-xl p-6 shadow-lg"
    variants={staticCardAppear}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-text-blue-dark text-xl font-bold">{title}</h3>
    <p className="text-text-grey mt-2">{description}</p>
  </motion.div>
);

export default StaticCard;
