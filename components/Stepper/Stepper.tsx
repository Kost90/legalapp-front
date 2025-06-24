'use client';

import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevice } from '@/context/DeviceProvider';
import { useEffect, useState } from 'react';
import { mobileStepVariants } from './animation-variants';

type Step = {
  label: string;
  key: string;
};

interface StepperProps {
  steps: Step[];
  activeStep: string;
  filledStepIndex?: number;
  setActiveStep?: (stepKey: string) => void;
  className?: string;
}

export default function Stepper({ steps, activeStep, filledStepIndex, setActiveStep, className = '' }: StepperProps) {
  const deviceContext = useDevice();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLargeScreen = isClient && deviceContext.isMd;

  const activeIndex = steps.findIndex((step) => step.key === activeStep);

  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  const direction = activeIndex > prevActiveIndex ? 'right' : 'left';

  useEffect(() => {
    setPrevActiveIndex(activeIndex);
  }, [activeIndex]);

  return (
    <div className={cn('relative overflow-hidden py-16', className)}>
      {isLargeScreen ? (
        // Desctop
        <div className="relative flex items-center justify-between">
          <motion.div
            className="absolute top-1/2 left-0 h-[2px] bg-base-btn-hover-bg"
            style={{ transform: 'translateY(-50%)' }}
            initial={{ width: 0 }}
            animate={{
              width: `${(activeIndex / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -z-10" style={{ transform: 'translateY(-50%)' }} />

          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isFilled = filledStepIndex !== undefined ? index <= filledStepIndex : index < activeIndex;
            const isClickable = typeof setActiveStep === 'function' && (isFilled || index === activeIndex + 1);

            return (
              <button
                key={step.key}
                onClick={() => isClickable && setActiveStep?.(step.key)}
                className={cn(
                  'flex flex-col items-center relative z-10 group transition-colors duration-300',
                  'min-w-[160px] md:min-w-0 text-center',
                  isClickable ? 'cursor-pointer' : 'cursor-default',
                )}
                disabled={!isClickable}
              >
                <motion.div
                  className={cn(
                    'w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-medium mb-2',
                    'group-hover:shadow-md transition-all duration-300',
                  )}
                  animate={{
                    backgroundColor: activeStep === 'result' ? '#46d75a' : isActive ? '#6B8091' : isFilled ? '#46d75a' : '#FFFFFF',
                    borderColor: activeStep === 'result' ? '#46d75a' : isActive ? '#6B8091' : isFilled ? 'transparent' : '#E5E7EB',
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
        <div className="relative flex justify-center items-center">
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
                      'w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-medium bg-color-footer-link-green border-transparent text-white flex-shrink-0',
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
