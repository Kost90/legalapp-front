import { ReactNode } from 'react';

function Default({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-[calc(897px+var(--root-padding)*2)] flex-col pb-24 md:pb-164">{children}</div>;
}

function Narrow({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-[calc(592px+var(--root-padding)*2)] flex-col pb-24 md:pb-164">{children}</div>;
}

function FullTableItem({ children }: { children: ReactNode }) {
  return <div className="full-table-item mx-auto w-full max-w-[calc(992px+var(--root-padding)*2)]">{children}</div>;
}

const Container = {
  Default,
  Narrow,
  FullTableItem,
};

export default Container;
