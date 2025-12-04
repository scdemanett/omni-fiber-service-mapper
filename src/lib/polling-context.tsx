'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PollingContextType {
  pollingEnabled: boolean;
  setPollingEnabled: (enabled: boolean) => void;
}

const PollingContext = createContext<PollingContextType | undefined>(undefined);

export function PollingProvider({ children }: { children: ReactNode }) {
  const [pollingEnabled, setPollingEnabled] = useState(() => {
    // Load from localStorage, default to true
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('global-polling-enabled');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('global-polling-enabled', String(pollingEnabled));
  }, [pollingEnabled]);

  return (
    <PollingContext.Provider value={{ pollingEnabled, setPollingEnabled }}>
      {children}
    </PollingContext.Provider>
  );
}

export function usePolling() {
  const context = useContext(PollingContext);
  if (context === undefined) {
    throw new Error('usePolling must be used within a PollingProvider');
  }
  return context;
}

