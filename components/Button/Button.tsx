'use client';

import { ReactNode, useRef } from 'react';
import { useFormState } from 'react-hook-form';

import { cn } from '@/utils/cn';
import Spinner from '../Spinner/Spinner';

type Props = {
  type?: 'default' | 'critical' | 'ghost';
  size?: 'small' | 'medium';
  buttonType?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export default function Button({
  type = 'default',
  size = 'medium',
  disabled,
  children,
  onClick,
  loading,
  buttonType = 'button',
  ...attrs
}: Props) {
  const loadingOrSubmitting = useButtonLoading({
    loading,
    isFormSubmit: buttonType === 'submit',
  });

  const ref = useRef<HTMLButtonElement>(null);

  const disabledOrLoading = disabled || loadingOrSubmitting;

  return (
    <button
      {...attrs}
      className={cn(
        'flex justify-center items-center min-w-32 py-2 px-8 mt-3 border border-gray-200 text-center rounded-md gap-1',
        {
          'bg-main-black text-headerfooterwhite hover:bg-black': buttonType === 'submit' && !disabledOrLoading,
          'bg-white text-link-btn-text hover:bg-base-btn-hover-bg': type === 'default' && buttonType === 'button' && !disabledOrLoading,
          'bg-redbtn text-white hover:bg-red-500': type === 'critical' && !disabledOrLoading,
          '!bg-black !text-headerfooterwhite': buttonType === 'submit' && disabledOrLoading,
          'bg-base-btn-hover-bg text-main-black': buttonType !== 'submit' && disabledOrLoading,
        },
        attrs.className,
      )}
      disabled={disabledOrLoading}
      ref={ref}
      type={buttonType}
      onClick={onClick}
    >
      {children}

      {loadingOrSubmitting && (
        <div className="overlay flex justify-center items-center backdrop-blur-sm">
          <Spinner />
        </div>
      )}
    </button>
  );
}

const useButtonLoading = ({ loading, isFormSubmit }: { loading: boolean | undefined; isFormSubmit: boolean | undefined }) => {
  if (!isFormSubmit) return loading;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formState = useFormState();

  return loading || formState.isSubmitting;
};
