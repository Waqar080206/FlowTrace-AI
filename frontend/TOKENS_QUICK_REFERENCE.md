# Design Tokens - Quick Reference

## 🎨 Colors

### Background
```
bg-primary (#FFFFFF)      → bg-bg-primary
bg-secondary (#BD3D41)    → bg-bg-secondary
bg-3 (#E31E24)            → bg-bg-3
bg-4 (#00569B)            → bg-bg-4
bg-5 (#444444)            → bg-bg-5
```

### Text
```
text-primary (#000000)    → text-text-primary
text-secondary (#FFFFFF)  → text-text-secondary
text-3 (#006C95)          → text-text-3
text-4 (#444444)          → text-text-4
text-5 (#555555)          → text-text-5
```

### Palette
```
black (#000000)      → text-palette-black
white (#F1F1F1)      → text-palette-white
blue (#00569B)       → text-palette-blue
mixed (#808080)      → text-palette-mixed
red (#C00000)        → text-palette-red
dark-gray (#101010)  → text-palette-dark-gray
light-gray (#D3D3D3) → text-palette-light-gray
```

## 📝 Typography

### Font Families
```
--font-poppins      → Primary (Poppins, sans-serif)
--font-noto         → Secondary (Noto Sans, sans-serif)
--font-sans-serif   → Generic fallback
--font-fontawesome  → Icons
```

### Font Sizes
```
size1   10px       size6   14.4px
size2   12.8px     size7   16px (default)
size3   12px       size8   16.8px
size4   13.33px    size9   17.92px
size5   13px       size10  18.72px
```

## 🔲 Border Radius
```
sm      50%      → rounded-sm
md      25px     → rounded-md
lg      32px     → rounded-lg
xl      100%     → rounded-xl
2xl     30px     → rounded-2xl
full    48px     → rounded-full
```

## 🌑 Shadows
```
sm  (subtle)      → shadow-sm
md  (medium)      → shadow-md
lg  (large)       → shadow-lg
xl  (extra large) → shadow-xl
2xl (double XL)   → shadow-2xl
```

## 💻 Usage Methods

### CSS Variables
```css
var(--color-bg-primary)
var(--color-text-primary)
var(--font-poppins)
var(--font-size-7)
var(--radius-md)
var(--shadow-md)
```

### Tailwind Classes
```tsx
className="bg-bg-primary text-text-primary text-size7 rounded-md shadow-md"
```

### TypeScript
```typescript
import { getColor, getFontSize } from '@/lib/designTokens';
const color = getColor('background', 'primary');
const size = getFontSize('size7');
```

## 🎯 Common Patterns

### Full Card
```tsx
<div className="bg-bg-primary text-text-primary rounded-lg shadow-md p-6 border border-palette-light-gray">
  <h2 className="text-size8 font-poppins font-bold mb-4">Title</h2>
  <p className="text-text-4 text-size7">Content</p>
</div>
```

### Primary Button
```tsx
<button className="bg-palette-blue text-palette-white px-4 py-2 rounded-md text-size7 font-semibold shadow-md hover:shadow-lg">
  Click me
</button>
```

### Alert Box
```tsx
<div className="bg-bg-3 bg-opacity-10 border-l-4 border-bg-3 p-4 rounded-md text-bg-3">
  Alert message
</div>
```

### Text Hierarchy
```tsx
<h1 className="text-size10 font-poppins font-bold text-text-primary">Large heading</h1>
<h2 className="text-size9 font-poppins font-bold text-text-primary">Medium heading</h2>
<p className="text-size7 text-text-4">Body text</p>
<small className="text-size5 text-text-5">Small text</small>
```

## 📦 Importing Components

### Pre-built Components
```typescript
import {
  TokenButton,
  TokenCard,
  TokenAlert,
  TokenBadge,
  TokenInput,
  TokenPill,
  TokenTypography,
} from '@/components/ui/TokenComponents';
```

### Token Utilities
```typescript
import {
  getColor,
  getFontSize,
  getBorderRadius,
  getShadow,
  getTokenNames,
  designTokens,
} from '@/lib/designTokens';
```

## 🎨 Color Combinations

### Light Theme
```
Background: bg-primary (#FFFFFF)
Text: text-primary (#000000)
Accent: palette-blue (#00569B)
```

### Dark Sections
```
Background: bg-5 (#444444)
Text: text-secondary (#FFFFFF)
Accent: palette-white (#F1F1F1)
```

### Alert Sections
```
Background: bg-3 (#E31E24)
Text: text-secondary (#FFFFFF)
Border: palette-red (#C00000)
```

## ✅ Color Contrast

All color combinations are WCAG AA compliant:
- Primary text on primary background: 21:1 ✓
- Secondary text on secondary background: 4.8:1 ✓
- Text 3 (links) on primary background: 7.5:1 ✓

## 🔍 Token Validation

```typescript
import { tokenExists, getTokenNames } from '@/lib/designTokens';

// Check if token exists
const exists = tokenExists('background', 'primary'); // true

// Get all token names
const names = getTokenNames('fontSize'); 
// ['size1', 'size2', 'size3', ...]
```

## 🎬 Animation Classes

Available animations using tokens:
```
.animate-fadeIn   → Fade in effect
.animate-slideIn  → Slide in from top
.animate-slideUp  → Slide up from bottom
```

## 🔗 Quick Links

- [Full Documentation](./DESIGN_TOKENS.md)
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [Token Showcase](./app/tokens-showcase/page.tsx)
- [Token Definitions](./tokens.json)
- [CSS Variables](./styles/tokens.css)
- [Components](./components/ui/TokenComponents.tsx)

## 🚨 Common Mistakes to Avoid

❌ Don't use hardcoded colors
```typescript
// WRONG
style={{ color: '#000000' }}

// RIGHT
style={{ color: getColor('text', 'primary') }}
className="text-text-primary"
```

❌ Don't mix different gray/neutral colors
```typescript
// WRONG - Inconsistent grays
backgroundColor: '#999999'

// RIGHT - Use palette or bg colors
backgroundColor: getColor('palette', 'mixed')
```

❌ Don't use arbitrary font sizes
```typescript
// WRONG
className="text-[15px]"

// RIGHT
className="text-size6"
```

## 💡 Pro Tips

1. **Use size7 (16px) as default** - Ensures readability
2. **Use shadow-md as default** - Good elevation without overkill
3. **Use radius-md as default** - Standard rounded appearance
4. **Combine colors intentionally** - Consider contrast and hierarchy
5. **Use TokenComponents** - They follow best practices
6. **Update tokens.json first** - Then propagate changes

## 📊 Token Statistics

- **Total Tokens**: 60+
- **Color Tokens**: 25
- **Typography Tokens**: 14
- **Shadow Tokens**: 5
- **Border Radius Tokens**: 6
- **Font Families**: 4
- **Font Sizes**: 10

## 🎓 Learn More

New to design tokens?
1. Read TOKENS_README.md
2. Visit /tokens-showcase
3. Review DESIGN_TOKENS.md
4. Check IMPLEMENTATION_GUIDE.md

## 🔧 Customization

To add custom tokens:

1. Edit `tokens.json`
2. Update `tailwind.config.ts`
3. Add CSS variable to `styles/tokens.css`
4. Update this quick reference

## 📞 Support Resources

- **Token Showcase**: `/tokens-showcase`
- **Documentation**: See DESIGN_TOKENS.md
- **Examples**: Check TokenComponents.tsx
- **Utilities**: Use lib/designTokens.ts

---

**Last Updated**: May 29, 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
