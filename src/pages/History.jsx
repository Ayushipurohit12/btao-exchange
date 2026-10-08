import React, { useState } from 'react';
import { Calendar, ChevronDown, TrendingUp, TrendingDown, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsDesktop } from '../context.jsx';
import { PL_ROWS, BET_ROWS, STATEMENT_ROWS, BANK_ROWS } from '../data.js';
import Sidebar from '../components/Sidebar.jsx';

const DAYS = ['Today', 'From Yesterday', 'Last 7 days', 'Last 30 days'];

function Select({ children, w }) {
  return <span className="select" style={w ? { width: w } : null}><select defaultValue="">{children}</select><ChevronDown size={14} /></span>;
}
function DateInput() {
  return <span className="date"><input type="date" /><Calendar size={13} /></span>;
}

function Filters({ days }) {
  const [d, setD] = useState('Today');
  return (
    <>
      {days && <div className="days">{DAYS.map((x) => <button key={x} className={x === d ? 'is-on' : ''} onClick={() => setD(x)}>{x}</button>)}</div>}
      <div className="filters">
        <Select><option value="">Bet Type</option><option>Back</option><option>Lay</option></Select>
        <Select><option value="">Bet Status</option><option>Matched</option><option>Unmatched</option></Select>
        <Select><option>Settled</option><option>Unsettled</option></Select>
        <DateInput /><DateInput />
        <button className="btn btn--green btn--sm filters__go">Get History</button>
      </div>
    </>
  );
}

const Show = () => (
  <label className="show">Show <Select w="62px"><option>10</option><option>25</option><option>50</option></Select> entries</label>
);

const Pager = () => (
  <div className="pager"><button><ChevronLeft size={12} /> Prev</button><button className="is-on">1</button><button>Next <ChevronRight size={12} /></button></div>
);

const money = (n) => (n > 0 ? `+${n}` : n < 0 ? `- ${Math.abs(n)}` : '0');

/* ----- row renderers ----- */
function PLRow({ r, d }) {
  return (
    <div className="hrow">
      <div><b className="title">{r.title}</b><small>{r.date}</small></div>
      <div className={d ? 'hrow__pl hrow__pl--right' : 'hrow__pl'}><span>Profit/Loss</span><strong className="neg">{r.pl}</strong></div>
    </div>
  );
}
function BetRow({ r }) {
  return (
    <div className="hcard">
      <div className="hcard__body">
        <b className="title">{r.title}</b>
        <div><b>Bet Id -</b> <span>{r.id}</span></div>
        <div><b>Selection -</b> <span>{r.sel}</span></div>
        <div className="hcard__type"><span><b>Type -</b> {r.type}</span><em>{r.date}</em></div>
      </div>
      <div className="hcard__foot">
        <div><small>Odds req.</small><b>{r.odds}</b></div>
        <div><small>Stake</small><b>{r.stake}</b></div>
        <div><small>Profit/Loss</small><b className={`tag ${r.pl < 0 ? 'neg' : 'pos'}`}>{money(r.pl)}</b></div>
      </div>
    </div>
  );
}
function StatementRow({ r }) {
  return (
    <div className="hcard hcard--s">
      <b className="title">{r.title}</b>
      <em>{r.date}</em>
      <div className="stmt">
        <div><small><TrendingUp size={12} className="pos" /> Credit</small><b className="pos">{r.credit}</b></div>
        <div><small><TrendingDown size={12} className="neg" /> Debit</small><b className="neg">{r.debit}</b></div>
        <div><small>Balance</small><b>{r.balance}</b></div>
      </div>
    </div>
  );
}
function BankRow({ r, attach }) {
  return (
    <div className="bank">
      <span className="arrow"><TrendingUp size={16} /></span>
      <div><b>{r.bank}</b><small>{r.date}</small></div>
      <div className="bank__amt"><small>Amount</small><strong>₹ {r.amount}</strong>{attach && <a><ImageIcon size={11} /> View Attachment</a>}</div>
    </div>
  );
}

const PAGES = {
  'profit-loss': { title: 'Profit / Loss', days: false, filters: true },
  'current-bets': { title: 'Current Bets', days: true, filters: true },
  'account-statement': { title: 'Account Statement', days: false, filters: true },
  'withdraw-history': { title: 'WithDraw History', days: false, filters: false, attach: true },
  'deposit-history': { title: 'Deposit History', days: false, filters: false },
};

export default function History({ kind }) {
  const isDesktop = useIsDesktop();
  const cfg = PAGES[kind];
  const rows = {
    'profit-loss': PL_ROWS.map((r, i) => <PLRow key={i} r={r} d={isDesktop} />),
    'current-bets': BET_ROWS.map((r, i) => <BetRow key={i} r={r} />),
    'account-statement': STATEMENT_ROWS.map((r, i) => <StatementRow key={i} r={r} />),
    'withdraw-history': BANK_ROWS.slice(0, 2).map((r, i) => <BankRow key={i} r={r} attach />),
    'deposit-history': BANK_ROWS.slice(0, 2).map((r, i) => <BankRow key={i} r={r} />),
  }[kind];

  const content = (
    <div className="hpage">
      <div className="hpage__head">
        <span className="hpage__tab">{isDesktop ? '' : cfg.title}</span>
        {isDesktop && <b className="hpage__dtitle">{cfg.title}</b>}
        {!isDesktop && <Show />}
        {isDesktop && cfg.days && <div className="days days--head">{DAYS.map((x, i) => <button key={x} className={i === 0 ? 'is-on' : ''}>{x}</button>)}</div>}
      </div>
      {isDesktop && <div className="hpage__bar"><Show />{cfg.filters && <div className="inline-filters"><Filters /></div>}</div>}
      {!isDesktop && cfg.days && <Filters days />}
      {!isDesktop && !cfg.days && cfg.filters && <Filters />}
      <div className="hlist">{rows}</div>
      {kind === 'profit-loss' && !isDesktop && <Pager />}
      {isDesktop && <div className="hfoot"><span>Showing 0 to 0 of 0 entries</span><Pager /></div>}
    </div>
  );

  if (!isDesktop) return content;
  return <div className="home3 home3--2"><Sidebar /><main>{content}</main></div>;
}
