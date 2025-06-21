'use client';

import { cn } from '@/utils/cn';

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
  barClassName?: string;
  itemClassName?: string;
  frameClassName?: string;
  scrollWrapperClassName?: string;
}

export default function Stepper({
  steps,
  activeStep,
  filledStepIndex,
  setActiveStep,
  className = '',
  barClassName = '',
  itemClassName = '',
  frameClassName = '',
  scrollWrapperClassName = '',
}: StepperProps) {
  return (
    <div className={cn('relative overflow-x-auto py-16', className)}>
      <div className={cn('absolute top-1/2 left-5 right-5 h-[2px] bg-border', barClassName)} />
      <div className={cn('relative flex items-center justify-between', scrollWrapperClassName)}>
        {steps.map((step, index) => {
          const isActive = step.key === activeStep;
          const isFilled = filledStepIndex !== undefined && index < filledStepIndex;
          const isClickable = typeof setActiveStep === 'function';

          return (
            <button
              key={step.key}
              onClick={() => isClickable && setActiveStep?.(step.key)}
              className={cn(
                'flex flex-col items-center relative z-10 group transition-all duration-300',
                'min-w-[160px] md:min-w-0 text-center',
                itemClassName,
              )}
              disabled={!isClickable}
            >
              <div
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-medium mb-2',
                  isActive
                    ? 'bg-accent border-accent text-white'
                    : isFilled
                      ? 'bg-accent border-accent text-white'
                      : 'bg-white border-btn-border-color text-muted-text',
                  'group-hover:shadow-md',
                )}
              >
                {index + 1}
              </div>
              <span className={cn('text-sm font-medium', isActive ? 'text-black' : 'text-muted-text group-hover:text-black')}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
// 'use client';

// import { cn } from '@/utils/cn';
// import { ReactNode } from 'react';

// type Step = {
//   label: string;
//   key: string;
// };

// interface StepperProps {
//   steps: Step[];
//   activeStep: string;
//   filledStepIndex?: number;
//   setActiveStep?: (stepKey: string) => void;
//   className?: string;
//   barClassName?: string;
//   itemClassName?: string;
//   frameClassName?: string;
//   scrollWrapperClassName?: string;
// }

// export default function Stepper({
//   steps,
//   activeStep,
//   filledStepIndex,
//   setActiveStep,
//   className = '',
//   barClassName = '',
//   itemClassName = '',
//   frameClassName = '',
//   scrollWrapperClassName = '',
// }: StepperProps) {
//   const activeIndex = steps.findIndex((step) => step.key === activeStep);
//   const progressPercent = ((activeIndex + 1) / steps.length) * 100;

//   return (
//     <div className={cn('relative overflow-x-auto py-6', className)}>
//       {/* Прогресс-бар фоновый */}
//       <div className={cn('absolute top-[36px] left-5 right-5 h-[2px] bg-border', barClassName)} />

//       {/* Прогресс-бар активный (с анимацией) */}
//       <div
//         className="absolute top-[36px] left-5 h-[2px] bg-accent transition-all duration-500"
//         style={{ width: `calc(${progressPercent}% - 40px)` }}
//       />

//       <div className={cn('relative flex items-center gap-4 md:justify-between px-5 min-w-full', scrollWrapperClassName)}>
//         {steps.map((step, index) => {
//           const isActive = step.key === activeStep;
//           const isFilled = filledStepIndex !== undefined && index < filledStepIndex;
//           const isClickable = typeof setActiveStep === 'function';

//           return (
//             <button
//               key={step.key}
//               onClick={() => isClickable && setActiveStep?.(step.key)}
//               className={cn(
//                 'flex flex-col items-center flex-shrink-0 min-w-[120px] relative z-10 group transition-all duration-300',
//                 itemClassName,
//               )}
//               disabled={!isClickable}
//             >
//               <div
//                 className={cn(
//                   'w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-medium mb-2 transition-colors duration-300',
//                   isActive
//                     ? 'bg-accent border-accent text-white shadow-lg'
//                     : isFilled
//                       ? 'bg-accent border-accent text-white'
//                       : 'bg-white border-btn-border-color text-muted-text',
//                   'group-hover:shadow-md',
//                 )}
//               >
//                 {index + 1}
//               </div>
//               <span
//                 className={cn(
//                   'text-xs md:text-sm font-medium text-center break-words',
//                   isActive ? 'text-black' : 'text-muted-text group-hover:text-black',
//                 )}
//               >
//                 {step.label}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
