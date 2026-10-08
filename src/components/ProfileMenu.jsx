import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, LogOut, Wallet, Target, User, Pencil, TrendingUp, BarChart3, Clock, Download, Upload, Lock, Landmark, PieChart } from 'lucide-react';

const Icons = { Pencil, TrendingUp, BarChart3, Clock, Download, Upload, Lock, Landmark, PieChart };
import { useApp } from '../context.jsx';
import { PROFILE_LINKS } from '../data.js';

/** variant: 'page' (mobile list) | 'dropdown' (desktop popover) */
export default function ProfileMenu({ variant = 'page', onNavigate }) {
  const nav = useNavigate();
  const { openModal, logout } = useApp();
  const [lang] = useState('English');
  const dd = variant === 'dropdown';

  const go = (l) => {
    onNavigate?.();
    if (l.action) openModal(l.action);
    else nav(l.to);
  };

  return (
    <div className={dd ? 'pmenu pmenu--dd' : 'pmenu'}>
      {dd && (
        <div className="pmenu__user">
          <span className="pmenu__avatar"><User size={14} /></span>
          <div><b>demonew</b><small>919879879878 ✓</small></div>
          <ChevronRight size={14} />
        </div>
      )}
      <div className="pmenu__stats">
        <div className="pmenu__stat"><span className="pmenu__ico"><Wallet size={16} /></span><div><b>25,958.35</b><small>Available Balance</small></div></div>
        <div className="pmenu__sep" />
        <div className="pmenu__stat"><span className="pmenu__ico"><Target size={16} /></span><div><b className="teal">0</b><small>Exposure</small></div></div>
      </div>
      <ul className="pmenu__list">
        {PROFILE_LINKS.filter((l) => dd || !l.desktopOnly).map((l) => {
          const Icon = Icons[l.icon];
          return (
            <li key={l.label}>
              <button onClick={() => go(l)}>
                <span className="pmenu__licon"><Icon size={15} /></span>
                <span>{l.label}</span>
                {!(dd && l.action === 'stake') && <span className="pmenu__chev"><ChevronRight size={14} /></span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="pmenu__lang"><span className="flag">🇬🇧</span> {lang} <ChevronDown size={16} /></div>
      <button className="pmenu__logout" onClick={() => { logout(); onNavigate?.(); nav('/'); }}>
        <LogOut size={14} /> Log Out
      </button>
    </div>
  );
}
