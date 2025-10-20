import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { FC, ReactNode } from 'react';

import { ModalProps } from './ModalProvider';

interface BaseModalProps extends ModalProps {
  children: ReactNode;
  title: string;
}

const overlayVariants = {
  visible: { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: 1 },
  hidden: { backgroundColor: 'rgba(0, 0, 0, 0)', opacity: 0 },
};

const modalVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 0 },
};

export const BaseModal: FC<BaseModalProps> = ({ onClose, children, title }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        variants={modalVariants}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-main-black text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-muted-text hover:text-main-black transition-colors" aria-label="Close modal">
            <X />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </motion.div>
    </motion.div>
  );
};
