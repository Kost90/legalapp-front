import { memo, ReactNode } from 'react';

type FlexSectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const FlexSectionWrapper = ({ children, className = '', id }: FlexSectionWrapperProps) => {
  return (
    <section id={id} className={`mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-5 md:px-8 ${className}`}>
      {children}
    </section>
  );
};

export default memo(FlexSectionWrapper);
