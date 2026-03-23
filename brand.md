# ValiaDigital — Guía de Desarrollo HTML

## Información de Marca

**Nombre:** ValiaDigital  
**Tagline:** Innovación tecnológica para PyMEs  
**Propósito:** Transformar procesos de pequeñas y medianas empresas mediante creatividad, marketing digital y desarrollo tecnológico.

---

## Identidad Visual

### Logo
- Elemento distintivo: **"V" estilizada con punto** en azul `#4BA3D4`
- Tipografía: `"Valia"` en bold + `"Digital"` en regular, ambas en negro `#0D0D0D`
- Usar sobre fondo claro: versión estándar
- Usar sobre fondo oscuro: texto en blanco `#F0F8FF`, "V" mantiene azul

### Paleta de Colores

| Variable CSS | Hex | Uso |
|---|---|---|
| `--color-brand` | `#4BA3D4` | Color principal, logo, links, acentos |
| `--color-brand-dark` | `#0A2540` | Fondos oscuros, headers, footer |
| `--color-brand-hover` | `#3a8fc0` | Hover de botones y links |
| `--color-accent` | `#00C49A` | Teal, CTAs secundarios, highlights |
| `--color-dark` | `#0D0D0D` | Texto principal, negro tipografía |
| `--color-navy` | `#061729` | Footer, secciones muy oscuras |
| `--color-light-bg` | `#F5F7FA` | Fondo gris muy suave, secciones alternas |
| `--color-white` | `#FFFFFF` | Fondos blancos, tarjetas |
| `--color-text-secondary` | `#666666` | Texto secundario, descripciones |
| `--color-text-muted` | `#7BA7CC` | Texto sobre fondos oscuros |
| `--color-border` | `#EAECF0` | Bordes de tarjetas y divisores |

### Tipografía

```html
<!-- Importar en <head> -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| Títulos principales | Syne | 800 | H1, H2, nombre del logo |
| Títulos secundarios | Syne | 700 | H3, nombres de servicios |
| Cuerpo de texto | DM Sans | 400 | Párrafos, descripciones |
| Texto ligero | DM Sans | 300 | Subtítulos, texto muted |
| Énfasis | DM Sans | 500 | Labels, botones, eyebrows |

---

## Variables CSS Base

```css
:root {
  --color-brand: #4BA3D4;
  --color-brand-dark: #0A2540;
  --color-brand-hover: #3a8fc0;
  --color-accent: #00C49A;
  --color-dark: #0D0D0D;
  --color-navy: #061729;
  --color-light-bg: #F5F7FA;
  --color-white: #FFFFFF;
  --color-text-secondary: #666666;
  --color-text-muted: #7BA7CC;
  --color-border: #EAECF0;

  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --shadow-card: 0 4px 20px rgba(75, 163, 212, 0.1);
  --transition: all 0.2s ease;
}
```

---

## Estructura de Secciones

El sitio alterna secciones oscuras y claras para crear ritmo visual.

```
1. NAV          → Fondo blanco, sticky
2. HERO         → Fondo oscuro (#0A2540) ← MÁS IMPORTANTE
3. SERVICIOS    → Fondo blanco
4. PROCESO      → Fondo oscuro (#0A2540)
5. CLIENTES     → Fondo gris suave (#F5F7FA)
6. CTA FINAL    → Fondo azul marca (#4BA3D4)
7. FOOTER       → Fondo muy oscuro (#061729)
```

---

## 1. Navegación (NAV)

```html
<nav class="nav">
  <!-- Logo -->
  <div class="nav-logo">
    <svg width="28" height="28" viewBox="0 0 72 72" fill="none">
      <circle cx="16" cy="16" r="8" fill="#4BA3D4"/>
      <line x1="22" y1="22" x2="56" y2="64"
            stroke="#4BA3D4" stroke-width="10" stroke-linecap="round"/>
    </svg>
    <span class="nav-wordmark">
      <span class="nav-v">V</span>alia <span class="nav-digital">Digital</span>
    </span>
  </div>

  <!-- Links -->
  <div class="nav-links">
    <a href="#servicios">Servicios</a>
    <a href="#proceso">Proceso</a>
    <a href="#clientes">Casos de éxito</a>
    <a href="#nosotros">Nosotros</a>
    <button class="btn-primary">Hablemos →</button>
  </div>
</nav>
```

```css
.nav {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  padding: 0 40px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-wordmark {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 18px;
  color: var(--color-dark);
  letter-spacing: -0.02em;
}

.nav-v { color: var(--color-brand); }

.nav-digital {
  font-weight: 400;
}

.nav-links a {
  font-size: 14px;
  color: #555;
  text-decoration: none;
  transition: var(--transition);
}

.nav-links a:hover { color: var(--color-dark); }
```

---

## 2. Hero (Sección Principal — Oscura)

```html
<section class="hero" id="inicio">
  <div class="hero-inner">
    <!-- Tag superior -->
    <div class="hero-tag">
      <span class="hero-tag-dot"></span>
      Innovación tecnológica para PyMEs
    </div>

    <!-- Título principal -->
    <h1 class="hero-title">
      Tu empresa merece
      <span class="text-brand">tecnología</span>
      que <span class="text-accent">funcione</span>
    </h1>

    <!-- Subtítulo -->
    <p class="hero-sub">
      Transformamos los procesos de pequeñas y medianas empresas
      mediante creatividad, marketing digital y desarrollo tecnológico a medida.
    </p>

    <!-- Botones -->
    <div class="hero-btns">
      <a href="#servicios" class="btn-primary">Conoce nuestros servicios →</a>
      <a href="#clientes" class="btn-outline">Ver casos de éxito</a>
    </div>

    <!-- Estadísticas -->
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-num">+50<span class="stat-accent">.</span></span>
        <span class="stat-label">PyMEs transformadas</span>
      </div>
      <div class="stat">
        <span class="stat-num">3<span class="stat-accent">x</span></span>
        <span class="stat-label">ROI promedio</span>
      </div>
      <div class="stat">
        <span class="stat-num">98<span class="stat-accent">%</span></span>
        <span class="stat-label">Clientes satisfechos</span>
      </div>
      <div class="stat">
        <span class="stat-num">5<span class="stat-accent">+</span></span>
        <span class="stat-label">Años de experiencia</span>
      </div>
    </div>
  </div>
</section>
```

```css
.hero {
  background: var(--color-brand-dark);
  padding: 80px 40px 90px;
  position: relative;
  overflow: hidden;
}

/* Efecto de brillo de fondo */
.hero::before {
  content: '';
  position: absolute;
  top: -120px; right: -80px;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(75, 163, 212, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -80px; left: 20%;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(0, 196, 154, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.hero-inner { max-width: 680px; position: relative; z-index: 1; }

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(75, 163, 212, 0.12);
  border: 1px solid rgba(75, 163, 212, 0.25);
  color: var(--color-brand);
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 28px;
  letter-spacing: 0.05em;
}

.hero-tag-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-brand);
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 48px;
  color: #F0F8FF;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}

.text-brand { color: var(--color-brand); }
.text-accent { color: var(--color-accent); }

.hero-sub {
  font-size: 16px;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 40px;
  font-weight: 300;
}

.hero-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

.hero-stats {
  display: flex;
  gap: 48px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  flex-wrap: wrap;
}

.stat-num {
  display: block;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 32px;
  color: #F0F8FF;
  letter-spacing: -0.02em;
}

.stat-accent { color: var(--color-brand); }

.stat-label {
  display: block;
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 4px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

---

## 3. Servicios (Sección Clara)

```html
<section class="servicios" id="servicios">
  <div class="section-inner">
    <p class="section-eyebrow">Lo que hacemos</p>
    <h2 class="section-title">Soluciones que impulsan tu negocio</h2>
    <p class="section-sub">
      Identificamos oportunidades de mejora y las convertimos en
      resultados concretos mediante tecnología y creatividad.
    </p>

    <div class="servicios-grid">

      <div class="servicio-card">
        <div class="servicio-icon icon-blue">📊</div>
        <h3 class="servicio-title">Marketing Digital</h3>
        <p class="servicio-desc">
          Estrategias creativas que conectan tu marca con el
          cliente correcto en el momento exacto.
        </p>
        <a href="#" class="servicio-link">Saber más →</a>
      </div>

      <div class="servicio-card">
        <div class="servicio-icon icon-teal">⚙️</div>
        <h3 class="servicio-title">Automatización de Procesos</h3>
        <p class="servicio-desc">
          Eliminamos tareas repetitivas para que tu equipo
          se enfoque en lo que realmente importa.
        </p>
        <a href="#" class="servicio-link">Saber más →</a>
      </div>

      <div class="servicio-card">
        <div class="servicio-icon icon-navy">💻</div>
        <h3 class="servicio-title">Desarrollo Tecnológico</h3>
        <p class="servicio-desc">
          Soluciones digitales a medida: webs, apps y sistemas
          que se adaptan a tu operación.
        </p>
        <a href="#" class="servicio-link">Saber más →</a>
      </div>

    </div>
  </div>
</section>
```

```css
.servicios {
  background: var(--color-white);
  padding: 80px 40px;
}

.section-eyebrow {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-brand);
  font-weight: 500;
  margin-bottom: 12px;
}

.section-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 32px;
  color: var(--color-brand-dark);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.section-sub {
  font-size: 15px;
  color: var(--color-text-secondary);
  margin-bottom: 40px;
  max-width: 460px;
  line-height: 1.7;
  font-weight: 300;
}

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.servicio-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  background: #FAFBFC;
  transition: var(--transition);
  cursor: pointer;
}

.servicio-card:hover {
  border-color: var(--color-brand);
  box-shadow: var(--shadow-card);
  transform: translateY(-3px);
}

.servicio-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  font-size: 20px;
}

.icon-blue  { background: rgba(75, 163, 212, 0.1); }
.icon-teal  { background: rgba(0, 196, 154, 0.1); }
.icon-navy  { background: rgba(10, 37, 64, 0.08); }

.servicio-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--color-brand-dark);
  margin-bottom: 10px;
}

.servicio-desc {
  font-size: 13px;
  color: #888;
  line-height: 1.7;
  font-weight: 300;
}

.servicio-link {
  display: inline-block;
  font-size: 12px;
  color: var(--color-brand);
  font-weight: 500;
  margin-top: 16px;
  text-decoration: none;
  transition: var(--transition);
}

.servicio-link:hover { color: var(--color-brand-hover); }
```

---

## 4. Proceso (Sección Oscura)

```html
<section class="proceso" id="proceso">
  <div class="section-inner">
    <p class="section-eyebrow" style="color: var(--color-accent);">Cómo trabajamos</p>
    <h2 class="section-title" style="color: #F0F8FF;">Un proceso claro, resultados medibles</h2>
    <p class="section-sub">Sin tecnicismos, sin sorpresas. Trabajamos contigo en cada etapa.</p>

    <div class="proceso-steps">

      <div class="proceso-step">
        <p class="step-num">01 — DIAGNÓSTICO</p>
        <h3 class="step-title">Entendemos tu negocio</h3>
        <p class="step-desc">
          Analizamos tus procesos actuales e identificamos
          oportunidades de mejora reales.
        </p>
      </div>

      <div class="proceso-step">
        <p class="step-num">02 — ESTRATEGIA</p>
        <h3 class="step-title">Diseñamos la solución</h3>
        <p class="step-desc">
          Creamos un plan tecnológico adaptado a tu presupuesto
          y objetivos de negocio.
        </p>
      </div>

      <div class="proceso-step">
        <p class="step-num">03 — EJECUCIÓN</p>
        <h3 class="step-title">Implementamos juntos</h3>
        <p class="step-desc">
          Desarrollamos e implementamos con acompañamiento
          continuo y comunicación clara.
        </p>
      </div>

      <div class="proceso-step">
        <p class="step-num">04 — RESULTADOS</p>
        <h3 class="step-title">Medimos el impacto</h3>
        <p class="step-desc">
          Monitoreamos y optimizamos para garantizar que los
          resultados superen las expectativas.
        </p>
      </div>

    </div>
  </div>
</section>
```

```css
.proceso {
  background: var(--color-brand-dark);
  padding: 80px 40px;
}

.proceso-steps {
  display: flex;
  gap: 0;
  margin-top: 48px;
}

.proceso-step {
  flex: 1;
  padding: 0 24px;
  position: relative;
}

.proceso-step:first-child { padding-left: 0; }
.proceso-step:last-child  { padding-right: 0; }

/* Separador entre pasos */
.proceso-step::after {
  content: '→';
  position: absolute;
  right: -8px; top: 16px;
  color: rgba(75, 163, 212, 0.35);
  font-size: 18px;
}
.proceso-step:last-child::after { display: none; }

.step-num {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--color-brand);
  letter-spacing: 0.1em;
  font-weight: 500;
  margin-bottom: 12px;
}

.step-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: #F0F8FF;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.7;
  font-weight: 300;
}
```

---

## 5. Clientes / Social Proof (Sección Clara)

```html
<section class="clientes" id="clientes">
  <p class="clientes-eyebrow">Empresas que ya dieron el salto</p>
  <div class="clientes-logos">
    <div class="cliente-pill">EMPRESA A</div>
    <div class="cliente-pill">EMPRESA B</div>
    <div class="cliente-pill">EMPRESA C</div>
    <div class="cliente-pill">EMPRESA D</div>
    <div class="cliente-pill">EMPRESA E</div>
  </div>
</section>
```

```css
.clientes {
  background: var(--color-light-bg);
  padding: 56px 40px;
  text-align: center;
}

.clientes-eyebrow {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 28px;
}

.clientes-logos {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cliente-pill {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  color: #B0BCC8;
  letter-spacing: 0.06em;
}
```

---

## 6. CTA Final (Fondo Azul Marca)

```html
<section class="cta-final">
  <div class="cta-inner">
    <h2 class="cta-title">¿Listo para transformar tu empresa?</h2>
    <p class="cta-sub">
      Agenda una consulta gratuita y descubre qué
      tecnología necesita tu negocio.
    </p>
    <a href="#contacto" class="btn-white">Agendar consulta gratuita →</a>
  </div>
</section>
```

```css
.cta-final {
  background: var(--color-brand);
  padding: 72px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-final::before {
  content: '';
  position: absolute;
  top: -60px; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  pointer-events: none;
}

.cta-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 30px;
  color: var(--color-white);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.cta-sub {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 32px;
  font-weight: 300;
}
```

---

## 7. Footer (Muy Oscuro)

```html
<footer class="footer">
  <div class="footer-logo">
    <svg width="20" height="20" viewBox="0 0 72 72" fill="none">
      <circle cx="16" cy="16" r="8" fill="#4BA3D4"/>
      <line x1="22" y1="22" x2="56" y2="64"
            stroke="#4BA3D4" stroke-width="10" stroke-linecap="round"/>
    </svg>
    <span class="footer-wordmark">
      <span style="color:#4BA3D4;">V</span>alia Digital
    </span>
  </div>
  <span class="footer-copy">© 2026 ValiaDigital — Todos los derechos reservados</span>
  <nav class="footer-links">
    <a href="#">Privacidad</a>
    <a href="#">Términos</a>
    <a href="#">Contacto</a>
  </nav>
</footer>
```

```css
.footer {
  background: var(--color-navy);
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-wordmark {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 15px;
  color: #F0F8FF;
}

.footer-copy {
  font-size: 12px;
  color: #3d5a73;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  font-size: 12px;
  color: #3d5a73;
  text-decoration: none;
  transition: var(--transition);
}

.footer-links a:hover { color: var(--color-text-muted); }
```

---

## Componentes Globales (Botones)

```css
/* Botón primario — azul sólido */
.btn-primary {
  background: var(--color-brand);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  padding: 13px 26px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: var(--transition);
}
.btn-primary:hover { background: var(--color-brand-hover); }

/* Botón outline — sobre fondos oscuros */
.btn-outline {
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  padding: 13px 26px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(75, 163, 212, 0.25);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: var(--transition);
}
.btn-outline:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}

/* Botón blanco — sobre fondo azul */
.btn-white {
  background: var(--color-white);
  color: var(--color-brand-dark);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  padding: 13px 28px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: var(--transition);
}
.btn-white:hover { opacity: 0.92; }
```

---

## Animaciones de Entrada

```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Aplicar con delays escalonados */
.hero-tag    { animation: fadeUp 0.4s ease both; }
.hero-title  { animation: fadeUp 0.5s 0.1s ease both; }
.hero-sub    { animation: fadeUp 0.5s 0.2s ease both; }
.hero-btns   { animation: fadeUp 0.5s 0.3s ease both; }
.hero-stats  { animation: fadeUp 0.5s 0.4s ease both; }
```

---

## Responsive — Breakpoints

```css
/* Tablet */
@media (max-width: 768px) {
  .nav-links { display: none; } /* Reemplazar con menú hamburguesa */

  .hero { padding: 48px 24px 60px; }
  .hero-title { font-size: 32px; }

  .servicios-grid { grid-template-columns: 1fr; }
  .proceso-steps  { flex-direction: column; gap: 32px; }
  .proceso-step::after { display: none; }

  .hero-stats { gap: 24px; }
  .footer { flex-direction: column; text-align: center; }
}

/* Mobile */
@media (max-width: 480px) {
  .hero-title { font-size: 26px; }
  .section-title { font-size: 24px; }
  .hero-btns { flex-direction: column; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); display: grid; }
}
```

---

## Estructura HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ValiaDigital — Innovación tecnológica para PyMEs</title>
  <meta name="description" content="Transformamos procesos de pequeñas y medianas empresas mediante creatividad, marketing digital y desarrollo tecnológico.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="nav"><!-- ... --></nav>
  <section class="hero" id="inicio"><!-- ... --></section>
  <section class="servicios" id="servicios"><!-- ... --></section>
  <section class="proceso" id="proceso"><!-- ... --></section>
  <section class="clientes" id="clientes"><!-- ... --></section>
  <section class="cta-final" id="contacto"><!-- ... --></section>
  <footer class="footer"><!-- ... --></footer>
  <script src="main.js"></script>
</body>
</html>
```

---

## Checklist de Desarrollo

- [ ] Importar fuentes Syne + DM Sans desde Google Fonts
- [ ] Definir variables CSS en `:root`
- [ ] Construir nav sticky con logo SVG
- [ ] Hero con efecto radial de fondo y animación fadeUp
- [ ] Grid de 3 servicios con hover effect
- [ ] Sección proceso en 4 columnas con separadores
- [ ] Logos de clientes (reemplazar placeholders)
- [ ] CTA final con botón blanco sobre azul
- [ ] Footer con tres columnas
- [ ] Responsive mobile/tablet
- [ ] Exportar favicon con solo la "V" estilizada
- [ ] Meta tags SEO básicos
- [ ] Favicon SVG de la "V"

---

*Documento generado para ValiaDigital — 2026*
