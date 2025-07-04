'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useDevice } from '@/context/DeviceProvider';
import { cn } from '@/utils/cn';

import { mobileStepVariants } from './animation-variants';

type Step = {
  label: string;
  key: string;
};

interface StepperProps {
  isErrorExist: boolean;
  steps: Step[];
  activeStep: string;
  filledStepIndex?: number;
  setActiveStep?: (stepKey: string) => void;
  className?: string;
}

export default function Stepper({ isErrorExist, steps, activeStep, filledStepIndex, setActiveStep, className = '' }: StepperProps) {
  const deviceContext = useDevice();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [prevActiveIndex, setPrevActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLargeScreen = isClient && deviceContext.isMd;

  const activeIndex = steps.findIndex((step) => step.key === activeStep);

  useEffect(() => {
    setPrevActiveIndex(activeIndex);
  }, [activeIndex]);

  const direction = prevActiveIndex && activeIndex > prevActiveIndex ? 'right' : 'left';

  return (
    <div className={cn('relative overflow-hidden py-16', className)}>
      {isLargeScreen ? (
        // Desctop
        <div className="relative flex items-center justify-between">
          <motion.div
            className="bg-base-btn-hover-bg absolute top-1/2 left-0 h-[2px]"
            style={{ transform: 'translateY(-50%)' }}
            initial={{ width: 0 }}
            animate={{
              width: `${(activeIndex / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <div className="bg-border absolute top-1/2 right-0 left-0 -z-10 h-[2px]" style={{ transform: 'translateY(-50%)' }} />

          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isFilled = filledStepIndex !== undefined ? index <= filledStepIndex : index < activeIndex;
            const isClickable = typeof setActiveStep === 'function' && (isFilled || index === activeIndex + 1);

            return (
              <button
                key={step.key}
                onClick={() => isClickable && setActiveStep?.(step.key)}
                className={cn(
                  'group relative z-10 flex flex-col items-center transition-colors duration-300',
                  'min-w-[160px] text-center md:min-w-0',
                  isClickable ? 'cursor-pointer' : 'cursor-default',
                )}
                disabled={!isClickable}
              >
                <motion.div
                  className={cn(
                    'mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium',
                    'transition-all duration-300 group-hover:shadow-md',
                  )}
                  animate={{
                    backgroundColor:
                      activeStep === 'result'
                        ? '#46d75a'
                        : isActive && !isErrorExist
                          ? '#6B8091'
                          : isActive && isErrorExist
                            ? '#ff5a5f'
                            : isFilled
                              ? '#46d75a'
                              : '#FFFFFF',
                    borderColor:
                      activeStep === 'result'
                        ? '#46d75a'
                        : isActive && !isErrorExist
                          ? '#6B8091'
                          : isActive && isErrorExist
                            ? '#ff5a5f'
                            : isFilled
                              ? 'transparent'
                              : '#E5E7EB',
                    color: isActive || isFilled ? '#FFFFFF' : '#6B7280',
                  }}
                  whileHover={isClickable ? { scale: 1.1 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {index + 1}
                </motion.div>
                <span
                  className={cn(
                    'text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-black' : 'text-muted-text',
                    isClickable ? 'group-hover:text-black' : '',
                  )}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        // Mobile screen
        <div className="relative flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeStep}
              className="absolute w-full"
              custom={direction}
              variants={mobileStepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      'bg-color-footer-link-green flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-transparent text-sm font-medium text-white',
                    )}
                  >
                    {activeIndex + 1}
                  </div>
                  <span className="text-sm font-medium text-black">{steps[activeIndex].label}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
