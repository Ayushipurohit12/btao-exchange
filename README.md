# 66Exch – React UI (Web + Mobile)

Responsive React implementation of the Figma file (mobile 402px + desktop 1920px).
The layout switches at **1024px** (`useIsDesktop` in `src/context.jsx`).

## Run
    npm install
    npm run dev      # http://localhost:5173
    npm run build

`node_modules/` and `dist/` are generated locally and are not tracked in Git.

## Screens / routes
| Route | Screen |
|---|---|
| `/` | Home (banner, markets, casino; desktop adds sidebar + Live TV) |
| `/match/:id` | Bet match (Match Odds / Bookmaker / Fancy, bet slip, suspended state) |
| `/deposit`, `/withdraw` | Deposit / Withdraw money (tap the balance in the header) |
| `/profit-loss`, `/current-bets`, `/account-statement` | History pages with filters |
| `/deposit-history`, `/withdraw-history` | Bank transaction lists |
| `/profile` | Mobile profile menu (desktop = "My Account" dropdown) |
| modals | Login, Change Password, Edit Stake |

## Notes
- Design tokens (greens, back/lay blues/pinks, navy) are CSS variables at the top of `src/styles.css`.
- All data is mock data in `src/data.js` – replace with your API.
- Banner/casino photos are CSS gradient placeholders; drop real images into `public/` and
  swap them in `Banner.jsx` / `CasinoGrid.jsx`.
