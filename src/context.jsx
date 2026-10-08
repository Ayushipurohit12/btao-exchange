import React, { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

/** true when viewport is desktop width (matches the 1920 web designs vs 402 mobile designs) */
export function useIsDesktop(breakpoint = 1024) {
  const q = `(min-width: ${breakpoint}px)`;
  const [v, setV] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const h = (e) => setV(e.matches);
    m.addEventListener('change', h);
    return () => m.removeEventListener('change', h);
  }, [q]);
  return v;
}

export function AppProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modal, setModal] = useState(null); // 'login' | 'password' | 'stake' | null
  const [stake, setStake] = useState(1000);
  const [balance] = useState(12000);
  const [exposure] = useState(500);
  return (
    <Ctx.Provider
      value={{
        loggedIn, login: () => { setLoggedIn(true); setModal(null); }, logout: () => setLoggedIn(false),
        modal, openModal: setModal, closeModal: () => setModal(null),
        stake, setStake, balance, exposure,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
