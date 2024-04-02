import React, { createContext, useContext } from 'react';
import { SeverityType } from './custom-toast';
import { useToast } from 'src/hooks/useToast';

type ShowToastFunction = (message: string, severity: SeverityType) => void;

const ToastContext = createContext<ShowToastFunction | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { CustomToastTemplate, showToast } = useToast();

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {CustomToastTemplate}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ShowToastFunction => {
  const showToast = useContext(ToastContext);

  if (!showToast) {
    throw new Error('useToastContext error');
  }

  return showToast;
};
