import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight, ArrowUpRight, Download, Eye, Languages, Link2,
  Mail, MapPin, Menu, MessageCircle, Moon, Phone, Sun, X, Zap
} from "lucide-react";
import { content, tools } from "./content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CONTACT = {
  email: "walid.mohamed.aboelezz@gmail.com",
  phone: "+966575060395",
  linkedin: "https://linkedin.com/in/walid-abo-el-ezz-59195a24a"
};

const EXPERTISE_IMAGES = [
  "/power-distribution.webp",
  "/electrical-design.webp",
  "/site-engineering.webp",
  "/low-current-systems.webp"
];

function SectionHeading({ label, title, intro }) {
  return (
    <div className="section-heading reveal">
      <p className="section-label">{label}</p>
      <div>
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
    </div>
  );
}

function ProjectVisual({ type }) {
  if (type === "power") {
    return (
      <svg viewBox="0 0 800 480" role="img" aria-label="Power distribution engineering diagram">
        <path className="visual-grid" d="M0 80H800M0 160H800M0 240H800M0 320H800M0 400H800M100 0V480M200 0V480M300 0V480M400 0V480M500 0V480M600 0V480M700 0V480" />
        <path className="visual-line" d="M90 240H220M280 240H400V130H540M400 240V350H540M600 130H710M600 350H710" />
        <circle className="visual-node" cx="250" cy="240" r="30" />
        <rect className="visual-box" x="540" y="95" width="60" height="70" rx="8" />
        <rect className="visual-box" x="540" y="315" width="60" height="70" rx="8" />
        <text x="72" y="218">MAIN</text><text x="225" y="247">TX</text><text x="530" y="83">DB-01</text><text x="530" y="303">DB-02</text>
      </svg>
    );
  }
  if (type === "lowcurrent") {
    return (
      <svg viewBox="0 0 800 480" role="img" aria-label="Low current systems network diagram">
        <path className="visual-grid" d="M0 120H800M0 240H800M0 360H800M160 0V480M320 0V480M480 0V480M640 0V480" />
        <path className="visual-line" d="M400 240L180 130M400 240L620 130M400 240L180 350M400 240L620 350" />
        <circle className="visual-node visual-node-fill" cx="400" cy="240" r="54" />
        <circle className="visual-node" cx="180" cy="130" r="34" /><circle className="visual-node" cx="620" cy="130" r="34" />
        <circle className="visual-node" cx="180" cy="350" r="34" /><circle className="visual-node" cx="620" cy="350" r="34" />
        <text x="375" y="247">RACK</text><text x="155" y="135">CCTV</text><text x="595" y="135">ACS</text><text x="155" y="355">PA</text><text x="595" y="355">LAN</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 800 480" role="img" aria-label="Medical facility electrical plan illustration">
      <path className="visual-grid" d="M0 80H800M0 160H800M0 240H800M0 320H800M0 400H800M100 0V480M200 0V480M300 0V480M400 0V480M500 0V480M600 0V480M700 0V480" />
      <path className="visual-plan" d="M105 80H695V400H105ZM105 225H695M320 80V400M535 80V400M180 225V400M620 225V400" />
      <path className="visual-line" d="M145 125H270M360 125H495M575 125H655M210 275H280M365 275H495M560 275H660M210 345H280M365 345H495M560 345H660" />
      <circle className="visual-node" cx="145" cy="125" r="8" /><circle className="visual-node" cx="360" cy="125" r="8" /><circle className="visual-node" cx="575" cy="125" r="8" />
      <text x="120" y="65">MEDICAL PARK / ELECTRICAL PLAN</text><text x="125" y="215">LV</text><text x="335" y="215">MV</text><text x="550" y="215">ELV</text>
    </svg>
  );
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("walid-lang") || "en");
  const [theme, setTheme] = useState(() => localStorage.getItem("walid-theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef(null);
  const heroSlot = useRef(null);
  const aboutSlot = useRef(null);
  const portrait = useRef(null);
  const t = content[lang];
  const isAr = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("walid-lang", lang);
    localStorage.setItem("walid-theme", theme);
  }, [lang, theme, isAr]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    gsap.from(".hero-enter", {
      y: 42,
      autoAlpha: 0,
      duration: 1.05,
      stagger: 0.1,
      ease: "power3.out"
    });

    gsap.utils.toArray(".reveal").forEach((item) => {
      gsap.from(item, {
        y: 54,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 84%", toggleActions: "play none none reverse" }
      });
    });

    gsap.utils.toArray(".stagger-grid").forEach((grid) => {
      gsap.from(grid.children, {
        y: 45,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: "play none none reverse" }
      });
    });

    mm.add(
      {
        desktop: "(min-width: 901px)",
        mobile: "(max-width: 900px)",
        reduce: "(prefers-reduced-motion: reduce)"
      },
      ({ conditions }) => {
        if (conditions.reduce) return;
        const measure = () => {
          const start = heroSlot.current.getBoundingClientRect();
          const end = aboutSlot.current.getBoundingClientRect();
          return { x: end.left - start.left, y: end.top - start.top };
        };
        gsap.to(portrait.current, {
          x: () => measure().x,
          y: () => measure().y,
          rotation: conditions.mobile ? 0 : (isAr ? 2 : -2),
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            endTrigger: "#about",
            start: "top top",
            end: "center center",
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });
      }
    );

    return () => mm.revert();
  }, { scope: root, dependencies: [lang], revertOnUpdate: true });

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  const toggleLanguage = () => {
    setLang((current) => current === "en" ? "ar" : "en");
    setMenuOpen(false);
  };

  const navItems = Object.entries(t.nav);

  return (
    <div className="site" ref={root}>
      <div className="noise" aria-hidden="true" />
      <header className="nav-wrap">
        <a className="brand" href="#hero" aria-label="Walid home">
          <span className="brand-mark"><Zap size={17} fill="currentColor" /></span>
          <span>Walid El-Metwaly</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <div className="nav-actions">
          <button className="control language-control" onClick={toggleLanguage} aria-label={t.language}>
            <Languages size={17} /><span>{t.language}</span>
          </button>
          <button className="control icon-control" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={t.theme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="control icon-control menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.close : t.menu}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className={`mobile-panel ${menuOpen ? "is-open" : ""}`}>
        {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowDownRight size={20} /></a>)}
        <button onClick={toggleLanguage}><Languages size={18} />{t.language}</button>
      </div>

      <main>
        <section className="hero" id="hero">
          <div className="circuit circuit-one" />
          <div className="hero-copy">
            <div className="eyebrow hero-enter"><span className="pulse" />{t.hero.eyebrow}</div>
            <h1 className="hero-enter">
              <span>{t.hero.titleA}</span>
              <em>{t.hero.titleB}</em>
            </h1>
            <p className="hero-intro hero-enter">{t.hero.intro}</p>
            <div className="hero-actions hero-enter">
              <a className="button primary-button" href="#expertise">{t.hero.cta}<ArrowDownRight size={19} /></a>
              <a className="text-link" href="#contact">{t.hero.contact}<ArrowUpRight size={18} /></a>
            </div>
          </div>

          <div className="hero-visual hero-enter">
            <div className="portrait-slot hero-slot" ref={heroSlot}>
              <span className="corner top-left" /><span className="corner bottom-right" />
            </div>
            <div className="visual-note"><span>03.18° N</span><span>46.71° E</span></div>
          </div>

          <div className="shared-portrait" ref={portrait}>
            <img src="/walid-portrait.webp" alt="Walid Mohamed El-Metwaly" fetchPriority="high" />
            <div className="portrait-shade" />
            <span className="portrait-index">01</span>
          </div>

          <div className="hero-bottom hero-enter">
            <span className="availability"><i />{t.hero.available}</span>
            <a href="#about">{t.hero.scroll}<ArrowDownRight size={16} /></a>
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-photo-wrap">
            <div className="portrait-slot about-slot" ref={aboutSlot} />
            <div className="about-badge"><Zap size={18} /><span>Electrical<br />Engineer</span></div>
          </div>
          <div className="about-content reveal">
            <p className="section-label">{t.about.label}</p>
            <h2>{t.about.title}</h2>
            <p className="large-copy">{t.about.text}</p>
            <div className="about-facts stagger-grid">
              {[t.about.location, t.about.degree, t.about.experience].map((fact, index) => (
                <div key={fact}><span>0{index + 1}</span><p>{fact}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="expertise section-pad" id="expertise">
          <SectionHeading label={t.expertise.label} title={t.expertise.title} intro={t.expertise.intro} />
          <div className="expertise-grid stagger-grid">
            {t.expertise.items.map((item, index) => (
              <article className="expertise-card" key={item.n}>
                <div className="expertise-image">
                  <img src={EXPERTISE_IMAGES[index]} alt={item.title} loading="eager" decoding="async" />
                  <span className="card-number">{item.n}</span>
                  <ArrowUpRight className="card-arrow" size={21} />
                </div>
                <div className="expertise-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="toolbelt reveal">
            <span>{t.expertise.tools}</span>
            <div>{tools.map((tool) => <b key={tool}>{tool}</b>)}</div>
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <SectionHeading label={t.projects.label} title={t.projects.title} intro={t.projects.intro} />
          <div className="projects-grid">
            {t.projects.items.map((project, index) => (
              <article className={`work-card work-card-${index + 1} reveal`} key={project.title}>
                <div className="work-visual"><ProjectVisual type={project.visual} /></div>
                <div className="work-info">
                  <span>{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                  <div>{project.tags.map((tag) => <b key={tag}>{tag}</b>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-pad" id="experience">
          <SectionHeading label={t.experience.label} title={t.experience.title} />
          <div className="timeline">
            {t.experience.roles.map((role, index) => (
              <article className="role reveal" key={role.company}>
                <div className="role-index">0{index + 1}</div>
                <div className="role-main"><p className="role-tag">{role.tag}</p><h3>{role.role}</h3><h4>{role.company}</h4></div>
                <p className="role-text">{role.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="education section-pad" id="education">
          <SectionHeading label={t.education.label} title={t.education.title} />
          <div className="education-layout">
            <article className="degree-card reveal">
              <span className="degree-year">{t.education.date}</span>
              <div><p>{t.education.school}</p><h3>{t.education.degree}</h3><strong>{t.education.grade}</strong></div>
              <Zap size={38} />
            </article>
            <article className="project-card reveal">
              <p className="section-label">{t.education.project}</p>
              <h3>{t.education.projectTitle}</h3>
              <p>{t.education.projectText}</p>
              <div className="project-lines"><span /><span /><span /></div>
            </article>
            <div className="training reveal">
              <p className="section-label">{t.education.training}</p>
              <ol>{t.education.certificates.map((certificate) => <li key={certificate}>{certificate}<ArrowUpRight size={16} /></li>)}</ol>
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-glow" />
          <p className="section-label reveal">{t.contact.label}</p>
          <h2 className="reveal">{t.contact.title}</h2>
          <p className="contact-copy reveal">{t.contact.text}</p>
          <div className="contact-links">
            <a href={`mailto:${CONTACT.email}`}><Mail size={20} /><span>{t.contact.email}<small>{CONTACT.email}</small></span><ArrowUpRight /></a>
            <a href={`tel:${CONTACT.phone}`}><Phone size={20} /><span>{t.contact.phone}<small>{CONTACT.phone}</small></span><ArrowUpRight /></a>
            <a href={`https://wa.me/${CONTACT.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageCircle size={20} /><span>{t.contact.whatsapp}<small>{CONTACT.phone}</small></span><ArrowUpRight /></a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Link2 size={20} /><span>{t.contact.linkedin}<small>Connect professionally</small></span><ArrowUpRight /></a>
            <a href="/Walid-Mohamed-El-Metwaly-CV.pdf" target="_blank" rel="noreferrer"><Eye size={20} /><span>{t.contact.cvView}<small>PDF · 2 pages</small></span><ArrowUpRight /></a>
            <a href="/Walid-Mohamed-El-Metwaly-CV.pdf" download><Download size={20} /><span>{t.contact.cv}<small>PDF · 2 pages</small></span><ArrowDownRight /></a>
          </div>
          <div className="contact-location reveal"><MapPin size={18} />{t.contact.location}</div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#hero"><span className="brand-mark"><Zap size={16} fill="currentColor" /></span><span>Walid El-Metwaly</span></a>
        <p>{t.footer}<small>— {t.footerAuthor}</small></p>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

export default App;
