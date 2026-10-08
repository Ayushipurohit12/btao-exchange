import React from "react";
import { Navigate } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu.jsx";
import CasinoGrid from "../components/CasinoGrid.jsx";
import casinoGameImage from "../asstes/casino-game.svg";
import { useApp, useIsDesktop } from "../context.jsx";

export function ProfilePage() {
  const { loggedIn } = useApp();
  const isDesktop = useIsDesktop();
  if (isDesktop || !loggedIn) return <Navigate to="/" replace />;
  return (
    <>
      <div className="ptitle">Profile</div>
      <ProfileMenu variant="page" />
    </>
  );
}

export function CasinoPage() {
  return (
    <>
      <h4 className="section-title">
        <img
          className="casino-heading-image"
          src={casinoGameImage}
          alt="Casino Games"
        />
      </h4>
      <div className="pad-x">
        <CasinoGrid cols={2} />
      </div>
    </>
  );
}
