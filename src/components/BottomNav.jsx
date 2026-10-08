import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarCheck, Dices, UserRound } from 'lucide-react';
import { useApp } from '../context.jsx';

export default function BottomNav() {
  const { loggedIn, openModal } = useApp();
  const item = (to, label, Icon, guard) => (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => `bnav__item ${isActive ? 'is-active' : ''}`}
      onClick={(e) => { if (guard && !loggedIn) { e.preventDefault(); openModal('login'); } }}
    >
      <Icon size={22} strokeWidth={1.6} />
      <span>{label}</span>
    </NavLink>
  );
  return (
    <nav className="bnav">
      {item('/', 'Home', Home)}
      {item('/match/1', 'Events', CalendarCheck)}
      {item('/casino', 'Casino', Dices)}
      {item('/profile', 'Profile', UserRound, true)}
    </nav>
  );
}
