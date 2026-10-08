import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RotateCw, LogIn, Wallet, User } from 'lucide-react';
import { useApp, useIsDesktop } from '../context.jsx';
import { NAV } from '../data.js';
import { BetsPill, Brand } from './Logo.jsx';
import ProfileMenu from './ProfileMenu.jsx';

function BalanceText({ desktop }) {
  const { balance, exposure } = useApp();
  return (
    <div className={desktop ? 'balance balance--desktop' : 'balance'}>
      {desktop && <Wallet size={16} className="balance__icon" />}
      <div>
        <div>Balance - ₹ {balance}</div>
        <div>Exp - <span className="neg">₹{exposure}</span></div>
      </div>
    </div>
  );
}

export default function Header() {
  const isDesktop = useIsDesktop();
  const { loggedIn, openModal } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  if (!isDesktop) {
    return (
      <header className="topbar">
        <Link to="/"><BetsPill /></Link>
        <div className="topbar__right">
          <Link to="/deposit"><BalanceText /></Link>
          <button className="icon-btn" aria-label="Refresh"><RotateCw size={18} /></button>
        </div>
      </header>
    );
  }

  return (
    <header className="dheader">
      <div className="dheader__top container">
        <Link to="/"><Brand /></Link>
        <div className="dheader__right" ref={ref}>
          <Link to="/deposit" style={{ alignSelf: 'stretch', display: 'flex' }}><BalanceText desktop /></Link>
          <button className="icon-btn icon-btn--dark" aria-label="Refresh"><RotateCw size={15} /></button>
          {loggedIn ? (
            <button className="btn btn--dark" onClick={() => setOpen((v) => !v)}><User size={14} /> My Account</button>
          ) : (
            <button className="btn btn--green" onClick={() => openModal('login')}><LogIn size={14} /> Login</button>
          )}
          {loggedIn && open && <ProfileMenu variant="dropdown" onNavigate={() => setOpen(false)} />}
        </div>
      </div>
      <nav className="dnav">
        <div className="container dnav__inner">
          {NAV.map((n) => (
            <NavLink key={n} to="/" className={`dnav__item ${n === 'Home' ? 'is-active' : ''}`}>{n}</NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
