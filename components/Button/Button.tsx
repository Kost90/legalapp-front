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
  fullWidth?: boolean;
  isInStepper?: boolean;
};

export default function Button({
  type = 'default',
  size = 'medium',
  disabled,
  children,
  onClick,
  loading,
  buttonType = 'button',
  fullWidth,
  isInStepper,
  ...attrs
}: Props) {
  const loadingOrSubmitting = useButtonLoading({
    loading,
    isFormSubmit: buttonType === 'submit',
    isInStepper,
  });

  const ref = useRef<HTMLButtonElement>(null);

  const disabledOrLoading = disabled || loadingOrSubmitting;

  return (
    <button
      {...attrs}
      className={cn(
        'flex justify-center items-center min-w-32 py-2 px-8 mt-3 border border-gray-200 text-center rounded-md gap-1',
        {
          'w-full': fullWidth,
          'py-1 px-4 text-sm min-w-24': size === 'small',
          'py-2 px-8 text-base min-w-32': size === 'medium',
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

const useButtonLoading = ({
  loading,
  isFormSubmit,
  isInStepper,
}: {
  loading: boolean | undefined;
  isFormSubmit: boolean | undefined;
  isInStepper?: boolean;
}) => {
  if (isInStepper) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formState = useFormState();
    if (!isFormSubmit) return loading;

    return loading || formState.isSubmitting;
  }

  if (!isFormSubmit) return loading;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formState = useFormState();

  return loading || formState.isSubmitting;
};
