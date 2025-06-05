'use client';

import { ReactNode, useRef } from 'react';
import { useFormState } from 'react-hook-form';

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
        'min-w-32 py-2 px-8 mt-3 border border-gray-200 inline-block text-center hover:bg-blue-100 rounded-md',
        attrs.className,
        {
          'bg-redbtn text-white hover:bg-red-500': type === 'critical',
          'bg-white text-blue-500': type === 'default',
        },
        // disabledOrLoading
        //   ? [{ 'bg-neutral-2': type !== 'ghost' }, 'before:bg-border-faint text-text-disabled']
        //   : {
        //       'button-critical bg-accent-crimson-faint before:bg-border-button-critical text-accent-crimson-base': type === 'critical',
        //       'text-text-loud button-default bg-neutral-2 hover:bg-neutral-4 active:bg-neutral-2 before:bg-border-button-default hover:text-neutral-body shadow-glass-s':
        //         type === 'default',
        //       'before:bg-border-faint hover:before:bg-border-default': type === 'ghost',
        //     },
      )}
      disabled={disabledOrLoading}
      ref={ref}
      type={buttonType}
      onClick={onClick}
    >
      {children}

      {loadingOrSubmitting && <div className="overlay flex-center backdrop-blur-sm">{/* <Spinner /> */}</div>}
    </button>
  );
}

const useButtonLoading = ({ loading, isFormSubmit }: { loading: boolean | undefined; isFormSubmit: boolean | undefined }) => {
  if (!isFormSubmit) return loading;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formState = useFormState();

  return loading || formState.isSubmitting;
};
