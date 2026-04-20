import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import valerio from "./assets/valerio.JPG";

// ─── Ajoute dans index.html <head> ────────────────────────────────────────────
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
// ─────────────────────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:#060d1f;color:#e2e8f0;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#0a1628}
::-webkit-scrollbar-thumb{background:#1e4dd8;border-radius:2px}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 12px #1e4dd855}50%{box-shadow:0 0 28px #1e4dd8aa}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.fade-up{animation:fadeUp .7s ease both}
.float-anim{animation:float 4s ease-in-out infinite}
.glass{background:rgba(14,28,64,0.55);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(99,149,255,0.15)}
.neon-box{border:1px solid rgba(0,183,255,0.25);box-shadow:0 0 20px rgba(0,183,255,0.06),inset 0 0 20px rgba(0,183,255,0.03);background:rgba(14,28,64,0.5);backdrop-filter:blur(18px)}
.neon-box:hover{border-color:rgba(0,183,255,0.55);box-shadow:0 0 32px rgba(0,183,255,0.14)}
.skill-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#1e4dd8,#00b7ff);transition:width 1.4s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
.skill-fill::after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);animation:scan 2s linear infinite}
.tech-tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(30,77,216,0.15);border:1px solid rgba(99,149,255,0.2);color:#7eb3ff;letter-spacing:.04em}
section{min-height:100vh;display:flex;align-items:center;padding:6rem 2rem 4rem 5.5rem}
.section{
  width:100%;
}
.section-inner{max-width:980px;margin:0 auto;width:100%}
.grid-2{display:grid;grid-template-columns:300px 1fr;gap:2.8rem;align-items:center}
.grid-3{display:grid;grid-template-columns:1fr 1.2fr;gap:2.8rem;align-items:start}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:.9rem}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:1.1rem}
.resume-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.8rem}
.contact-grid{display:grid;grid-template-columns:1fr 2fr;gap:1.8rem;align-items:start}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-bottom:1.6rem}
.contact-form-grid{display:flex; flex-direction:row; flex-wrap:wrap; gap:1rem}
.hero-buttons{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:3rem}
.footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
@media (max-width:1024px){
  .grid-2,.grid-3,.resume-grid,.contact-grid,.info-grid,.contact-form-grid{grid-template-columns:1fr}
  .grid-4{grid-template-columns:repeat(4,minmax(70px,1fr))}
  .section{padding:5rem 1.5rem 4rem 1.5rem !important}
}
@media(max-width:768px){section{padding:4rem 1rem 3rem 1rem !important}.side-nav{display:none!important}
  .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))}
  .footer{flex-direction:column !important;align-items:center !important;text-align:center}
  .hero-buttons{gap:12px}
  .btn-fullwidth{width:100% !important;max-width:460px}
  .projects-grid{grid-template-columns:1fr}
  .contact-grid{grid-template-columns:1fr}
  .resume-grid{grid-template-columns:1fr}
  .section-inner{padding:0}
}

`;

const NAV = [
  { id:"home",     icon:"fa-solid fa-house",       label:"Accueil" },
  { id:"about",    icon:"fa-solid fa-user",         label:"À propos" },
  { id:"skills",   icon:"fa-solid fa-layer-group",  label:"Compétences" },
  { id:"projects", icon:"fa-solid fa-folder",       label:"Projets" },
  { id:"resume",   icon:"fa-solid fa-file-lines",   label:"CV" },
  { id:"contact",  icon:"fa-solid fa-envelope",     label:"Contact" },
];

const SKILLS = [
  { name:"HTML / CSS",   pct:95, icon:"fa-brands fa-html5",   col:"#e34c26" },
  { name:"JavaScript",   pct:65, icon:"fa-brands fa-js",       col:"#f7df1e" },
  { name:"React.js",     pct:60, icon:"fa-brands fa-react",    col:"#61dafb" },
  { name:"Python",       pct:75, icon:"fa-brands fa-python",   col:"#3776ab" },
  { name:"PHP",          pct:70, icon:"fa-brands fa-php",      col:"#8892be" },
  // { name:"Node.js",      pct:60, icon:"fa-brands fa-node-js",  col:"#68a063" },
  { name:"PostgreSQL",   pct:85, icon:"fa-solid fa-database",  col:"#336791" },
  { name:"Git / GitHub", pct:90, icon:"fa-brands fa-git-alt",  col:"#f1502f" },
];

const PROJECTS = [
  { title:"Réfrigérateur Intelligent", org:"École Nationale de l'Informatique", date:"Oct. 2025",
    desc:"Application web de gestion intelligente avec suivi de température, inventaire automatique et notifications en temps réel.",
    techs:["Flask","PostgreSQL","Python","JS"], icon:"fa-solid fa-temperature-half", accent:"#00b7ff",
    github:"https://github.com/evondray/refrigerateur-intelligent",
    demo:"https://smartfridze.duckdns.org/" },
  { title:"Plateforme Médicale", org:"E-Work Pro — France", date:"Août–Oct. 2024",
    desc:"Consultation médicale en ligne avec gestion des patients et rendez-vous.",
    techs:["Django","React","PostgreSQL","Stripe"], icon:"fa-solid fa-heart-pulse", accent:"#ff4fa3",
    github:"https://github.com/ValerioFaleson/Consultation-Inline" },
  { title:"RDP_Laverie", org:"Projet pedagogique", date:"Août. 2025",
    desc:"Réseau de Petri pour laverie partagée en résidence.",
    techs:["Python","Django","JS","Réseau de Petri"], icon:"fa-solid fa-network-wired", accent:"#34d399",
    github:"https://github.com/ValerioFaleson/RDP_Laverie" },
  { title:"Music-scream en ligne", org:"Projet personnel", date:"Août. 2025",
    desc:"Plateforme musicale en ligne avec websocket pour streaming en temps réel.",
    techs:["Python","JS","WebSocket","Django"], icon:"fa-solid fa-music", accent:"#8b5cf6",
    github:"https://github.com/ValerioFaleson/Music-sream" },
  // { title:"Système de Facturation", org:"Softlab SARLU — Antananarivo", date:"Sept.–Oct. 2023",
  //   desc:"Gestion de facturation complète avec interface admin, génération PDF et suivi des paiements clients.",
  //   techs:["PHP","CodeIgniter","MySQL","Bootstrap"], icon:"fa-solid fa-file-invoice", accent:"#f59e0b",
  //   github:"https://github.com/evondray/systeme-facturation" },
  // { title:"Gestion Prêts Auto", org:"École Nationale de l'Informatique", date:"Sept. 2022",
  //   desc:"Application desktop de gestion des prêts automobiles avec interface graphique et génération de rapports.",
  //   techs:["Qt Creator","C++","Access","Windows"], icon:"fa-solid fa-car", accent:"#a78bfa",
  //   github:"https://github.com/evondray/gestion-prets-auto" },
  // { title:"Portfolio Personnel", org:"Projet personnel", date:"2025",
  //   desc:"Portfolio moderne avec React, Tailwind et animations avancées pour présenter mes compétences.",
  //   techs:["React","Tailwind","Vite"], icon:"fa-solid fa-globe", accent:"#34d399", github:"#" },
  // { title:"Nouveau projet…", org:"En développement", date:"2026",
  //   desc:"Un nouveau projet passionnant est en cours. Restez connecté !",
  //   techs:["TBD"], icon:"fa-solid fa-rocket", accent:"#fb923c", github:"#", wip:true },
];

/* ── Typewriter ── */
function Typewriter({ words }) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi];
    const speed = del ? 55 : ci === word.length ? 1800 : 75;
    const t = setTimeout(() => {
      if (!del && ci < word.length) { setText(word.slice(0, ci + 1)); setCi(c => c + 1); }
      else if (!del) { setDel(true); }
      else if (ci > 0) { setText(word.slice(0, ci - 1)); setCi(c => c - 1); }
      else { setDel(false); setWi(w => (w + 1) % words.length); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, ci, wi, words]);
  return (
    <span style={{ color:"#00b7ff", fontFamily:"'Fira Code',monospace" }}>
      {text}<span style={{ animation:"blink 1s infinite", display:"inline-block" }}>|</span>
    </span>
  );
}

/* ── SkillBar ── */
function SkillBar({ s, delay }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom:"1rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:s.col+"20", display:"flex", alignItems:"center", justifyContent:"center", color:s.col, fontSize:13 }}>
            <i className={s.icon}></i>
          </div>
          <span style={{ fontSize:13, fontWeight:600, color:"#cbd5e1" }}>{s.name}</span>
        </div>
        <span style={{ fontSize:12, fontWeight:700, color:"#00b7ff", fontFamily:"'Fira Code',monospace" }}>{s.pct}%</span>
      </div>
      <div style={{ height:5, background:"rgba(255,255,255,0.07)", borderRadius:4, overflow:"hidden" }}>
        <div className="skill-fill" style={{ width: on ? `${s.pct}%` : "0%", transitionDelay:`${delay}ms` }} />
      </div>
    </div>
  );
}

/* ── ProjectCard ── */
function ProjectCard({ p }) {
  return (
    <div
      className="neon-box"
      style={{ borderRadius:16, overflow:"hidden", transition:"transform .3s, box-shadow .3s" }}
      onMouseEnter={e => { if (!p.wip) { e.currentTarget.style.transform="translateY(-6px)"; }}}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
    >
      <div style={{
        height:120, background:`linear-gradient(135deg,${p.accent}18,${p.accent}05)`,
        borderBottom:"1px solid rgba(99,149,255,0.1)",
        display:"flex", alignItems:"center", justifyContent:"center", position:"relative",
      }}>
        <i className={p.icon} style={{ fontSize:38, color:p.accent+"55" }}></i>
        <span style={{ position:"absolute", top:8, right:8, background:"rgba(0,0,0,.55)", color:"#475569", fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:20, letterSpacing:".05em" }}>{p.date}</span>
        {p.wip && <span style={{ position:"absolute", top:8, left:8, background:p.accent+"22", color:p.accent, fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:20, border:`1px solid ${p.accent}44` }}>WIP</span>}
      </div>
      <div style={{ padding:"1rem 1.2rem" }}>
        <p style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".14em", color:p.accent, marginBottom:3 }}>{p.org}</p>
        <h3 style={{ fontSize:14, fontWeight:800, color:"#f1f5f9", marginBottom:6 }}>{p.title}</h3>
        <p style={{ fontSize:11.5, color:"#64748b", lineHeight:1.7, marginBottom:10 }}>{p.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
          {p.techs.map(t => (
            <span key={t} className="tech-tag" style={{ color:p.accent, background:p.accent+"12", borderColor:p.accent+"28" }}>{t}</span>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            style={{ flex:1, minWidth:120, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"8px 0", borderRadius:9, fontSize:12, fontWeight:600, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,.1)", color:"#94a3b8", textDecoration:"none", transition:"all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=p.accent+"55"; e.currentTarget.style.color=p.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; e.currentTarget.style.color="#94a3b8"; }}
          >
            <i className="fa-brands fa-github"></i> GitHub
          </a>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer"
              style={{ flex:1, minWidth:120, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"8px 0", borderRadius:9, fontSize:12, fontWeight:600, background:p.accent+"14", border:`1px solid ${p.accent}33`, color:p.accent, textDecoration:"none", cursor:"pointer", transition:"all .2s" }}
              onMouseEnter={e => e.currentTarget.style.background=p.accent+"28"}
              onMouseLeave={e => e.currentTarget.style.background=p.accent+"14"}
            >
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize:10 }}></i> Démo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar Nav ── */
function SideNav({ active, go }) {
  const [hov, setHov] = useState(null);
  return (
    <nav className="side-nav" style={{
      position:"fixed", left:16, top:"50%", transform:"translateY(-50%)", zIndex:100,
      display:"flex", flexDirection:"column", gap:6,
      background:"rgba(14,28,64,0.72)", backdropFilter:"blur(22px)",
      border:"1px solid rgba(99,149,255,0.18)", borderRadius:50, padding:"12px 9px",
      boxShadow:"0 0 40px rgba(30,77,216,0.15)",
    }}>
      {NAV.map(item => {
        const isActive = active === item.id;
        const isHov = hov === item.id;
        return (
          <div key={item.id} style={{ position:"relative" }}>
            <button
              onClick={() => go(item.id)}
              onMouseEnter={() => setHov(item.id)}
              onMouseLeave={() => setHov(null)}
              title={item.label}
              style={{
                width:38, height:38, borderRadius:"50%", border:"none", cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:14,
                transition:"all .25s",
                background: isActive ? "linear-gradient(135deg,#1e4dd8,#00b7ff)" : isHov ? "rgba(30,77,216,0.28)" : "transparent",
                color: isActive ? "#fff" : isHov ? "#7eb3ff" : "#4a6fa5",
                boxShadow: isActive ? "0 0 18px rgba(0,183,255,.45)" : "none",
              }}
            >
              <i className={item.icon}></i>
            </button>
            {isHov && (
              <span style={{
                position:"absolute", left:"calc(100% + 12px)", top:"50%", transform:"translateY(-50%)",
                background:"rgba(14,28,64,0.95)", border:"1px solid rgba(99,149,255,0.25)",
                color:"#cbd5e1", fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:8,
                whiteSpace:"nowrap", pointerEvents:"none", backdropFilter:"blur(12px)",
              }}>{item.label}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ══════════════════════ APP ══════════════════════ */
export default function App() {
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const id = "pf-css";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id; s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const fn = () => {
      setShowTop(window.scrollY > 300);
      for (const { id } of [...NAV].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const EMAILJS_CONFIGURED = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const submit = async e => {
    e.preventDefault();
    if (EMAILJS_CONFIGURED && formRef.current) {
      setSending(true);
      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
        setSent(true);
        setForm({ name:"", email:"", subject:"", message:"" });
      } catch (error) {
        console.error("EmailJS error:", error);
      } finally {
        setSending(false);
        setTimeout(() => {
          setSent(false);
        }, 3500);
      }
    } else {
      const mailto = `mailto:evondrayfalesonv@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Bonjour,\n\n${form.message}\n\nNom: ${form.name}\nEmail: ${form.email}`)}`;
      window.location.href = mailto;
    }
  };
  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/portfolio/CV_EVONDRAY_Faleson_Valerio.pdf";
    link.download = "CV_EVONDRAY_Faleson_Valerio.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const BG = () => (
    <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-20%", left:"35%", width:700, height:700, background:"radial-gradient(circle,rgba(30,77,216,.1) 0%,transparent 65%)", borderRadius:"50%" }} />
      <div style={{ position:"absolute", bottom:"-15%", right:"-10%", width:550, height:550, background:"radial-gradient(circle,rgba(0,183,255,.07) 0%,transparent 65%)", borderRadius:"50%" }} />
      <div style={{ position:"absolute", top:"35%", left:"-8%", width:450, height:450, background:"radial-gradient(circle,rgba(167,139,250,.05) 0%,transparent 65%)", borderRadius:"50%" }} />
      <div style={{ position:"absolute", inset:0, opacity:.035, backgroundImage:"radial-gradient(rgba(100,160,255,.9) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />
    </div>
  );

  const btn = (label, icon, onClick, grad=false) => (
    <button onClick={onClick} style={{
      padding:"12px 28px", borderRadius:50, fontWeight:700, fontSize:13, cursor:"pointer",
      border: grad ? "none" : "1.5px solid rgba(99,149,255,.35)",
      background: grad ? "linear-gradient(135deg,#1e4dd8,#00b7ff)" : "transparent",
      color: grad ? "#fff" : "#cbd5e1",
      display:"flex", alignItems:"center", gap:8, letterSpacing:".04em",
      boxShadow: grad ? "0 0 22px rgba(0,183,255,.28)" : "none",
      transition:"all .2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; if(grad) e.currentTarget.style.boxShadow="0 0 32px rgba(0,183,255,.5)"; else { e.currentTarget.style.borderColor="#00b7ff"; e.currentTarget.style.color="#00b7ff"; }}}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; if(grad) e.currentTarget.style.boxShadow="0 0 22px rgba(0,183,255,.28)"; else { e.currentTarget.style.borderColor="rgba(99,149,255,.35)"; e.currentTarget.style.color="#cbd5e1"; }}}
    >
      <i className={icon}></i>{label}
    </button>
  );

  return (
    <div style={{ background:"#060d1f", minHeight:"100vh" }}>
      <BG />
      <SideNav active={active} go={go} />

      {/* ──────── SCROLL TOP ──────── */}
      {showTop && (
        <button onClick={() => go("home")} style={{
          position:"fixed", bottom:24, right:24, zIndex:100, width:42, height:42, borderRadius:"50%",
          background:"linear-gradient(135deg,#1e4dd8,#00b7ff)", border:"none", cursor:"pointer",
          color:"#fff", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 0 22px rgba(0,183,255,.4)", animation:"pulse-glow 2s infinite",
          transition:"transform .2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform="scale(1.12)"}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        >
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      )}

      {/* ════ HOME ════ */}
      <section id="home" className="section home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", textAlign:"center", position:"relative", zIndex:1 }}>

        {/* Avatar */}
        <div className="float-anim" style={{ marginBottom:"1.8rem", position:"relative", display:"inline-block" }}>
          <div style={{
            width:140, height:140, borderRadius:"50%", padding:3,
            background:"linear-gradient(135deg,#1e4dd8,#00b7ff)",
            boxShadow:"0 0 50px rgba(0,183,255,.35)",
          }}>
            <img src={valerio} alt="Valério" style={{
              width:"100%", height:"100%", borderRadius:"50%",
              objectFit:"cover", display:"block", border:"2px solid rgba(255,255,255,0.08)",
            }} />
          </div>
          <div style={{
            position:"absolute", bottom:7, right:7, width:18, height:18, borderRadius:"50%",
            background:"#22c55e", border:"3px solid #060d1f", boxShadow:"0 0 10px #22c55e99",
          }} />
        </div>

        <div className="fade-up" style={{ animationDelay:".05s" }}>
          <p style={{ fontSize:13, color:"#3d5a96", fontWeight:600, letterSpacing:".2em", textTransform:"uppercase", marginBottom:".6rem" }}>
            — Bonjour, je m'appelle —
          </p>
          <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(3rem,8vw,5.5rem)", fontWeight:500, color:"#fff", lineHeight:1.05, marginBottom:".6rem" }}>
            EVONDRAY{" "} <br />
            <span style={{ background:"linear-gradient(135deg,#00b7ff,#1e4dd8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Faleson Valério</span>
          </h1>
          <div style={{ fontSize:"clamp(1rem,2.5vw,1.45rem)", marginBottom:"1.5rem", minHeight:"2.4rem" }}>
            <span style={{ color:"#475569" }}>Je suis </span>
            <Typewriter words={["Développeur Fullstack", "Étudiant en Informatique", "Créateur d'applications web", "Passionné de code"]} />
          </div>
          {/* <p style={{ color:"#3d5a96", maxWidth:500, margin:"0 auto 2.5rem", lineHeight:1.85, fontSize:14 }}>
            Je conçois des applications web modernes, performantes et accessibles.
          </p> */}
        </div>

        <div className="fade-up hero-buttons" style={{ animationDelay:".2s" }}>
          {btn("Voir mes projets", "fa-solid fa-folder-open", () => go("projects"), true)}
          {btn("Télécharger CV",   "fa-solid fa-download",    downloadCV)}
        </div>

        {/* Stats */}
        {/* <div className="fade-up" style={{ animationDelay:".35s", display:"flex", gap:"2.5rem", justifyContent:"center", flexWrap:"wrap" }}>
          {[["4+","Projets"],["2+","Ans d'exp."],["8+","Technos"],["3","Langues"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"2rem", fontWeight:900, color:"#00b7ff", fontFamily:"'Fira Code',monospace" }}>{n}</div>
              <div style={{ fontSize:10, color:"#2d4272", textTransform:"uppercase", letterSpacing:".1em", marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div> */}
      </section>

      {/* ════ ABOUT ════ */}
      <section id="about" className="section about" style={{ position:"relative", zIndex:1 }}>
        <div className="section-inner grid-2 about-grid" style={{ maxWidth:980, margin:"0 auto" }}>
          {/* Card */}
          <div className="neon-box" style={{ borderRadius:22, padding:"2rem", textAlign:"center" }}>
            <div>
              <img src={valerio} alt="Valério" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
          </div>

          {/* Text */}
          <div>
            <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".2em", color:"#00b7ff" }}>À propos</span>
            <h2 className="section-title" style={{ marginTop:8, marginBottom:"1.1rem" }}>
              Qui suis-<span className="highlight">je ?</span>
            </h2>
            <p style={{ color:"#94a3b8", lineHeight:1.9, marginBottom:"1rem", fontSize:14 }}>
              Étudiant passionné à l'<strong style={{color:"#cbd5e1"}}> École Nationale de l'Informatique</strong> de Madagascar, je me spécialise dans le développement web fullstack. Mon approche combine rigueur technique et créativité pour produire des expériences numériques mémorables.
            </p>
            <p style={{ color:"#475569", lineHeight:1.9, marginBottom:"1.6rem", fontSize:13 }}>
              Curieux et autonome, j'apprends constamment de nouvelles technologies et j'aime relever des défis complexes.
            </p>

            <div className="info-grid">
              {[
                ["fa-solid fa-envelope","Email","evondrayfalesonv@gmail.com"],
                ["fa-solid fa-phone","Téléphone","+261 33 89 601 08"],
                ["fa-solid fa-location-dot","Ville","Fianarantsoa 301"],
                ["fa-solid fa-language","Langues","MG · FR · EN"],
              ].map(([ic,lb,vl]) => (
                <div key={lb} style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:11, background:"rgba(14,28,64,0.5)", border:"1px solid rgba(99,149,255,0.1)" }}>
                  <i className={ic} style={{ color:"#00b7ff", fontSize:12, width:14, textAlign:"center" }}></i>
                  <div>
                    <div style={{ fontSize:9, color:"#2d4272", fontWeight:700, textTransform:"uppercase", letterSpacing:".08em" }}>{lb}</div>
                    <div style={{ fontSize:11.5, color:"#94a3b8", fontWeight:500 }}>{vl}</div>
                  </div>
                </div>
              ))}
            </div>

            {btn("Télécharger le CV", "fa-solid fa-download", downloadCV, true)}
          </div>
        </div>
      </section>

      {/* ════ SKILLS ════ */}
      <section id="skills" className="section skills" style={{ position:"relative", zIndex:1 }}>
        <div className="section-inner grid-3 skills-grid" style={{ maxWidth:980, margin:"0 auto" }}>
          <div>
            <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".2em", color:"#00b7ff" }}>Stack technique</span>
            <h2 className="section-title" style={{ marginTop:8, marginBottom:"1rem" }}>
              Mes <span className="highlight">compétences</span>
            </h2>
            <p style={{ color:"#475569", lineHeight:1.85, marginBottom:"2rem", fontSize:13 }}>
              Fullstack avec maîtrise de l'écosystème JS moderne, Python et des BDD relationnelles. En apprentissage constant.
            </p>

            {/* Icon grid */}
            <div className="neon-box grid-4" style={{ borderRadius:18, padding:"1.5rem" }}>
              {[
                ["fa-brands fa-html5","#e34c26"],["fa-brands fa-css3-alt","#264de4"],
                ["fa-brands fa-js","#f7df1e"],["fa-brands fa-react","#61dafb"],
                ["fa-brands fa-python","#3776ab"],["fa-solid fa-database","#4db33d"],
                ["fa-brands fa-php","#8892be"],["fa-brands fa-git-alt","#f1502f"],
              ].map(([ic,cl]) => (
                <div key={ic} style={{ aspectRatio:"1", borderRadius:12, background:cl+"15", border:`1px solid ${cl}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:cl, transition:"all .25s", cursor:"default" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=cl+"30"; e.currentTarget.style.transform="scale(1.1)"; e.currentTarget.style.boxShadow=`0 0 14px ${cl}44`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=cl+"15"; e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}
                ><i className={ic}></i></div>
              ))}
            </div>
          </div>

          {/* Bars */}
          <div className="neon-box" style={{ borderRadius:18, padding:"1.8rem" }}>
            {SKILLS.map((s,i) => <SkillBar key={s.name} s={s} delay={i*80} />)}
          </div>
        </div>
      </section>

      {/* ════ PROJECTS ════ */}
      <section id="projects" className="section projects" style={{ position:"relative", zIndex:1, flexDirection:"column", alignItems:"flex-start" }}>
        <div className="section-inner" style={{ maxWidth:980, margin:"0 auto", width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".2em", color:"#00b7ff" }}>Réalisations</span>
            <h2 className="section-title" style={{ marginTop:8 }}>Mon <span className="highlight">portfolio</span></h2>
            <p style={{ color:"#3d5a96", fontSize:13, marginTop:6 }}>Une sélection de mes projets récents</p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map(p => <ProjectCard key={p.title} p={p} />)}
          </div>
        </div>
      </section>

      {/* ════ RESUME ════ */}
      <section id="resume" className="section resume" style={{ position:"relative", zIndex:1, flexDirection:"column", alignItems:"flex-start" }}>
        <div className="section-inner" style={{ maxWidth:980, margin:"0 auto", width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".2em", color:"#00b7ff" }}>Parcours</span>
            <h2 className="section-title" style={{ marginTop:8 }}>Mon <span className="highlight">CV</span></h2>
          </div>
          <div className="resume-grid">
            {/* Formation */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1.4rem" }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#1e4dd8,#00b7ff)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14 }}><i className="fa-solid fa-graduation-cap"></i></div>
                <h3 style={{ fontSize:17, fontWeight:700, color:"#fff" }}>Formation</h3>
              </div>
              {[
                { y:"2026 — présent (en cours)", t:"École Nationale de l'Informatique", s:"Master II en Informatique", d:"Fianarantsoa, Madagascar" },
                { y:"2024 — 2025", t:"Licence en Informatique", s:"Mention Bien", d:"Fianarantsoa, Madagascar" },
                { y:"2020 — 2021", t:"Baccalauréat Série D", s:"Mention Assez Bien", d:"Tuléar, Madagascar" },
              ].map((item,i) => (
                <div key={i} className="neon-box" style={{ borderRadius:13, padding:"1rem 1.15rem", marginBottom:"0.7rem", borderLeft:"3px solid #1e4dd8", transition:"border-color .2s" }}>
                  <span style={{ fontSize:10, fontFamily:"'Fira Code',monospace", color:"#00b7ff", fontWeight:600 }}>{item.y}</span>
                  <div style={{ fontSize:13, fontWeight:700, color:"#f1f5f9", margin:"4px 0 2px" }}>{item.t}</div>
                  <div style={{ fontSize:12, color:"#7eb3ff" }}>{item.s}</div>
                  <div style={{ fontSize:11, color:"#2d4272", marginTop:1 }}>{item.d}</div>
                </div>
              ))}
            </div>

            {/* Expérience */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1.4rem" }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#00b7ff,#1e4dd8)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14 }}><i className="fa-solid fa-briefcase"></i></div>
                <h3 style={{ fontSize:17, fontWeight:700, color:"#fff" }}>Expérience</h3>
              </div>
              {[
                { y:"Août–Oct. 2024", t:"Développeur Fullstack", c:"E-Work Pro — France (Remote)", s:"Django · React · PostgreSQL" },
                { y:"Sept.–Oct. 2023", t:"Développeur Web", c:"Softlab SARLU — Antananarivo", s:"PHP · CodeIgniter · MySQL" },
                { y:"Oct. 2025", t:"Projet de fin d'études", c:"École Nationale de l'Informatique", s:"Flask · Python · PostgreSQL" },
              ].map((item,i) => (
                <div key={i} className="neon-box" style={{ borderRadius:13, padding:"1rem 1.15rem", marginBottom:"0.7rem", borderLeft:"3px solid #00b7ff", transition:"border-color .2s" }}>
                  <span style={{ fontSize:10, fontFamily:"'Fira Code',monospace", color:"#00b7ff", fontWeight:600 }}>{item.y}</span>
                  <div style={{ fontSize:13, fontWeight:700, color:"#f1f5f9", margin:"4px 0 2px" }}>{item.t}</div>
                  <div style={{ fontSize:12, color:"#7eb3ff" }}>{item.c}</div>
                  <div style={{ fontSize:11, color:"#2d4272", marginTop:1 }}>{item.s}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
            {btn("Télécharger le CV complet", "fa-solid fa-download", downloadCV, true)}
          </div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" className="section contact" style={{ position:"relative", zIndex:1, flexDirection:"column", alignItems:"flex-start" }}>
        <div className="section-inner" style={{ maxWidth:980, margin:"0 auto", width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".2em", color:"#00b7ff" }}>Contact</span>
            <h2 className="section-title" style={{ marginTop:8 }}>Me <span className="highlight">contacter</span></h2>
            <p style={{ color:"#3d5a96", fontSize:13, marginTop:6 }}>Disponible pour missions freelance, alternances ou opportunités full-time.</p>
          </div>

          <div className="contact-grid">
            {/* Info */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.8rem" }}>
              {[
                ["fa-solid fa-envelope","Email","evondrayfalesonv@gmail.com","mailto:evondrayfalesonv@gmail.com","#00b7ff"],
                ["fa-solid fa-phone","Téléphone","+261 33 89 601 08","tel:+261338960108","#22c55e"],
                ["fa-solid fa-location-dot","Adresse","Rte Circulaire, Fianarantsoa 301",null,"#f59e0b"],
              ].map(([ic,lb,vl,hr,cl]) => {
                const El = hr ? "a" : "div";
                return (
                  <El key={lb} href={hr} style={{ display:"flex", alignItems:"center", gap:12, padding:"0.9rem 1.1rem", borderRadius:13, background:"rgba(14,28,64,0.5)", border:"1px solid rgba(99,149,255,0.15)", textDecoration:"none", transition:"border-color .2s" }}
                    onMouseEnter={e=>{ if(hr) e.currentTarget.style.borderColor=cl+"44"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(99,149,255,0.15)"; }}
                  >
                    <div style={{ width:40, height:40, borderRadius:11, background:cl+"14", border:`1px solid ${cl}30`, display:"flex", alignItems:"center", justifyContent:"center", color:cl, fontSize:15, flexShrink:0 }}>
                      <i className={ic}></i>
                    </div>
                    <div>
                      <div style={{ fontSize:9, color:"#2d4272", fontWeight:700, textTransform:"uppercase", letterSpacing:".1em" }}>{lb}</div>
                      <div style={{ fontSize:12.5, color:"#94a3b8", fontWeight:500, marginTop:2 }}>{vl}</div>
                    </div>
                  </El>
                );
              })}

              <div style={{ display:"flex", gap:9, marginTop:4 }}>
                {[["fa-brands fa-github","https://github.com/ValerioFaleson"],["fa-brands fa-linkedin-in","https://www.linkedin.com/in/faleson-val%C3%A9rio-evondray-737640359/?skipRedirect=true"],["fa-brands fa-x-twitter","https://x.com/evondray11733"]].map(([ic,hr]) => (
                  <a key={ic} href={hr} target="_blank" rel="noopener noreferrer" style={{ width:40, height:40, borderRadius:11, background:"rgba(14,28,64,0.5)", border:"1px solid rgba(99,149,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", color:"#2d4272", fontSize:15, textDecoration:"none", transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.color="#00b7ff"; e.currentTarget.style.borderColor="#00b7ff44"; e.currentTarget.style.background="rgba(0,183,255,.1)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.color="#2d4272"; e.currentTarget.style.borderColor="rgba(99,149,255,0.15)"; e.currentTarget.style.background="rgba(14,28,64,0.5)"; }}
                  ><i className={ic}></i></a>
                ))}
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={submit} className="neon-box" style={{ borderRadius:20, padding:"1.7rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
              <div className="contact-form-grid">
                {[["name","Nom","Votre nom","text"],["email","Email","votre@email.com","email"]].map(([k,lb,ph,t]) => (
                  <div key={k}>
                    <label style={{ display:"block", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#2d4272", marginBottom:5 }}>{lb}</label>
                    <input
                      type={t}
                      name={k === "name" ? "from_name" : "from_email"}
                      required
                      placeholder={ph}
                      value={form[k]}
                      onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display:"block", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#2d4272", marginBottom:5 }}>Sujet</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Objet du message"
                  value={form.subject}
                  onChange={e=>setForm(p=>({...p,subject:e.target.value}))}
                />
              </div>
              <div>
                <label style={{ display:"block", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#2d4272", marginBottom:5 }}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre projet…"
                  value={form.message}
                  onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  style={{ resize:"vertical" }}
                />
              </div>
              <button type="submit" disabled={sending} style={{
                padding:"13px", borderRadius:11, fontWeight:700, fontSize:14,
                background: sent ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#1e4dd8,#00b7ff)",
                color:"#fff", border:"none", cursor: sending ? "not-allowed" : "pointer",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                boxShadow: sent ? "0 0 20px rgba(34,197,94,.3)" : "0 0 20px rgba(0,183,255,.2)",
                opacity: sending ? 0.8 : 1,
                transition:"all .3s",
              }}>
                {sending ? <><i className="fa-solid fa-spinner fa-spin"></i> Envoi…</> : sent ? <><i className="fa-solid fa-circle-check"></i> Envoyé !</> : <><i className="fa-solid fa-paper-plane"></i> Envoyer le message</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer className="footer" style={{ borderTop:"1px solid rgba(99,149,255,0.1)", padding:"1.4rem 2rem 1.4rem 5.5rem", background:"rgba(4,9,22,0.85)", backdropFilter:"blur(10px)", position:"relative", zIndex:1 }}>
        <span style={{ fontFamily:"'Fira Code',monospace", fontSize:15, fontWeight:700, color:"#1e4dd8" }}>FV<span style={{color:"#00b7ff"}}>.</span></span>
        <p style={{ fontSize:11, color:"#1e2d4a" }}>© 2025 Faleson Valério · Conçu avec <span style={{color:"#00b7ff"}}>♥</span> à Madagascar</p>
        <div style={{ display:"flex", gap:7 }}>
          {[["fa-brands fa-github","https://github.com/ValerioFaleson"],["fa-brands fa-linkedin-in","https://www.linkedin.com/in/faleson-val%C3%A9rio-evondray-737640359/?skipRedirect=true"]].map(([ic,hr]) => (
            <a key={ic} href={hr} target="_blank" rel="noopener noreferrer" style={{ width:30, height:30, borderRadius:8, background:"rgba(30,77,216,0.15)", border:"1px solid rgba(99,149,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", color:"#2d4272", fontSize:12, textDecoration:"none", transition:"all .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="#00b7ff"; e.currentTarget.style.borderColor="#00b7ff44"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="#2d4272"; e.currentTarget.style.borderColor="rgba(99,149,255,0.15)"; }}
            ><i className={ic}></i></a>
          ))}
        </div>
      </footer>
    </div>
  );
}