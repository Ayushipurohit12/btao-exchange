import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { BET_SECTIONS } from '../data.js';
import { useApp } from '../context.jsx';

const SLIP_CHIPS = [100, 200, 400, 600, 1000, 2000, 5000];
const FILTERS = ['All', 'Match Odds', 'Bookmaker', 'Fancy Bet'];

function Stepper({ value, setValue }) {
  return (
    <div className="stepper">
      <button onClick={() => setValue(Math.max(0, value - 100))} aria-label="Decrease"><Minus size={14} /></button>
      <b>{value}</b>
      <button onClick={() => setValue(value + 100)} aria-label="Increase"><Plus size={14} /></button>
    </div>
  );
}

function Slip({ onClose }) {
  const { stake } = useApp();
  const [a, setA] = useState(200);
  const [b, setB] = useState(200);
  const [chip, setChip] = useState(stake);
  const pick = (c) => { setChip(c); setA(c); setB(c); };
  return (
    <div className="slip">
      <div className="slip__steppers"><Stepper value={a} setValue={setA} /><Stepper value={b} setValue={setB} /></div>
      <div className="slip__chips">
        {SLIP_CHIPS.map((c) => <button key={c} className={`chip ${chip === c ? 'is-on' : ''}`} onClick={() => pick(c)}>{c}</button>)}
      </div>
      <button className="btn btn--green slip__place" onClick={onClose}>Place Bet</button>
    </div>
  );
}

function Section({ s }) {
  const [openRow, setOpenRow] = useState(null);
  return (
    <section className="bsec">
      <div className="bsec__tab">{s.title}</div>
      <div className="bsec__minmax"><span>Min / Max <b>-100 - 25000</b></span><i>{s.head[0]}</i><i className="lay">{s.head[1]}</i></div>
      <div className="bsec__rows">
        {s.rows.map((r) => (
          <React.Fragment key={r}>
            <div className="brow">
              <span>{r}</span>
              <button className="cell cell--back" onClick={() => setOpenRow(openRow === r ? null : r)}><b>11.8</b><small>3327.02</small></button>
              <button className="cell cell--lay" onClick={() => setOpenRow(openRow === r ? null : r)}><b>11.8</b><small>3327.02</small></button>
            </div>
            {openRow === r && !s.suspended && <Slip onClose={() => setOpenRow(null)} />}
          </React.Fragment>
        ))}
        {s.suspended && <div className="suspended"><span>Suspended</span></div>}
      </div>
    </section>
  );
}

export default function BetMatch() {
  const [f, setF] = useState('All');
  const sections = BET_SECTIONS.filter((s) => f === 'All' || s.title === f);
  return (
    <div className="match">
      <div className="match__hero">
        <span className="match__title">Sri Lanka W v Pakistan W</span>
        <span>23 Jul 2026 | 10:00 AM</span>
        <b>Bet Started</b>
      </div>
      <div className="match__filters">
        {FILTERS.map((x) => <button key={x} className={x === f ? 'is-dark' : ''} onClick={() => setF(x)}>{x}</button>)}
      </div>
      <div className="match__body">{sections.map((s) => <Section key={s.title} s={s} />)}</div>
    </div>
  );
}
