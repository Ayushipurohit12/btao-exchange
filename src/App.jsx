import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useIsDesktop } from "./context.jsx";
import Header from "./components/Header.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Modals from "./components/Modals.jsx";
import Home from "./pages/Home.jsx";
import BetMatch from "./pages/BetMatch.jsx";
import Funds from "./pages/Funds.jsx";
import History from "./pages/History.jsx";
import { ProfilePage, CasinoPage } from "./pages/Misc.jsx";

export default function App() {
  const isDesktop = useIsDesktop();
  return (
    <div className={isDesktop ? "app app--desktop" : "app app--mobile"}>
      <Header />
      <div className={isDesktop ? "container page" : "page"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match/:id" element={<BetMatch />} />
          <Route path="/deposit" element={<Funds initial="deposit" />} />
          <Route path="/withdraw" element={<Funds initial="withdraw" />} />
          <Route path="/profit-loss" element={<History kind="profit-loss" />} />
          <Route
            path="/current-bets"
            element={<History kind="current-bets" />}
          />
          <Route path="/bet-history" element={<History kind="bet-history" />} />
          <Route
            path="/account-statement"
            element={<History kind="account-statement" />}
          />
          <Route
            path="/withdraw-history"
            element={<History kind="withdraw-history" />}
          />
          <Route
            path="/deposit-history"
            element={<History kind="deposit-history" />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/casino" element={<CasinoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!isDesktop && <BottomNav />}
      <Modals />
    </div>
  );
}
