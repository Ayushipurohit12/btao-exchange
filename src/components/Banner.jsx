import React, { useEffect, useState } from 'react';
import { useIsDesktop } from '../context.jsx';

export default function Banner() {
  const [i, setI] = useState(0);
  const isDesktop = useIsDesktop();
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % 4), 4000); return () => clearInterval(t); }, []);
  return (
    <section className="banner">
      {isDesktop && <span className="banner__badge">100%</span>}
      <div className="banner__text">
        <h2>Welcome Bonus<br />Up to ₹10,000</h2>
        <p>On your first deposit. Min ₹100. T&amp;C Apply.</p>
        <button className="btn btn--white">Claim Now</button>
      </div>
      {!isDesktop && (
        <div className="banner__dots">
          {[0, 1, 2, 3].map((d) => <span key={d} className={d === i ? 'is-on' : ''} onClick={() => setI(d)} />)}
        </div>
      )}
    </section>
  );
}
