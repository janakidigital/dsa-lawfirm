import { createContext, useState, useContext } from "react";

const LogoContext = createContext();

export function LogoProvider({ children }) {
  const [logoUrl, setLogoUrl] = useState("/assets/logo.png"); // default logo

  return (
    <LogoContext.Provider value={{ logoUrl, setLogoUrl }}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogo() {
  return useContext(LogoContext);
}