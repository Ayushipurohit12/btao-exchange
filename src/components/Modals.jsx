import React, { useEffect, useState } from "react";
import { X, Eye, EyeOff, Zap, User, Lock, ShieldCheck } from "lucide-react";
import { useApp, useIsDesktop } from "../context.jsx";
import { STAKES } from "../data.js";
import loginImage from "../asstes/login.svg";

/** Bottom sheet on mobile, centered dialog on desktop */
function Sheet({ onClose, children, wide }) {
  const isDesktop = useIsDesktop();
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`sheet ${isDesktop ? "sheet--dialog" : ""} ${wide ? "sheet--wide" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <button className="sheet__close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <span className="input">
        <Lock size={15} className="input__lead" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
        />
        <button
          type="button"
          className="input__trail"
          onClick={() => setShow((s) => !s)}
          aria-label="Toggle visibility"
        >
          {show ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </span>
    </label>
  );
}

export function LoginModal() {
  const { closeModal, login } = useApp();
  const isDesktop = useIsDesktop();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [code, setCode] = useState("");
  const captcha = "2255";
  const submit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <Sheet onClose={closeModal} wide>
      <div className="login">
        {isDesktop && (
          <div className="login__art">
            <img
              className="login__art-image"
              src={loginImage}
              alt="Cricket and football"
            />
          </div>
        )}
        <form className="login__form" onSubmit={submit}>
          <h3>Welcome Back</h3>
          <p className="muted">Login to your 66Exch account</p>
          <label className="field">
            <span className="field__label">Username *</span>
            <span className="input">
              <User size={15} className="input__lead" />
              <input
                value={u}
                onChange={(e) => setU(e.target.value)}
                placeholder="Enter Your User Name"
              />
            </span>
          </label>
          <PasswordField
            label="Password *"
            value={p}
            onChange={(e) => setP(e.target.value)}
            placeholder="Enter Password"
          />
          <label className="field">
            <span className="field__label">ValidationCode *</span>
            <span className="input">
              <ShieldCheck size={15} className="input__lead" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Validation Code"
              />
              <span className="captcha">{captcha}</span>
            </span>
          </label>
          <button className="btn btn--green btn--block" type="submit">
            <Zap size={13} fill="#fff" /> Login
          </button>
          <button
            className="btn btn--soft btn--block"
            type="button"
            onClick={login}
          >
            Demo Login
          </button>
        </form>
      </div>
    </Sheet>
  );
}

export function ChangePasswordModal() {
  const { closeModal } = useApp();
  const [f, setF] = useState({ o: "", n: "", c: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const valid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8,15}$/.test(f.n) &&
    f.n === f.c &&
    f.o;
  return (
    <Sheet onClose={closeModal}>
      <div className="pad">
        <h3>Change Password</h3>
        <PasswordField label="Old Password" value={f.o} onChange={set("o")} />
        <PasswordField label="New Password" value={f.n} onChange={set("n")} />
        <PasswordField
          label="Confirm New Password"
          value={f.c}
          onChange={set("c")}
        />
        <button
          className="btn btn--green btn--block"
          disabled={!valid}
          onClick={closeModal}
        >
          Change Password
        </button>
        <ul className="rules">
          <li>Password must have 8 to 15 alphanumeric without white space</li>
          <li>Password cannot be the same as username / nickname</li>
          <li>
            Must contain at least 1 capital letter, 1 small letter and 1 number
          </li>
          <li>
            Password must not contain any special characters (!,@,#,etc..)
          </li>
        </ul>
      </div>
    </Sheet>
  );
}

export function StakeModal() {
  const { closeModal, stake, setStake } = useApp();
  const [v, setV] = useState(stake);
  return (
    <Sheet onClose={closeModal}>
      <div className="pad">
        <h3>Edit Stake</h3>
        <div className="chips">
          {STAKES.map((s) => (
            <button
              key={s}
              className={`chip ${v === s ? "is-on" : ""}`}
              onClick={() => setV(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          className="btn btn--green btn--block"
          onClick={() => {
            setStake(v);
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    </Sheet>
  );
}

export default function Modals() {
  const { modal } = useApp();
  if (modal === "login") return <LoginModal />;
  if (modal === "password") return <ChangePasswordModal />;
  if (modal === "stake") return <StakeModal />;
  return null;
}
