
import React, { createContext, useContext } from 'react';

const AIContext = createContext({});

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AIContext.Provider value={{}}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  return context;
};
