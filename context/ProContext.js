import { createContext, useContext, useState } from "react";

const ProContext = createContext();

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(false);

  return (
    <ProContext.Provider value={{ isPro, setIsPro }}>
      {children}
    </ProContext.Provider>
  );
}

export function usePro() {
  return useContext(ProContext);
}
