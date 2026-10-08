import React, { useState } from 'react';
import { Radio, ChevronDown, Minus, Plus } from 'lucide-react';
import { SIDEBAR } from '../data.js';

const EMOJI = { Cricket: '🏏', Soccer: '⚽', Tennis: '🎾' };

export default function Sidebar() {
  const [open, setOpen] = useState({ Cricket: true, Soccer: true, Tennis: true });
  return (
    <aside className="sidebar">
      <div className="sidebar__head"><span><Radio size={13} /> Sportsbook</span><ChevronDown size={14} /></div>
      {SIDEBAR.map((s) => (
        <div key={s.sport}>
          <button className="sidebar__sport" onClick={() => setOpen((o) => ({ ...o, [s.sport]: !o[s.sport] }))}>
            <span>{EMOJI[s.sport]} {s.sport}</span>
            <span className="sidebar__count">{s.count}</span>
            <ChevronDown size={13} />
          </button>
          {open[s.sport] && (
            <div className="sidebar__body">
              <div className="sidebar__league">{s.league}<Minus size={12} className="sq" /></div>
              {s.games.map((g) => (
                <div key={g.n} className="sidebar__game">
                  <div>{g.n}</div>
                  <small className={g.live ? 'live' : ''}>{g.live ? '● Live' : g.t}</small>
                </div>
              ))}
              {s.extra && <div className="sidebar__league">{s.extra}<Plus size={12} className="sq" /></div>}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
