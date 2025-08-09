import { ReactNode } from 'react';

export type CardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor?: string;
  small?: boolean;
  delay?: number;
  textColor?: string;
};
