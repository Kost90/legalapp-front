import { ComponentProps, ReactNode } from 'react';

// import { TableProvider } from '@/components/Table/TableContext/TableContext';

function Default({ children }: { children: ReactNode }) {
  return <div className="max-w-[calc(897px+var(--root-padding)*2)] px-root mx-auto flex flex-col pb-24 md:pb-164">{children}</div>;
}

function Narrow({ children }: { children: ReactNode }) {
  return <div className="max-w-[calc(592px+var(--root-padding)*2)] px-root mx-auto flex flex-col pb-24 md:pb-164">{children}</div>;
}

// function FullTable(attrs: ComponentProps<typeof TableProvider>) {
//   return (
//     <div className="flex flex-col isolate h-[calc(100vh-var(--header-height))] full-table px-root">
//       <TableProvider {...attrs} />
//     </div>
//   );
// }

function FullTableItem({ children }: { children: ReactNode }) {
  return <div className="max-w-[calc(992px+var(--root-padding)*2)] full-table-item mx-auto w-full">{children}</div>;
}

const Container = {
  Default,
  Narrow,
  //   FullTable,
  FullTableItem,
};

export default Container;
