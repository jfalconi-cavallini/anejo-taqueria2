"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   MENU DATA  — edit here to update your menu
─────────────────────────────────────────────── */
const menuCategories = [
  {
    id: "brunch",
    label: "Brunch",
    emoji: "🌅",
    items: [
      { name: "Chilaquiles Rojos", price: "$13.99", desc: "Crispy tortilla chips in house red salsa, two eggs, cotija, crema & white onion." },
      { name: "Huevos Rancheros", price: "$12.99", desc: "Two fried eggs on warm corn tortillas, ranchero sauce, black beans & avocado." },
      { name: "Menudo", price: "$15.99", desc: "Traditional slow-cooked tripe soup with hominy, dried chiles & fresh garnishes." },
      { name: "Breakfast Tacos (3)", price: "$13.99", desc: "Scrambled egg with chorizo, bacon, or potato on fresh corn tortillas." },
    ],
  },
  {
    id: "tacos",
    label: "Tacos",
    emoji: "🌮",
    items: [
      { name: "Carne Asada", price: "$4.50", desc: "Grilled skirt steak, cilantro, diced onion on double corn tortillas." },
      { name: "Al Pastor", price: "$4.25", desc: "Spit-roasted pork with pineapple, achiote, cilantro & white onion." },
      { name: "Pollo Asado", price: "$4.00", desc: "Citrus-marinated grilled chicken, pico de gallo, avocado crema." },
      { name: "Birria Quesatacos", price: "$5.99", desc: "Braised beef birria in crispy cheese-fried tortilla with consommé for dipping." },
    ],
  },
  {
    id: "papas",
    label: "Papas",
    emoji: "🥔",
    items: [
      { name: "Papas Tradicionales", price: "$9.99", desc: "Golden fried potatoes tossed in house seasoning with jalapeños & cotija." },
      { name: "Papas Locas", price: "$12.99", desc: "Loaded fries with carne asada, guac, pico, jalapeños, crema & cotija." },
      { name: "Papa Fritas CS", price: "$8.99", desc: "Classic seasoned fries with our signature anejo dipping sauce." },
    ],
  },
  {
    id: "sides",
    label: "Sides",
    emoji: "🫘",
    items: [
      { name: "Elote Callejero", price: "$5.99", desc: "Mexican street corn with mayo, cotija, chile powder & lime." },
      { name: "Guacamole & Chips", price: "$8.99", desc: "Fresh hand-smashed avocado, tomato, cilantro, lime & house totopos." },
      { name: "Frijoles de Olla", price: "$4.99", desc: "Slow-simmered pinto beans with epazote, chorizo & fresh tortillas." },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    emoji: "🍮",
    items: [
      { name: "Churros con Cajeta", price: "$7.99", desc: "Hand-rolled cinnamon churros with house-made goat milk caramel dipping sauce." },
      { name: "Flan de la Casa", price: "$6.99", desc: "Classic Mexican flan with burnt orange caramel & candied citrus peel." },
      { name: "Tres Leches", price: "$8.99", desc: "Light sponge soaked in three milks, whipped cream & fresh berries." },
    ],
  },
];

/* ─────────────────────────────────────────────
   NAVBAR
─────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { href: "#menu", label: "Menu" },
    { href: "#about", label: "About" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(13,7,2,0.96)" : "linear-gradient(180deg, rgba(13,7,2,0.82) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,146,42,0.2)" : "none",
        transition: "all 0.35s ease",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "var(--nav-height)" }}>
          {/* Logo */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "0.65rem", zIndex: 10 }}>
            <Image src="/images/Anejo_logo.png" alt="Anejo Taqueria" width={44} height={44}
              style={{ objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(200,146,42,0.4))" }} priority />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.04em" }}>
              Anejo <span style={{ color: "var(--gold)" }}>Taqueria</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", alignItems: "center" }} className="desk-nav">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                  {l.label}
                </a>
              </li>
            ))}
            <li><a href="#order" className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.72rem" }}>Order Now</a></li>
          </ul>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu" className="ham-btn"
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px", zIndex: 10 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: "24px", height: "2px", background: "var(--cream)", borderRadius: "2px", transition: "all 0.3s",
                transform: i === 0 && mobileOpen ? "rotate(45deg) translate(5px,5px)" : i === 2 && mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: "var(--nav-height)", left: 0, right: 0, bottom: 0, zIndex: 999,
          background: "rgba(10,5,0,0.97)", backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(200,146,42,0.2)",
          animation: "slideDown 0.28s ease",
          display: "flex", flexDirection: "column", padding: "2rem 1.5rem", gap: "0.25rem",
        }}>
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "var(--cream)",
                padding: "0.6rem 0", borderBottom: "1px solid rgba(200,146,42,0.12)", display: "block",
                animation: `slideDown 0.3s ease ${i * 0.06}s both`,
              }}>
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: "1.5rem" }}>
            <a href="#order" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center" }} onClick={() => setMobileOpen(false)}>
              Order Now
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px)  { .desk-nav { display:none !important; } }
        @media (min-width: 769px)  { .ham-btn  { display:none !important; } }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO  — floral wall background + neon sign
─────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* ── Floral background image ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/background_image.png"
          alt="Floral background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          quality={90}
        />
        {/* Heavy dark overlay — keeps it moody like the template */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(8,3,0,0.72) 0%, rgba(8,3,0,0.55) 40%, rgba(8,3,0,0.78) 100%)",
        }} />
        {/* Radial vignette from edges */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(5,1,0,0.65) 100%)",
        }} />
      </div>

      {/* ── Content ── */}
      <div className="container" style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "2rem", textAlign: "center",
        paddingTop: "calc(var(--nav-height) + 3rem)",
        paddingBottom: "5rem",
      }}>

        {/* Logo — floats */}
        <div style={{ animation: "fadeUp 0.8s ease 0.1s both" }}>
          <Image
            src="/images/Anejo_logo.png"
            alt="Anejo Taqueria logo"
            width={200}
            height={200}
            style={{
              objectFit: "contain",
              animation: "floatY 5.5s ease-in-out infinite",
              filter: "drop-shadow(0 0 30px rgba(200,146,42,0.35)) drop-shadow(0 8px 24px rgba(0,0,0,0.8))",
            }}
            priority
          />
        </div>

        {/* Headline */}
        <div style={{ animation: "fadeUp 0.8s ease 0.3s both" }}>
          <span className="section-label" style={{ textAlign: "center" }}>EST. 2022 · Authentic Mexican Cuisine</span>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.2rem, 10vw, 7rem)",
            fontWeight: 900,
            color: "var(--cream)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)",
          }}>
            Craving<br />
            <span style={{ color: "var(--gold-light)", textShadow: "0 0 40px rgba(232,184,75,0.45)" }}>Tacos?</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
            color: "rgba(242,232,208,0.75)",
            marginTop: "0.8rem",
            fontWeight: 300,
            letterSpacing: "0.04em",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
          }}>
            Bold flavors. Real ingredients. Made with love.
          </p>
        </div>

        {/* Neon sign — the hero centrepiece */}
        <div style={{ animation: "fadeUp 0.8s ease 0.5s both, neonPulse 3.5s ease-in-out 1.5s infinite" }}>
          <Image
            src="/images/Neon_sign.png"
            alt="Feed me tacos and tell me I'm pretty"
            width={520}
            height={300}
            style={{
              objectFit: "contain",
              maxWidth: "min(520px, 88vw)",
              filter: "drop-shadow(0 0 25px rgba(80,140,255,0.6)) drop-shadow(0 0 70px rgba(255,60,60,0.25))",
            }}
          />
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.8s ease 0.7s both" }}>
          <a href="#menu" className="btn-outline">View Menu</a>
          <a href="#order" className="btn-primary">Order Online</a>
        </div>

        {/* Scroll cue */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", animation: "fadeIn 1s ease 1.8s both" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.28em", color: "rgba(176,149,110,0.7)", textTransform: "uppercase" }}>
            Scroll to explore
          </span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, var(--gold), transparent)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE STRIP
─────────────────────────────────────────────── */
function MarqueeStrip() {
  const words = ["Tacos", "Birria", "Chilaquiles", "Al Pastor", "Elote", "Menudo", "Churros", "Guacamole", "Papas Locas", "Tres Leches"];
  const items = [...words, ...words]; // duplicate for seamless loop

  return (
    <div style={{
      background: "linear-gradient(90deg, #6b0e0e 0%, var(--red) 50%, #6b0e0e 100%)",
      borderTop: "1px solid rgba(200,146,42,0.35)", borderBottom: "1px solid rgba(200,146,42,0.35)",
      overflow: "hidden", whiteSpace: "nowrap", padding: "0.65rem 0",
    }}>
      <div style={{ display: "inline-flex", animation: "marqueeScroll 24s linear infinite" }}>
        {items.map((w, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-display)", fontSize: "0.88rem", fontWeight: 700,
            color: "var(--cream)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 0.5rem",
          }}>
            {w}<span style={{ color: "var(--gold-light)", margin: "0 0.5rem" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MENU SECTION
─────────────────────────────────────────────── */
function MenuSection() {
  const [active, setActive] = useState("tacos");
  const cat = menuCategories.find(c => c.id === active)!;

  return (
    <section id="menu" style={{ background: "var(--bg-section)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      {/* Faint coat-of-arms watermark */}
      <div style={{ position: "absolute", right: "-4%", top: "4%", width: "480px", height: "580px", opacity: 0.04, pointerEvents: "none" }}>
        <Image src="/images/mexican_pic.png" alt="" fill style={{ objectFit: "contain" }} />
      </div>
      {/* Top gold rule */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">What We Serve</span>
          <h2 style={S.heading}>Our Menu</h2>
          <div className="divider-gold" />
          <p style={S.sub}>Every dish made fresh, every flavor bold. <em>¡Buen Provecho!</em></p>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          {menuCategories.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.55rem 1.3rem", borderRadius: "100px",
              fontFamily: "var(--font-body)", fontSize: "0.76rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              border: "1px solid",
              background: active === c.id ? "var(--red)" : "transparent",
              color: active === c.id ? "var(--cream)" : "var(--text-muted)",
              borderColor: active === c.id ? "var(--red)" : "rgba(200,146,42,0.2)",
              transition: "all 0.2s",
            }}>
              <span>{c.emoji}</span>{c.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div key={active} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
          {cat.items.map((item, i) => (
            <div key={item.name} style={{
              background: "rgba(22,12,4,0.82)", border: "1px solid rgba(200,146,42,0.14)",
              borderRadius: "8px", padding: "1.5rem",
              animation: `cardIn 0.4s ease ${i * 0.08}s both`,
              backdropFilter: "blur(4px)",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,42,0.4)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,42,0.14)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--cream)" }}>{item.name}</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 900, color: "var(--gold-light)", whiteSpace: "nowrap", marginLeft: "0.75rem" }}>{item.price}</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</p>
              <div style={{ marginTop: "1rem", height: "1px", background: "linear-gradient(90deg, var(--gold), transparent)" }} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="#order" className="btn-primary">Order Online — Full Menu Available</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT SECTION
─────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" style={{ padding: "6rem 0", background: "var(--bg-dark)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

      <div className="container">
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          {/* Image */}
          <div className="about-img-col" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div style={{
              position: "relative",
              background: "radial-gradient(ellipse at center, rgba(200,146,42,0.07) 0%, transparent 70%)",
              borderRadius: "12px", padding: "1.5rem",
            }}>
              {/* Corner accents */}
              {[
                { top: 0, left: 0, borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)", borderRadius: "4px 0 0 0" },
                { bottom: 0, right: 0, borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)", borderRadius: "0 0 4px 0" },
              ].map((s, i) => <div key={i} style={{ position: "absolute", width: "40px", height: "40px", ...s }} />)}
              <Image src="/images/mexican_pic.png" alt="Mexican heritage" width={400} height={500} style={{ objectFit: "contain", position: "relative", zIndex: 1 }} />
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="section-label">Our Story</span>
            <h2 style={{ ...S.heading, textAlign: "left", marginBottom: "1.25rem" }}>
              Born From<br /><span style={{ color: "var(--gold)" }}>Tradition</span>
            </h2>
            <div className="divider-gold" style={{ margin: "0 0 1.5rem" }} />
            {[
              "Anejo Taqueria was founded in 2022 with one mission — to bring the authentic, soulful flavors of Mexican street food right to your table. Every recipe is rooted in tradition, perfected over generations.",
              "We source fresh, local ingredients and prepare everything in-house daily. From slow-braised birria to hand-pressed tortillas, the love goes into every single plate.",
            ].map((p, i) => (
              <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1rem" }}>{p}</p>
            ))}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              <strong style={{ color: "var(--gold-light)" }}>&ldquo;Feed me tacos and tell me I&apos;m pretty.&rdquo;</strong> — that&apos;s not just our sign. It&apos;s our promise.
            </p>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[["2022", "Est."], ["100%", "Fresh Daily"], ["5★", "Rated"]].map(([n, l]) => (
                <div key={l} style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "1rem", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2.1rem", fontWeight: 900, color: "var(--gold-light)", lineHeight: 1 }}>{n}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: "0.25rem" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .about-grid{grid-template-columns:1fr!important;} .about-img-col{display:none!important;} }`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GALLERY SECTION
─────────────────────────────────────────────── */
function GallerySection() {
  return (
    <section id="gallery" style={{ padding: "6rem 0", background: "var(--bg-card)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">Our Vibe</span>
          <h2 style={S.heading}>Experience Anejo</h2>
          <div className="divider-gold" />
        </div>

        {/* Masonry-style grid */}
        <div className="gal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>

          {/* Neon sign — tall left tile */}
          <div style={{ ...S.galTile, gridRow: "1 / 3", minHeight: "440px", background: "#050200" }}>
            <Image src="/images/Neon_sign.png" alt="Feed me tacos neon sign" fill
              style={{ objectFit: "contain", padding: "2rem", filter: "drop-shadow(0 0 24px rgba(80,160,255,0.7))" }} />
            <div style={S.galOverlay}><span style={S.galLabel}>&ldquo;Feed Me Tacos&rdquo; — Our Neon Heart</span></div>
          </div>

          {/* Logo tile */}
          <div style={{ ...S.galTile, minHeight: "210px", background: "#0a0500" }}>
            <Image src="/images/Anejo_logo.png" alt="Anejo Taqueria Logo" fill
              style={{ objectFit: "contain", padding: "1.5rem" }} />
            <div style={S.galOverlay}><span style={S.galLabel}>Anejo Taqueria — EST. 2022</span></div>
          </div>

          {/* Floral background tile */}
          <div style={{ ...S.galTile, minHeight: "210px", overflow: "hidden" }}>
            <Image src="/images/background_image.png" alt="Our floral wall" fill
              style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.65) saturate(1.2)" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(8,3,0,0.4)" }} />
            <div style={S.galOverlay}><span style={S.galLabel}>The Anejo Atmosphere</span></div>
          </div>
        </div>

        {/* Quote tile — full width below */}
        <div style={{
          marginTop: "1rem", background: "var(--red)", borderRadius: "8px",
          padding: "3rem 2rem", textAlign: "center",
          border: "1px solid rgba(200,146,42,0.2)",
        }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 700, color: "var(--cream)", lineHeight: 1.3 }}>
            &ldquo;Real food. Real flavor. <span style={{ color: "var(--gold-pale)" }}>Real love.&rdquo;</span>
          </p>
        </div>
      </div>

      <style>{`@media(max-width:640px){ .gal-grid{grid-template-columns:1fr!important;} }`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ORDER CTA
─────────────────────────────────────────────── */
function OrderSection() {
  return (
    <section id="order" style={{ padding: "8rem 0", position: "relative", overflow: "hidden" }}>
      {/* Floral bg, heavily darkened */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image src="/images/background_image.png" alt="" fill
          style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.18) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,3,0,0.6)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Image src="/images/Anejo_logo.png" alt="Anejo Taqueria" width={90} height={90}
          style={{ objectFit: "contain", margin: "0 auto 1.5rem", filter: "drop-shadow(0 0 20px rgba(200,146,42,0.45))" }} />
        <span className="section-label" style={{ textAlign: "center" }}>Don&apos;t Wait</span>
        <h2 style={{ ...S.heading, fontSize: "clamp(2.5rem,7vw,5.5rem)", marginBottom: "1rem" }}>
          Order <span style={{ color: "var(--gold-light)" }}>Online</span><br />Now
        </h2>
        <p style={{ ...S.sub, maxWidth: "480px", margin: "0 auto 2.5rem" }}>
          Skip the wait. Get Anejo Taqueria delivered to your door or ready for pickup.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:+11234567890" className="btn-outline">📞 Call to Order</a>
          <a href="#" className="btn-gold" style={{ fontSize: "0.9rem", padding: "1rem 2.5rem" }}>Order Online →</a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
─────────────────────────────────────────────── */
function ContactSection() {
  const cards = [
    { icon: "📍", label: "Address", value: "7355 N Beach St Suite 161\nFort Worth, TX 76137", href: "https://maps.google.com" },
    { icon: "📞", label: "Phone", value: "(817) 773-9929", href: "tel:+18177739929" },
    { icon: "🕐", label: "Hours", value: "Mon–Fri: 11am – 9pm\nSat–Sun: 9am – 10pm", href: null },
    { icon: "📸", label: "Instagram", value: "@anejotaqueria", href: "https://instagram.com/anejotaqueria" },
  ];

  return (
    <section id="contact" style={{ padding: "6rem 0", background: "var(--bg-section)", borderTop: "1px solid rgba(200,146,42,0.15)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">Find Us</span>
          <h2 style={S.heading}>Come Visit</h2>
          <div className="divider-gold" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem" }}>
          {cards.map(c => (
            <div key={c.label} style={{
              background: "rgba(22,12,4,0.8)", border: "1px solid rgba(200,146,42,0.14)",
              borderRadius: "10px", padding: "2rem 1.5rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,42,0.4)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,42,0.14)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
            >
              <span style={{ fontSize: "2rem" }}>{c.icon}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>{c.label}</span>
              {c.href
                ? <a href={c.href} style={{ fontFamily: "var(--font-body)", fontSize: "0.94rem", color: "var(--cream)", whiteSpace: "pre-line", lineHeight: 1.6, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--cream)")}>{c.value}</a>
                : <span style={{ fontFamily: "var(--font-body)", fontSize: "0.94rem", color: "var(--cream)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{c.value}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "rgba(4,2,0,0.97)", borderTop: "1px solid rgba(200,146,42,0.2)", padding: "2rem 0" }}>
      <div className="container">
        <div className="footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <Image src="/images/Anejo_logo.png" alt="Anejo Taqueria" width={36} height={36} style={{ objectFit: "contain" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, color: "var(--cream)" }}>
              Anejo <span style={{ color: "var(--gold)" }}>Taqueria</span>
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--text-muted)", textAlign: "center" }}>
            © {new Date().getFullYear()} Anejo Taqueria. All rights reserved. EST. 2022.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            Feed me tacos and tell me I&apos;m pretty. 🌮
          </p>
        </div>
      </div>
      <style>{`@media(max-width:640px){ .footer-inner{flex-direction:column!important;align-items:center!important;text-align:center!important;} }`}</style>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   SHARED STYLE TOKENS
─────────────────────────────────────────────── */
const S = {
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2.4rem,6vw,4rem)",
    fontWeight: 900,
    color: "var(--cream)",
  } as React.CSSProperties,
  sub: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    color: "var(--text-muted)",
    marginTop: "0.75rem",
  } as React.CSSProperties,
  galTile: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(200,146,42,0.14)",
    cursor: "pointer",
  } as React.CSSProperties,
  galOverlay: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    padding: "1rem",
    background: "linear-gradient(0deg,rgba(0,0,0,0.75) 0%,transparent 100%)",
  } as React.CSSProperties,
  galLabel: {
    fontFamily: "var(--font-body)",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "var(--gold-pale)",
    textTransform: "uppercase",
  } as React.CSSProperties,
};

/* ─────────────────────────────────────────────
   PAGE EXPORT
─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <OrderSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}