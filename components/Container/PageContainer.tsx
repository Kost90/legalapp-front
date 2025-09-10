import { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  return <div className={`mx-auto flex min-h-screen w-full flex-col items-center gap-14 md:gap-28 ${className}`}>{children}</div>;
};

export default PageContainer;
