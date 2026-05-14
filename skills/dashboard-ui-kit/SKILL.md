---
name: dashboard-ui-kit
description: >
  Skill para crear pantallas, componentes, páginas y layouts en HTML/CSS siguiendo el sistema de diseño estilo Mobbin: achromático, tipografía Inter con pesos fraccionarios, pills en elementos interactivos, cards con bordes sutiles sin sombra. Úsalo siempre que el usuario pida crear una pantalla, página, componente UI, hero section, galería, nav, tarjeta, formulario o cualquier elemento visual en HTML. También úsalo cuando digan "hazlo con el estilo del UI Kit", "crea una pantalla", "diseña un componente", "con nuestro sistema de diseño", o cuando el output deba seguir el estilo visual establecido. Si hay alguna duda sobre si usar este skill para generar HTML, úsalo.
---

# Mobbin-Style UI Kit — Guía de Implementación

Este skill define el sistema de diseño a usar al crear pantallas o componentes en HTML/CSS. El principio central es **restricción achromática total**: cero color, toda la jerarquía visual se construye únicamente con peso tipográfico, tamaño y tono de gris.

---

## Principios fundamentales

1. **Solo `#141414` como "color"** — cada acento UI, icono, botón activo y estado filled usa este negro puro. Nunca hues cromáticos.
2. **Pills en todo elemento interactivo** — `border-radius: 9999px` en botones, inputs, tags, chips de filtro. Los contenedores no interactivos usan 16–24px.
3. **Bordes en vez de sombras en cards** — `1px solid #ededed` diferencia las cards del fondo. Las sombras solo existen en dropdowns flotantes.
4. **Tipografía hace el trabajo del color** — Inter Variable con pesos fraccionarios (440, 456) como sustituto de la fuente propietaria 'saans'.

---

## CSS Custom Properties

Incluir siempre este bloque de variables al inicio de cada archivo:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

:root {
  /* ─── Colores ─── */
  --color-midnight-ink:  #141414;   /* texto primario, botones filled, iconos */
  --color-pure-canvas:   #ffffff;   /* fondo de página, cards, texto sobre dark */
  --color-graphite:      #707070;   /* texto secundario, subtítulos */
  --color-ash:           #adadad;   /* texto terciario, disabled, placeholders */
  --color-fog:           #ededed;   /* bordes de cards, divisores */
  --color-mist:          #f2f2f2;   /* fondo de inputs, nav tint, surfaces internas */
  --color-silver:        #c2c2c2;   /* skeleton loaders, fills inactivos */
  --color-slate-shadow:  #e0e0e0;   /* sombra inset de botón en hover */

  /* ─── Fuente ─── */
  --font-primary: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* ─── Escala tipográfica ─── */
  --text-caption:     12px;
  --text-body-sm:     14px;
  --text-body:        16px;
  --text-subheading:  20px;
  --text-heading:     32px;
  --text-heading-lg:  56px;
  --text-display:     80px;

  /* ─── Pesos ─── */
  --fw-regular:   400;
  --fw-ui:        440;   /* labels, nav, metadata de cards */
  --fw-mid:       456;   /* body medio, descripciones */
  --fw-semibold:  600;   /* headlines, CTAs */
  --fw-display:   652;   /* numerics hero, máximo énfasis */

  /* ─── Espaciado ─── */
  --spacing-8:    8px;
  --spacing-16:   16px;
  --spacing-24:   24px;
  --spacing-32:   32px;
  --spacing-40:   40px;
  --spacing-64:   64px;
  --spacing-80:   80px;
  --spacing-104:  104px;
  --spacing-120:  120px;

  /* ─── Border radius ─── */
  --radius-badge:       8px;     /* badges inline pequeños */
  --radius-thumbnail:   16px;    /* thumbnails, imágenes */
  --radius-card:        16px;    /* cards de contenido */
  --radius-card-lg:     24px;    /* modales, dropdowns */
  --radius-pill:        9999px;  /* botones, inputs, tags, chips */

  /* ─── Sombras ─── */
  --shadow-subtle: rgba(64, 64, 64, 0.16) 0px 0px 0px 1px inset;  /* hover de botón */
  --shadow-xl:     rgba(0, 0, 0, 0.04) 0px 8px 40px 0px;          /* dropdowns */

  /* ─── Layout ─── */
  --page-max-width: 1280px;
  --section-gap:    80px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-primary);
  font-size: var(--text-body-sm);
  font-weight: var(--fw-regular);
  color: var(--color-midnight-ink);
  background: var(--color-pure-canvas);
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "calt" 0, "dlig", "ss07";
}
```

---

## Tipografía

La tipografía es el único mecanismo de jerarquía. Aplicar `font-feature-settings: "calt" 0, "dlig", "ss07"` globalmente.

### Tabla de uso

| Rol | Tamaño | Peso | Line-height | Letter-spacing | Uso |
|-----|--------|------|-------------|----------------|-----|
| caption | 12px | 400 | 16px | +0.2px | Labels de categoría, badges, timestamps |
| body-sm | 14px | 400 | 20px | — | Metadata de cards, texto UI general |
| body | 16px | 440–456 | 22px | +0.21px | Texto de cuerpo, descripciones |
| subheading | 20px | 440–456 | 28px | +0.28px | Subtítulos de sección |
| heading | 32px | 600 | 42px | — | Títulos de sección |
| heading-lg | 56px | 600–652 | 63px | -0.39px | Headlines grandes |
| display | 80px | 652 | 80px | -0.88px | Hero display, numerics |

**Pesos fraccionarios con Inter:** usar `font-weight: 440` y `font-weight: 456` directamente — Inter Variable los interpola correctamente.

**Headlines display (56–80px):** siempre centrados, letter-spacing negativo obligatorio, peso 600–652.

---

## Componentes

### 1. Botón filled (CTA principal)
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  background: var(--color-midnight-ink);
  color: var(--color-pure-canvas);
  border: none;
  border-radius: var(--radius-pill);
  padding: 10px 20px;
  font-family: var(--font-primary);
  font-size: var(--text-body-sm);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  transition: box-shadow 0.15s ease;
  white-space: nowrap;
}
.btn-primary:hover {
  box-shadow: var(--shadow-subtle);
}
```

### 2. Botón outlined (acción secundaria)
```css
.btn-outlined {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--color-midnight-ink);
  border: 1px solid var(--color-midnight-ink);
  border-radius: var(--radius-pill);
  padding: 10px 20px;
  font-family: var(--font-primary);
  font-size: var(--text-body-sm);
  font-weight: var(--fw-ui);
  cursor: pointer;
}
```

### 3. Botón muted (filtros inactivos)
```css
.btn-muted {
  background: transparent;
  color: var(--color-ash);
  border: 1px solid var(--color-ash);
  border-radius: var(--radius-pill);
  padding: 6px 14px;
  font-size: var(--text-body-sm);
  font-weight: var(--fw-ui);
  cursor: pointer;
}
```

### 4. Pills de filtro / tabs
```css
/* Activo */
.filter-pill-active {
  background: var(--color-midnight-ink);
  color: var(--color-pure-canvas);
  border: none;
  border-radius: var(--radius-pill);
  padding: 6px 14px;
  font-size: var(--text-body-sm);
  font-weight: var(--fw-ui);
  cursor: pointer;
}
/* Inactivo */
.filter-pill {
  background: transparent;
  color: var(--color-midnight-ink);
  border: 1px solid var(--color-midnight-ink);
  border-radius: var(--radius-pill);
  padding: 6px 14px;
  font-size: var(--text-body-sm);
  font-weight: var(--fw-ui);
  cursor: pointer;
}
/* Row de pills */
.filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
```

### 5. Input de búsqueda
```css
.search-input {
  background: var(--color-mist);
  border: none;
  border-radius: var(--radius-pill);
  padding: 10px 16px;
  font-family: var(--font-primary);
  font-size: var(--text-body-sm);
  font-weight: var(--fw-regular);
  color: var(--color-midnight-ink);
  outline: none;
  width: 100%;
}
.search-input::placeholder {
  color: var(--color-ash);
}
```

### 6. Card de contenido
Diferenciada del fondo solo por el borde — nunca por sombra.
```css
.card {
  background: var(--color-pure-canvas);
  border: 1px solid var(--color-fog);
  border-radius: var(--radius-card);
  padding: var(--spacing-16);
  /* NUNCA box-shadow en cards */
}
.card-lg {
  border-radius: var(--radius-card-lg);
  padding: var(--spacing-24);
}
```

### 7. Badge / tag
```css
.badge {
  display: inline-flex;
  align-items: center;
  background: var(--color-midnight-ink);
  color: var(--color-pure-canvas);
  border-radius: var(--radius-pill);
  padding: 2px 8px;
  font-size: var(--text-caption);
  font-weight: var(--fw-semibold);
  white-space: nowrap;
}
.badge-muted {
  background: var(--color-mist);
  color: var(--color-graphite);
}
```

### 8. Nav bar (top navigation)
```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-pure-canvas);
  border-bottom: 1px solid var(--color-fog);
  height: 60px;
  padding: 0 var(--spacing-32);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  font-size: var(--text-body-sm);
  font-weight: var(--fw-semibold);
  color: var(--color-midnight-ink);
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: var(--spacing-32);
  list-style: none;
}
.nav-links a {
  font-size: var(--text-body-sm);
  font-weight: var(--fw-ui);
  color: var(--color-midnight-ink);
  text-decoration: none;
}
```

### 9. Dropdown / mega-menú flotante
El único lugar donde se usan sombras.
```css
.dropdown {
  background: var(--color-pure-canvas);
  border-radius: var(--radius-card-lg);
  padding: var(--spacing-24) var(--spacing-32);
  box-shadow: var(--shadow-xl);
}
```

### 10. Stat display (numerics hero)
```css
.stat-display {
  font-size: var(--text-display);    /* 80px */
  font-weight: 652;
  line-height: 1.00;
  letter-spacing: -0.88px;
  color: var(--color-midnight-ink);
  text-align: center;
}
.stat-label {
  font-size: var(--text-subheading);
  font-weight: var(--fw-ui);
  color: var(--color-graphite);
  text-align: center;
  margin-top: var(--spacing-8);
}
```

### 11. Link inline (sin pill)
```css
.link-inline {
  color: var(--color-midnight-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 2px;
  font-weight: var(--fw-ui);
  cursor: pointer;
  background: none;
  border: none;
}
```

---

## Surfaces y elevación

| Nivel | Color | Diferenciador | Uso |
|-------|-------|---------------|-----|
| 0 — Page | `#ffffff` | — | Fondo root de la página |
| 1 — Card | `#ffffff` | `border: 1px solid #ededed` | Gallery cards, testimonials |
| 2 — Input/Chip | `#f2f2f2` | Color de fondo | Search bars, nav tint, chips |
| 3 — Dropdown | `#ffffff` | `box-shadow: var(--shadow-xl)` | Mega-menú, paneles flotantes |

**Regla de oro:** las cards nunca tienen sombra. La sombra solo aparece en elementos que flotan sobre el contenido (nivel 3).

---

## Layout

```css
.page-container {
  max-width: var(--page-max-width);  /* 1280px */
  margin: 0 auto;
  padding: 0 var(--spacing-32);
}

.section {
  margin-bottom: var(--section-gap);  /* 80px entre secciones */
}

/* Grid de cards (galería) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-16);
}

/* Hero centrado */
.hero {
  text-align: center;
  padding: var(--spacing-80) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-24);
}
.hero h1 {
  font-size: var(--text-display);
  font-weight: 652;
  line-height: 1.00;
  letter-spacing: -0.88px;
  color: var(--color-midnight-ink);
  max-width: 800px;
}
.hero p {
  font-size: var(--text-subheading);
  font-weight: var(--fw-ui);
  color: var(--color-graphite);
  line-height: 1.50;
  max-width: 560px;
}
.hero-ctas {
  display: flex;
  gap: var(--spacing-16);
  align-items: center;
}
```

---

## Lo que NO hacer

- **Nunca** introducir un color cromático — ni azul para links, ni verde para success, nada. Toda la paleta es achromática.
- **Nunca** poner `box-shadow` en cards o thumbnails — los bordes hacen ese trabajo.
- **Nunca** usar `font-weight: 700` o `800` — el peso máximo es 652.
- **Nunca** usar valores de radius distintos a: `9999px` (interactivo), `24px` (contenedores grandes), `16px` (cards/imágenes), `8px` (badges inline).
- **Nunca** fondos de color detrás de secciones — máximo alternar `#ffffff` y `#f2f2f2`.
- **Nunca** alinear a la izquierda los headlines display (56–80px) — siempre centrados.
- **Nunca** omitir el letter-spacing negativo en textos display — a 80px, los -0.88px son lo que hace que Inter lea como fuente custom.

---

## Estructura HTML base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>…</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
  <style>
    /* Pegar aquí todas las CSS custom properties del skill */
    /* Pegar aquí los estilos de los componentes necesarios */
  </style>
</head>
<body>
  <nav class="navbar">
    <a class="nav-logo" href="#">Nombre</a>
    <ul class="nav-links">
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
    </ul>
    <button class="btn-primary">CTA</button>
  </nav>

  <div class="page-container">
    <!-- Hero -->
    <section class="hero section">
      <h1>Headline display aquí.</h1>
      <p>Subtítulo en graphite, máximo 560px de ancho.</p>
      <div class="hero-ctas">
        <button class="btn-primary">Acción principal</button>
        <button class="btn-outlined">Acción secundaria</button>
      </div>
    </section>

    <!-- Filtros -->
    <div class="filter-row section">
      <button class="filter-pill-active">Todos</button>
      <button class="filter-pill">Categoría 1</button>
      <button class="filter-pill">Categoría 2</button>
    </div>

    <!-- Grid de cards -->
    <div class="card-grid section">
      <div class="card">…</div>
      <div class="card">…</div>
      <div class="card">…</div>
    </div>
  </div>
</body>
</html>
```

---

## Checklist antes de entregar

- [ ] ¿Se importó Inter Variable desde Google Fonts?
- [ ] ¿Se definieron todas las CSS custom properties?
- [ ] ¿Los botones, inputs y tags usan `border-radius: 9999px`?
- [ ] ¿Las cards solo tienen `border: 1px solid #ededed` (sin box-shadow)?
- [ ] ¿Los headlines grandes (56–80px) tienen letter-spacing negativo?
- [ ] ¿El color más "llamativo" de la UI es `#141414`? (sin colores cromáticos)
- [ ] ¿Las sombras (`box-shadow`) solo aparecen en dropdowns flotantes?
- [ ] ¿`font-feature-settings: "calt" 0, "dlig", "ss07"` está aplicado globalmente?
- [ ] ¿Los headlines display están centrados?
- [ ] ¿El max-width de la página es 1280px centrado?
