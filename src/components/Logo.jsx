import React from "react";
import { Zap } from "lucide-react";
import betsLogo from "../asstes/logo.svg";

/** Mobile "Bets" pill */
export function BetsPill() {
  return (
    <div className="bets-pill">
      <img className="bets-pill__icon" src={betsLogo} alt="" />
      <span>Bets</span>
    </div>
  );
}

/** Desktop 66Exch brand */
export function Brand() {
  return (
    <div className="brand">
      <div className="brand__mark">
        <Zap size={20} fill="#fff" />
      </div>
      <div>
        <div className="brand__name">66Exch</div>
        <div className="brand__tag">BETTING EXCHANGE</div>
      </div>
    </div>
  );
}
