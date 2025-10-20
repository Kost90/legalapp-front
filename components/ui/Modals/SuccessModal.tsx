import { FC } from 'react';

import Button from '@/components/ui/button/Button';

import { BaseModal } from './BaseModal';
import { ModalProps } from './ModalProvider';

interface SuccessModalProps {
  title: string;
  message: string;
  lang: string;
}

export const SuccessModal: FC<SuccessModalProps & ModalProps> = ({ onClose, title, message, lang }) => {
  return (
    <BaseModal onClose={onClose} title={title}>
      <div className="my-10 flex items-center">
        <svg className="text-color-footer-link-green mr-4 h-10 w-10 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-text-muted text-base">{message}</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>{lang === 'ua' ? 'Вітаємо!' : 'Congratulations!'}</Button>
      </div>
    </BaseModal>
  );
};
