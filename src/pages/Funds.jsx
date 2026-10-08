import React, { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, IndianRupee, Clock, ChevronDown, Tag, TrendingUp, Landmark, User, Phone, Lock, FileText, Eye, EyeOff } from 'lucide-react';
import { useIsDesktop } from '../context.jsx';
import { QUICK_ADD_1, QUICK_ADD_2, BANK_ROWS } from '../data.js';

const toNum = (s) => parseFloat(s.replace('+', '').replace('K', '')) * (s.includes('K') ? 1000 : 1);

function Cards() {
  return (
    <div className="fcards">
      <div className="fcard fcard--green"><small>Withdrawal Amount</small><b>₹ 24,500</b><span>Available to withdraw instantly</span><i><IndianRupee size={14} /></i></div>
      <div className="fcard fcard--dark"><small>Holding amount</small><b className="gold">₹ 24,500</b><span>Available to withdraw instantly</span><i><Clock size={14} /></i></div>
    </div>
  );
}

function Deposit() {
  const isDesktop = useIsDesktop();
  const [amt, setAmt] = useState('100');
  const add = (q) => setAmt(String((parseFloat(amt) || 0) + toNum(q)));
  return (
    <div className="fform">
      <h3>Add Funds to Your Account</h3>
      <p className="muted">{isDesktop ? 'Minimum ₹100 · Maximum ₹300,000' : 'Minumun 100 Maximum 300,000'}</p>
      <div className="fform__label">Amount <span className="req">required</span></div>
      <div className="muted xs">100 - 300,000</div>
      <input className="bigin" value={amt} onChange={(e) => setAmt(e.target.value.replace(/[^\d.]/g, ''))} inputMode="numeric" />
      <div className="qgrid">
        {[...QUICK_ADD_1, ...QUICK_ADD_2].map((q, i) => <button key={i} onClick={() => add(q)}>{q}</button>)}
      </div>
      <div className="offers"><span className="fform__label">Amount <span className="req">required</span></span><button><Tag size={13} /> Available Offers <ChevronDown size={13} /></button></div>
      <button className="btn btn--green btn--block btn--lg">Submit</button>
    </div>
  );
}

function IconInput({ icon: Icon, placeholder, type = 'text', trail }) {
  const [show, setShow] = useState(false);
  return (
    <span className="input">
      <Icon size={15} className="input__lead" />
      <input type={trail ? (show ? 'text' : 'password') : type} placeholder={placeholder} />
      {trail && <button type="button" className="input__trail" onClick={() => setShow(!show)}>{show ? <Eye size={16} /> : <EyeOff size={16} />}</button>}
    </span>
  );
}

function Withdraw() {
  const [amt, setAmt] = useState('100');
  return (
    <div className="fform">
      <h3>Withdraw Funds from Your Account</h3>
      <p className="muted">Minimum Withdrawal: 100</p>
      <div className="fform__label">Amount <span className="req">required</span></div>
      <div className="muted xs">100 - 300,000</div>
      <input className="bigin" value={amt} onChange={(e) => setAmt(e.target.value)} />
      <label className="field"><span className="field__label">Ifsc Code <em>*</em></span><IconInput icon={FileText} placeholder="Enter IFSC Code" /></label>
      <label className="field"><span className="field__label">Account Number <em>*</em></span><IconInput icon={Landmark} placeholder="Enter Account Number" /></label>
      <label className="field"><span className="field__label">Confirm Account Number <em>*</em></span><IconInput icon={Landmark} placeholder="Re - Enter Account Number" /></label>
      <label className="field"><span className="field__label">Account Name <em>*</em></span><IconInput icon={User} placeholder="Acccount Holder Name" /></label>
      <label className="field"><span className="field__label">Mobile Number <em>*</em></span><IconInput icon={Phone} placeholder="10 digit Mobile Number" /></label>
      <div className="right"><button className="btn btn--green btn--sm">Get Otp</button></div>
      <label className="field"><span className="field__label">Your Password <em>*</em></span><IconInput icon={Lock} placeholder="Enter Your Account Password" trail /></label>
      <label className="check"><input type="checkbox" /> I have read and agree with the terms of payment and withdrawal policy.</label>
      <button className="btn btn--green btn--block btn--lg">Withdraw</button>
    </div>
  );
}

export default function Funds({ initial = 'deposit' }) {
  const isDesktop = useIsDesktop();
  const [tab, setTab] = useState(initial);
  const tabs = (
    <div className="ftabs">
      <button className={tab === 'deposit' ? 'is-on' : ''} onClick={() => setTab('deposit')}><ArrowDownToLine size={14} /> Deposit Money</button>
      <button className={tab === 'withdraw' ? 'is-on' : ''} onClick={() => setTab('withdraw')}><ArrowUpFromLine size={14} /> Withdraw Money</button>
    </div>
  );
  return (
    <div className="funds">
      {!isDesktop && <Cards />}
      {tabs}
      <div className="funds__grid">
        {tab === 'deposit' ? <Deposit /> : <Withdraw />}
        {isDesktop && (
          <aside className="recent">
            <div className="recent__head"><Clock size={13} /> Recent Deposits</div>
            {BANK_ROWS.map((r, i) => (
              <div className="recent__row" key={i}>
                <span className="arrow"><TrendingUp size={14} /></span>
                <div><b>{r.bank}</b><small>{r.date.replace(',', ',')}</small></div>
                <strong>₹{r.amount}</strong>
              </div>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}
