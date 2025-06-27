import { Ban } from 'lucide-react';
import { FC } from 'react';

import Button from '@/components/Button/Button';

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
      <div className="my-10 flex items-center">
        <div className="text-redbtn mr-4 flex-shrink-0">
          {' '}
          <Ban stroke={'currentColor'} width={'40px'} height={'40px'} />
        </div>
        <p className="text-text-muted text-base">{message}</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>{lang === 'ua' ? 'Закрити' : 'Close'}</Button>
      </div>
    </BaseModal>
  );
};
