'use client';

import { ReactNode, useRef } from 'react';
import { useFormState } from 'react-hook-form';

import Spinner from '@/components/Spinner/Spinner';
import { cn } from '@/utils/cn';

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
  isLogoutBtn?: boolean;
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
  isLogoutBtn,
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
        'mt-3 flex min-w-32 items-center justify-center gap-1 rounded-md border border-gray-200 px-8 py-2 text-center',
        {
          'w-full': fullWidth,
          'min-w-24 px-4 py-1 text-sm': size === 'small',
          'min-w-32 px-8 py-2 text-base': size === 'medium',
          'bg-main-black text-headerfooterwhite hover:bg-black': buttonType === 'submit' && !disabledOrLoading,
          'text-main-black hover:border-main-black border-btn-border-color border bg-transparent':
            type === 'default' && buttonType === 'button' && !disabledOrLoading,
          'bg-redbtn text-white hover:bg-red-500': type === 'critical' && !disabledOrLoading,
          '!text-headerfooterwhite !bg-black': (buttonType === 'submit' && disabledOrLoading) || isLogoutBtn,
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
        <div className="overlay flex items-center justify-center backdrop-blur-sm">
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
