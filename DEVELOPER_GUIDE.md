# Frontend Architecture Template

### Tailwind + GSAP + React (Scalable Structure)

---

# 1. Core Philosophy

This architecture is based on three separations:

1. Structure (React / TSX)
2. Styling (Tailwind + CSS)
3. Motion (GSAP / CSS transitions)

Goal:

- High readability
- Predictable naming
- Animation stability
- Scalable to medium/large projects

---

# 2. Folder Structure

```
src/
  components/
    common/
    layout/
    sections/
  pages/
  styles/
    globals.css
    motion.css
  utils/
  hooks/
```

---

# 3. STYLES Layer Convention

Each component contains:

```
Component.tsx
```

### Pattern

```ts
const STYLES = {
  wrapper: '',
  container: '',
  title: '',
  description: '',
  media: '',
  meta: '',
} as const;
```

---

# 4. Naming System

## Global (Allowed everywhere)

- wrapper → outermost layer
- container → width control
- title → primary text
- description → supporting text
- media → image/video
- meta → secondary info

## Contextual (When ambiguity exists)

- heroTitle
- brandTitle
- sectionTitle
- cardTitle

Rule:

> Use contextual naming only when multiple meanings exist

---

# 5. Tailwind Usage Rules

## Order Convention

[A] Layout [B] Visual [C] State [D] Responsive (ALWAYS LAST)

### Example

```ts
'flex items-center justify-center bg-black text-white hover:opacity-80 md:flex-row'
```

---

# 6. CSS Responsibility

CSS should ONLY handle:

## 1. Design Tokens

```css
:root {
  --brand-primary: #EAE2D6;
}
```

## 2. Tailwind Gaps

```css
.glass {
  backdrop-filter: blur(20px);
}
```

## 3. Animation Hooks (CRITICAL for GSAP)

```css
#hero-title {
  opacity: 0;
}
```

---

# 7. Animation System (VERY IMPORTANT)

## تقسیم控制權 (Control Separation)

| Type             | Tool |
| ---------------- | ---- |
| Page intro       | GSAP |
| Scroll animation | GSAP |
| Hover effects    | CSS  |
| Menu / UI toggle | CSS  |

---

## GSAP Rules

- NEVER change selector names used in GSAP
- Use id or stable class:

```ts
#hero-title
.work-card
```

- Timeline must live in:

```
App.tsx OR dedicated animation hook
```

---

## CSS Motion Example

```css
.mobile-menu {
  transform: translateY(-100%);
  transition: transform 0.8s cubic-bezier(0.85, 0, 0.15, 1);
}

.mobile-menu.is-open {
  transform: translateY(0);
}
```

---

# 8. Layout System Extraction (Recommended)

```
styles/layout.ts
```

```ts
export const LAYOUT = {
  wrapper: 'min-h-screen',
  container: 'content-width-container mx-auto',
}
```

Usage:

```tsx
<div className={LAYOUT.container} />
```

---

# 9. Component Example (Standard)

```tsx
const STYLES = {
  wrapper: 'min-h-screen',
  container: 'content-width-container mx-auto',
  title: 'text-3xl font-bold',
  description: 'text-sm opacity-70',
} as const;

export default function Example() {
  return (
    <section className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <h1 className={STYLES.title}>Title</h1>
        <p className={STYLES.description}>Description</p>
      </div>
    </section>
  );
}
```

---

# 10. Anti-Patterns (DO NOT DO)

❌ Inline style for animation

```tsx
style={{ transform: 'translateY(0)' }}
```

❌ Random class naming

```ts
box1, box2, textBig
```

❌ Mixing GSAP + CSS on same property

---

# 11. Scalability Upgrade Path

When project grows:

Step 1 → Extract layout tokens Step 2 → Extract typography system Step 3 → Introduce theme (dark/light) Step 4 → Component library

---

# 12. Final Principle

STYLES = organize classes Tailwind = define styles CSS = extend system GSAP = control motion

---

# END

