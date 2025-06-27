'use client';

import { AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';
import { usePathname } from 'next/navigation';
import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  onClose: () => void;
}

interface ModalItem<P> {
  id: string;
  component: FC<P & ModalProps>;
  props: P;
}

interface ModalsContextType {
  open: <P>(component: FC<P & ModalProps>, props: P) => void;
  close: (id: string) => void;
  closeLast: () => void;
  closeAll: () => void;
}

const ModalsContext = createContext<ModalsContextType>({
  open: () => {},
  close: () => {},
  closeLast: () => {},
  closeAll: () => {},
});

export const useModals = () => useContext(ModalsContext);

const Portal = ({ children }: { children: ReactNode }) => {
  if (typeof document === 'undefined') {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [element] = useState(() => document.createElement('div'));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  }, [element]);

  return createPortal(children, element);
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalItem<any>[]>([]);

  const open: ModalsContextType['open'] = (component, props) => {
    const id = nanoid();
    setModals((prev) => [...prev, { id, component, props }]);
  };

  const close = useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  const closeLast = useCallback(() => {
    if (modals.length > 0) {
      setModals((prev) => prev.slice(0, prev.length - 1));
    }
  }, [modals]);

  const pathname = usePathname();
  useEffect(() => {
    if (modals.length > 0) {
      closeAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modals.length > 0) {
        closeLast();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [modals, closeLast]);

  return (
    <ModalsContext.Provider value={{ open, close, closeAll, closeLast }}>
      {children}
      <Portal>
        <AnimatePresence>
          {modals.map(({ id, component: Component, props }) => (
            <Component key={id} {...props} onClose={() => close(id)} />
          ))}
        </AnimatePresence>
      </Portal>
    </ModalsContext.Provider>
  );
}
