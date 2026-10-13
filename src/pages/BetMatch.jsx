import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { BET_SECTIONS } from "../data.js";
import { useApp, useIsDesktop } from "../context.jsx";
import Sidebar from "../components/Sidebar.jsx";

const SLIP_CHIPS = [100, 200, 400, 600, 1000, 2000, 5000];
const FILTERS = ["All", "Match Odds", "Bookmaker", "Fancy Bet"];

function Stepper({ value, setValue }) {
  return (
    <div className="stepper">
      <button
        onClick={() => setValue(Math.max(0, value - 100))}
        aria-label="Decrease"
      >
        <Minus size={14} />
      </button>
      <b>{value}</b>
      <button onClick={() => setValue(value + 100)} aria-label="Increase">
        <Plus size={14} />
      </button>
    </div>
  );
}

function Slip({ onClose }) {
  const { stake } = useApp();
  const [a, setA] = useState(200);
  const [b, setB] = useState(200);
  const [chip, setChip] = useState(stake);
  const pick = (c) => {
    setChip(c);
    setA(c);
    setB(c);
  };
  return (
    <div className="slip">
      <div className="slip__steppers">
        <Stepper value={a} setValue={setA} />
        <Stepper value={b} setValue={setB} />
      </div>
      <div className="slip__chips">
        {SLIP_CHIPS.map((c) => (
          <button
            key={c}
            className={`chip ${chip === c ? "is-on" : ""}`}
            onClick={() => pick(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <button className="btn btn--green slip__place" onClick={onClose}>
        Place Bet
      </button>
    </div>
  );
}

function Section({ s, isDesktop }) {
  const [openRow, setOpenRow] = useState(null);
  const multiQuotes = isDesktop && s.title !== "Fancy Bet";
  const quoteCount = multiQuotes ? 3 : 1;
  const odds = ["4.2", "4.3", "4.4"];
  const amounts = ["334.88", "3.7k", "886.72"];
  return (
    <section className="bsec">
      <div className="bsec__heading">
        <div className="bsec__tab">{s.title}</div>
        {["Match Odds", "Bookmaker"].includes(s.title) && (
          <span className="bsec__matched">Matched ₹ 10000</span>
        )}
      </div>
      <div
        className={`bsec__minmax${multiQuotes ? " bsec__minmax--multi" : ""}`}
      >
        <i className="back-group">{s.head[0]}</i>
        <i className="lay">{s.head[1]}</i>
        <span className="bsec__limits">
          Min / Max <b>-100 - 25000</b>
        </span>
      </div>
      <div className="bsec__rows">
        {s.rows.map((r) => (
          <React.Fragment key={r}>
            <div className={`brow${multiQuotes ? " brow--multi" : ""}`}>
              <span>{r}</span>
              {Array.from({ length: quoteCount * 2 }, (_, index) => {
                const isBack = index < quoteCount;
                const quoteIndex = index % quoteCount;
                const quoteValue = multiQuotes ? odds[quoteIndex] : "11.8";
                const amount = multiQuotes ? amounts[quoteIndex] : "3327.02";
                return (
                  <button
                    key={`${r}-${index}`}
                    className={`cell ${isBack ? "cell--back" : "cell--lay"}`}
                    onClick={() => setOpenRow(openRow === r ? null : r)}
                  >
                    <b>{quoteValue}</b>
                    <small>{amount}</small>
                  </button>
                );
              })}
            </div>
            {openRow === r && !s.suspended && (
              <Slip onClose={() => setOpenRow(null)} />
            )}
          </React.Fragment>
        ))}
        {s.suspended && (
          <div className="suspended">
            <span>Suspended</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default function BetMatch() {
  const isDesktop = useIsDesktop();
  const [f, setF] = useState("All");
  const sections = BET_SECTIONS.filter((s) => f === "All" || s.title === f);
  const match = (
    <div className="match">
      <div className="match__hero">
        <span className="match__title">Sri Lanka W v Pakistan W</span>
        <span>23 Jul 2026 | 10:00 AM</span>
        <b>Bet Started</b>
      </div>
      <div className="match__filters">
        {FILTERS.map((x) => (
          <button
            key={x}
            className={x === f ? "is-dark" : ""}
            onClick={() => setF(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="match__body">
        {sections.map((s) => (
          <Section key={s.title} s={s} isDesktop={isDesktop} />
        ))}
      </div>
    </div>
  );

  if (!isDesktop) return match;

  return (
    <div className="home3 home3--2">
      <Sidebar />
      <main>{match}</main>
    </div>
  );
}
