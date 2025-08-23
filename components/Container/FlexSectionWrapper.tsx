import { memo, ReactNode } from 'react';

type FlexSectionWrapperProps = {
  children: ReactNode;
  dataSectionTheme: 'dark' | 'light' | 'none';
  className?: string;
  id?: string;
};

const FlexSectionWrapper = ({ children, dataSectionTheme, className = '', id }: FlexSectionWrapperProps) => {
  return (
    <section
      data-section-theme={dataSectionTheme}
      id={id}
      className={`mx-auto flex w-full flex-col items-center justify-center px-4 py-5 md:px-8 lg:max-w-7xl ${className}`}
    >
      {children}
    </section>
  );
};

export default memo(FlexSectionWrapper);
