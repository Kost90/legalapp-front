import { FC } from 'react';

import { BaseModal } from './BaseModal';
import { ModalProps } from './ModalProvider';

interface ErrorModalProps {
  title: string;
  message: string;
  lang: string;
}

export const ErrorModal: FC<ErrorModalProps & ModalProps> = ({ onClose, title, message, lang }) => {
  return (
    <BaseModal onClose={onClose} title={title}>
      <div className="flex items-center">
        <svg className="text-redbtn mr-4 h-10 w-10 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 011.06 0L12 9.94l.72-.72a.75.75 0 111.06 1.06L13.06 11l.72.72a.75.75 0 11-1.06 1.06L12 12.06l-.72.72a.75.75 0 01-1.06-1.06L10.94 11l-.72-.72a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <p className="text-text-muted text-base">{message}</p>
          <button onClick={onClose} className="bg-redbtn mt-4 rounded-md px-4 py-2 text-white transition-opacity hover:opacity-90">
            {lang === 'ua' ? 'Закрити' : 'Close'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
