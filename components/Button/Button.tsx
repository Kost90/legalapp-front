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
        attrs.className,
        {
          'bg-main-black text-headerfooterwhite hover:bg-black': buttonType === 'submit',
          'bg-white text-link-btn-text hover:bg-base-btn-hover-bg': type === 'default' && buttonType === 'button',
          'bg-redbtn text-white hover:bg-red-500': type === 'critical',
          'bg-blue-300! text-gray-200': disabledOrLoading,
        },
      )}
      disabled={disabledOrLoading}
      ref={ref}
      type={buttonType}
      onClick={onClick}
    >
      {children}

      {loadingOrSubmitting && (
        <div className="overlay flex-center backdrop-blur-sm">
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
