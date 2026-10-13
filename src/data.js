import aviatorImage from "./asstes/aviator.svg";
import andarBaharImage from "./asstes/andar-bahar.svg";
import dragonTigerImage from "./asstes/dragontiger.svg";
import fishingGodImage from "./asstes/fishing-god.svg";
import liveBaccaratImage from "./asstes/live-baccarat.svg";
import luckyDrawImage from "./asstes/luckydraw.svg";
import liveRouletteImage from "./asstes/live-roulette.svg";
import liveBlackJackImage from "./asstes/live-black-jack.svg";

export const NAV = [
  "Home",
  "Cricket",
  "Soccer",
  "Tennis",
  "Casino",
  "Indian Poker",
  "Evolution",
  "Aviator",
  "Table",
  "Slot",
  "Dice",
  "AWC",
  "E-game",
  "Fishing",
  "Ae Sexy",
  "Promotional",
  "Terms and Conditions",
];

export const MATCHES = Array.from({ length: 5 }, (_, i) => ({
  id: String(i + 1),
  name: "Mumbai Indians V Chennai Super Kings",
  league: "Indian Premier League",
  live: true,
  time: "21-07-2026 23:00",
  odds: [
    [2.18, 0],
    [7.92, 0],
    [2.62, 0],
  ],
  mobileOdds: {
    back: "11.8",
    backSize: "3327.02",
    lay: "11.8",
    laySize: "3327.02",
  },
}));

export const CASINO = [
  {
    name: "Aviator",
    image: aviatorImage,
    g: "linear-gradient(135deg,#7f1d1d,#111827)",
  },
  {
    name: "Live Roulette",
    image: liveRouletteImage,
    g: "linear-gradient(135deg,#065f46,#7f1d1d)",
  },
  {
    name: "Andar Bahar",
    image: andarBaharImage,
    g: "linear-gradient(135deg,#047857,#064e3b)",
  },
  {
    name: "Dragon Tiger",
    image: dragonTigerImage,
    g: "linear-gradient(135deg,#9a3412,#451a03)",
  },
  {
    name: "Lucky Draw",
    image: luckyDrawImage,
    g: "linear-gradient(135deg,#0f766e,#1e3a8a)",
  },
  {
    name: "Fishing God",
    image: fishingGodImage,
    g: "linear-gradient(135deg,#0ea5e9,#1e3a8a)",
  },
  {
    name: "Live black jack",
    image: liveBlackJackImage,
    g: "linear-gradient(135deg,#1e3a8a,#0f172a)",
  },
  {
    name: "Live baccarat",
    image: liveBaccaratImage,
    g: "linear-gradient(135deg,#b91c1c,#1f2937)",
  },
];

export const SIDEBAR = [
  {
    sport: "Cricket",
    count: 6,
    league: "Womens One Day Internationals",
    games: [{ n: "Sri Lanka W v Pakistan W", t: "Today 14:00" }],
  },
  {
    sport: "Soccer",
    count: 3,
    league: "Brazilian Serie A",
    games: [
      { n: "Corinthians v Remo", t: "Live", live: true },
      { n: "Botafogo FR v EC Vitoria Sal...", t: "20:00" },
    ],
  },
  {
    sport: "Tennis",
    count: 2,
    league: "ATP Tour",
    games: [],
    extra: "WTA Tour",
  },
];

export const OPEN_BETS = [
  { side: "Lay", team: "Sri Lanka W", odds: "0.80", stake: 100 },
  {
    side: "Back",
    team: "Pakistan W",
    sub: "Sri Lanka W v Pakistan W",
    odds: "1.92",
    stake: 250,
  },
  { side: "Lay", team: "India", odds: "1.05", stake: 500 },
  { side: "Back", team: "Australia", odds: "3.40", stake: 150 },
];

export const STAKES = [100, 200, 400, 600, 1000, 2000, 5000, 10000];
export const QUICK_ADD_1 = ["+300", "+500", "+1K", "+5K"];
export const QUICK_ADD_2 = ["+1K", "+15K", "+20K", "+25K"];

export const BET_SECTIONS = [
  {
    title: "Match Odds",
    head: ["Back", "Lay"],
    rows: ["Mumbai Indians", "Chennai Super Kings"],
  },
  {
    title: "Bookmaker",
    head: ["Back", "Lay"],
    rows: ["Mumbai Indians", "Chennai Super Kings"],
    suspended: true,
  },
  {
    title: "Fancy Bet",
    head: ["No", "Yes"],
    rows: ["MI Will Wins The Toss Bhav", "Match 1 to 5 Balls Adv"],
  },
];

export const PL_ROWS = Array.from({ length: 4 }, () => ({
  title: "Cricket Dambulla Sixers v Kandy Royals Bookmaker",
  date: "21/07/2026, 19:30:00",
  pl: -80,
}));
export const BET_ROWS = [
  {
    title: "Cricket-Sri Lanka W Pakistan W- Bookmaker",
    id: "mrx6a36t",
    sel: "Sri Lanka W",
    type: "Lay",
    date: "23/07/2026, 12:41:05",
    odds: 100,
    stake: 100,
    pl: -100,
  },
  {
    title: "Cricket-Sri Lanka W Pakistan W- Bookmaker",
    id: "mrx6a36t",
    sel: "Sri Lanka W",
    type: "Lay",
    date: "23/07/2026, 12:41:05",
    odds: 100,
    stake: 100,
    pl: 100,
  },
];
export const STATEMENT_ROWS = Array.from({ length: 2 }, () => ({
  title:
    "Cricket / bookmaker / Sri Lanka W v Pakistan W / 35834777 / Sri Lanka W | Bookmaker",
  date: "23/07/2026, 12:41:05",
  credit: 100,
  debit: 100,
  balance: 20000,
}));
export const BANK_ROWS = Array.from({ length: 5 }, () => ({
  bank: "Hdfc Bank",
  date: "23/07/2026, 12:41:05",
  amount: 20000,
}));

export const PROFILE_LINKS = [
  { label: "Edit Stake", icon: "Pencil", action: "stake" },
  {
    label: "Current Bets",
    icon: "TrendingUp",
    to: "/current-bets",
    desktopOnly: true,
  },
  { label: "Profit & Loss", icon: "BarChart3", to: "/profit-loss" },
  { label: "Bet History", icon: "Clock", to: "/bet-history" },
  { label: "Deposit History", icon: "Download", to: "/deposit-history" },
  { label: "Withdraw History", icon: "Upload", to: "/withdraw-history" },
  { label: "Change Password", icon: "Lock", action: "password" },
  { label: "Account Statement", icon: "Landmark", to: "/account-statement" },
  { label: "Turnover", icon: "PieChart", to: "/profit-loss" },
];
