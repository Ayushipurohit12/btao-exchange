import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Tv } from "lucide-react";
import { useIsDesktop } from "../context.jsx";
import { MATCHES, OPEN_BETS } from "../data.js";
import casinoGameImage from "../asstes/casino-game.svg";
import marketBadgeIcon from "../asstes/Group (1).svg";
import Banner from "../components/Banner.jsx";
import Sidebar from "../components/Sidebar.jsx";
import CasinoGrid from "../components/CasinoGrid.jsx";

const TABS = ["Cricket", "Soccer", "Tennis", "Cassino"];

function MarketTabs({ tab, setTab }) {
  return (
    <div className="mtabs">
      <span className="mtabs__title">
        <Trophy size={14} /> Sports Markets
      </span>
      <div className="mtabs__list">
        {TABS.map((t) => (
          <button
            key={t}
            className={t === tab ? "is-on" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function LivePill() {
  return (
    <span className="live-pill">
      <i /> LIVE
    </span>
  );
}
function Badges() {
  return (
    <span className="badges">
      <b className="badge badge--tv">
        <img src={marketBadgeIcon} alt="" />
      </b>
      <b className="badge badge--f">F</b>
      <b className="badge badge--bm">BM</b>
    </span>
  );
}

/* Mobile row */
function MobileMatch({ m }) {
  return (
    <Link to={`/match/${m.id}`} className="mrow">
      <div className="mrow__meta">
        <LivePill />
        <span className="league">{m.league}</span>
        <Badges />
      </div>
      <div className="mrow__main">
        <span className="mrow__name">
          {m.name.replace("Super Kings", "Super...")}
        </span>
        <span className="odd odd--back">
          <b>{m.mobileOdds.back}</b>
          <small>{m.mobileOdds.backSize}</small>
        </span>
        <span className="odd odd--lay">
          <b>{m.mobileOdds.lay}</b>
          <small>{m.mobileOdds.laySize}</small>
        </span>
      </div>
    </Link>
  );
}

/* Desktop table row */
function DesktopMatch({ m, first }) {
  return (
    <Link to={`/match/${m.id}`} className="drow">
      <div className="drow__meta">
        <LivePill />
        <span className="league">{m.league}</span>
      </div>
      {first && (
        <div className="drow__heads">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
      )}
      <div className="drow__main">
        <div>
          <b>{m.name}</b>
          <small>{m.time}</small>
        </div>
        <Badges />
        {m.odds.map((o, i) => (
          <span className="pair" key={i}>
            <i className="odd--back">{o[0].toFixed(2)}</i>
            <i className="odd--lay">{o[1]}</i>
          </span>
        ))}
      </div>
    </Link>
  );
}

function LiveTv() {
  return (
    <div className="panel livetv">
      <div className="panel__head">
        <span>
          <Tv size={13} /> Live TV
        </span>
        <span className="switch" />
      </div>
      <div className="livetv__screen">
        <Tv size={28} />
        <b>No stream available</b>
        <small>Select a live match to watch</small>
      </div>
      <div className="livetv__tabs">
        <button className="is-on">Market Bets</button>
        <button>UnMatch Bets</button>
      </div>
      <table className="obets">
        <thead>
          <tr>
            <th>OPEN BETS</th>
            <th>ODDS</th>
            <th>STAKE</th>
          </tr>
        </thead>
        <tbody>
          {OPEN_BETS.map((b, i) => (
            <tr key={i} className={b.side === "Lay" ? "is-lay" : "is-back"}>
              <td>
                <span className="side">{b.side}</span>
                <b>{b.team}</b>
                {b.sub && <small>{b.sub}</small>}
              </td>
              <td>{b.odds}</td>
              <td>{b.stake}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="obets__foot">
        <span>4 bets</span>
        <b>Total: ₹1000</b>
      </div>
    </div>
  );
}

export default function Home() {
  const isDesktop = useIsDesktop();
  const [tab, setTab] = useState("Cricket");

  if (!isDesktop) {
    return (
      <>
        <Banner />
        <MarketTabs tab={tab} setTab={setTab} />
        <div className="mlist">
          {MATCHES.slice(0, 4).map((m) => (
            <MobileMatch key={m.id} m={m} />
          ))}
        </div>
        <h4 className="section-title">
          <img
            className="casino-heading-image"
            src={casinoGameImage}
            alt="Casino Games"
          />
        </h4>
        <div className="pad-x">
          <CasinoGrid cols={2} />
        </div>
      </>
    );
  }

  return (
    <div className="home3">
      <Sidebar />
      <main>
        <Banner />
        <div className="panel">
          <div className="panel__title">
            <Trophy size={14} /> Sports Markets
          </div>
          <div className="dtabs">
            {TABS.slice(0, 3).map((t, i) => (
              <button key={t} className={i === 0 ? "is-on" : ""}>
                {t}
              </button>
            ))}
          </div>
          {MATCHES.map((m, i) => (
            <DesktopMatch key={m.id} m={m} first={i === 0} />
          ))}
        </div>
      </main>
      <aside className="rside">
        <LiveTv />
        <div className="panel">
          <div className="panel__title panel__title--plain">
            <img
              className="casino-heading-image"
              src={casinoGameImage}
              alt="Casino Games"
            />
          </div>
          <div className="pad-s">
            <CasinoGrid cols={2} />
          </div>
        </div>
      </aside>
    </div>
  );
}
