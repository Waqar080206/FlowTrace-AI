# FlowTrace AI - Design Tokens System

## Overview

This document describes the comprehensive design token system for the FlowTrace AI frontend. Design tokens are the single source of truth for all design decisions, ensuring consistency and maintainability across the entire application.

## What are Design Tokens?

Design tokens are explicit design decisions stored as data that can be used in place of hard-coded design values. Instead of using colors like `#FFFFFF` or sizes like `16px` scattered throughout your code, you reference named tokens like `color-bg-primary` or `font-size-7`.

**Benefits:**
- 🎨 **Consistency** - Single source of truth for design decisions
- 🔄 **Maintainability** - Update design in one place
- 🚀 **Scalability** - Easy to extend and theme
- ♿ **Accessibility** - Ensures proper contrast and spacing
- 📦 **Portability** - Tokens can be used across platforms
- 🛠️ **Developer Experience** - Clear naming and structure

## Token Categories

### 1. Colors

#### Background Colors
Used for container backgrounds, panels, and main content areas.

| Token | Value | Use Case |
|-------|-------|----------|
| `background.primary` | `#FFFFFF` | Main content background |
| `background.secondary` | `#BD3D41` | Secondary areas, emphasis |
| `background.bg3` | `#E31E24` | Alert/danger areas |
| `background.bg4` | `#00569B` | Primary action areas |
| `background.bg5` | `#444444` | Footer/dark areas |

#### Text Colors
Used for text content at different hierarchy levels.

| Token | Value | Use Case |
|-------|-------|----------|
| `text.primary` | `#000000` | Main body text |
| `text.secondary` | `#FFFFFF` | Light text on dark backgrounds |
| `text.text3` | `#006C95` | Links and accent text |
| `text.text4` | `#444444` | Secondary text, reduced emphasis |
| `text.text5` | `#555555` | Tertiary text, further reduced emphasis |

#### Palette Colors
Reusable colors for various purposes.

| Token | Value |
|-------|-------|
| `palette.black` | `#000000` |
| `palette.white` | `#F1F1F1` |
| `palette.blue` | `#00569B` |
| `palette.mixed` | `#808080` |
| `palette.red` | `#C00000` |
| `palette.dark-gray` | `#101010` |
| `palette.light-gray` | `#D3D3D3` |

### 2. Typography

#### Font Families
Predefined font stacks for consistent typography.

| Token | Font Stack |
|-------|-----------|
| `poppins` | Poppins, sans-serif (Primary) |
| `noto` | Noto Sans, sans-serif (Secondary) |
| `sans-serif` | Generic sans-serif fallback |
| `fontawesome` | FontAwesome icon font |

#### Font Sizes
10 predefined sizes for text hierarchy.

| Token | Size | Typical Use |
|-------|------|------------|
| `size1` | 10px | Captions, annotations |
| `size2` | 12.8px | Very small text |
| `size3` | 12px | Small text, labels |
| `size4` | 13.3333px | Small text variant |
| `size5` | 13px | Small text variant |
| `size6` | 14.4px | Body text, form labels |
| `size7` | 16px | **Default body text** |
| `size8` | 16.8px | Large text, headings |
| `size9` | 17.92px | Larger headings |
| `size10` | 18.72px | Largest headings |

### 3. Spacing

Reserved for spacing scale. Currently uses Tailwind's default spacing with custom extensions for design tokens.

### 4. Border Radius

6 predefined border radius values for consistency.

| Token | Value | Use Case |
|-------|-------|----------|
| `sm` | 50% | Circular elements |
| `md` | 25px | Standard rounded corners |
| `lg` | 32px | Large rounded corners |
| `xl` | 100% | Fully circular |
| `2xl` | 30px | Extra large radius |
| `full` | 48px | Fully rounded (pills) |

### 5. Shadows

5 predefined shadow depths for elevation.

| Token | Shadow |
|-------|--------|
| `sm` | `rgba(0, 0, 0, 0.15) 0px 3px 3px 0px` |
| `md` | `rgba(0, 0, 0, 0.24) 0px 3px 8px 0px` |
| `lg` | `rgba(0, 0, 0, 0.19) 0px 10px 20px 0px, rgba(0, 0, 0, 0.23) 0px 6px 6px 0px` |
| `xl` | `rgba(0, 0, 0, 0.2) 0px 8px 16px 0px` |
| `2xl` | `rgba(0, 0, 0, 0.25) 0px 4px 8px 0px` |

## File Structure

```
frontend/
├── tokens.json                      # Design tokens definition (W3C format)
├── DESIGN_TOKENS.md                # Detailed token documentation
├── IMPLEMENTATION_GUIDE.md          # Implementation patterns and examples
├── styles/
│   ├── tokens.css                  # CSS custom properties and base styles
│   └── globals.css                 # Global styles
├── lib/
│   ├── tokens.ts                   # Tailwind integration utilities
│   └── designTokens.ts             # TypeScript/JavaScript utilities
├── components/
│   └── ui/
│       └── TokenComponents.tsx      # Example components using tokens
└── app/
    └── tokens-showcase/
        └── page.tsx                 # Interactive showcase of all tokens
```

## Usage Methods

### Method 1: CSS Custom Properties

Perfect for dynamic styling and CSS files.

```css
.card {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-poppins);
  font-size: var(--font-size-7);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 1rem;
}
```

### Method 2: Tailwind CSS Classes

Recommended for most React/Next.js components using className.

```tsx
<div className="bg-bg-primary text-text-primary font-poppins text-size7 rounded-md shadow-md p-4">
  <h1 className="text-size10 font-bold text-text-primary">Heading</h1>
  <p className="text-text-4 text-size7">Body text</p>
</div>
```

### Method 3: TypeScript Utilities

Perfect for programmatic access and dynamic styling.

```tsx
import { getColor, getFontSize, getBorderRadius } from '@/lib/designTokens';

const style = {
  backgroundColor: getColor('background', 'primary'),
  fontSize: getFontSize('size7'),
  borderRadius: getBorderRadius('md'),
};

<div style={style}>Content</div>
```

## Key Features

### 🎨 Color System
- **7 Background colors** for different context levels
- **5 Text colors** for hierarchy and emphasis
- **7 Palette colors** for consistent brand colors

### 📝 Typography System
- **4 Font families** with fallbacks
- **10 Font sizes** for complete text hierarchy
- **Poppins** as primary font, **Noto Sans** as secondary

### 🎯 Spacing & Layout
- **6 Border radius** options from subtle to circular
- **5 Shadow levels** for depth and elevation

### ♿ Accessibility
- **WCAG AA compliant** color contrast
- **Proper font sizes** for readability (minimum 16px for body)
- **Clear focus states** for interactive elements

## Integration with Next.js/Tailwind

The design tokens are seamlessly integrated with:

1. **Tailwind CSS** - Extended theme with all tokens
2. **CSS Custom Properties** - Available globally in `:root`
3. **TypeScript** - Type-safe token access
4. **React Components** - Pre-built token-based components

## Getting Started

### 1. View Token Showcase
Navigate to `/tokens-showcase` to see all tokens and components in action.

### 2. Read Documentation
- **DESIGN_TOKENS.md** - Token reference and usage
- **IMPLEMENTATION_GUIDE.md** - Code patterns and examples

### 3. Use in Components

```tsx
'use client';

import { TokenButton, TokenCard } from '@/components/ui/TokenComponents';

export default function Example() {
  return (
    <TokenCard title="My Card">
      <TokenButton variant="primary">Click me</TokenButton>
    </TokenCard>
  );
}
```

### 4. Extend Tokens
To add new tokens:

1. Edit `tokens.json` with new token
2. Update `tailwind.config.ts`
3. Add CSS variable to `styles/tokens.css`
4. Update documentation

## Design Token Philosophy

### Consistency
Every design decision is intentional and documented in tokens.

### Scalability
Adding new designs doesn't require refactoring existing code.

### Maintainability
Change tokens in one place, update everywhere automatically.

### Collaboration
Developers and designers share a common language.

## Token Naming Convention

All tokens follow this structure:
```
--[category]-[subcategory]-[name]
```

Examples:
- `--color-bg-primary` - Primary background color
- `--color-text-secondary` - Secondary text color
- `--font-size-7` - Font size 7
- `--radius-md` - Medium border radius
- `--shadow-lg` - Large shadow

## Performance Optimization

1. **CSS Variables** are computed at render time
2. **Tailwind Classes** are optimized at build time
3. **TypeScript Utilities** have minimal runtime overhead

For best performance:
- Use Tailwind classes for static styling
- Use CSS variables for dynamic theming
- Use utilities for conditional styling

## Browser Support

Design tokens use CSS Custom Properties (CSS Variables) which are supported in:
- ✅ Chrome 49+
- ✅ Firefox 31+
- ✅ Safari 9.1+
- ✅ Edge 15+
- ✅ All modern browsers

## Future Enhancements

Planned improvements:
- [ ] Dark mode token variants
- [ ] Animation/transition tokens
- [ ] Responsive breakpoint tokens
- [ ] Design token versioning
- [ ] Export to multiple formats (Tailwind, CSS-in-JS, etc.)

## Resources

- **[W3C Design Tokens Format](https://design-tokens.github.io/community-group/format/)**
- **[Design Tokens Showcase](./app/tokens-showcase/page.tsx)**
- **[Documentation](./DESIGN_TOKENS.md)**
- **[Implementation Guide](./IMPLEMENTATION_GUIDE.md)**
- **[Token Components](./components/ui/TokenComponents.tsx)**

## Support

For questions or issues:
1. Check **DESIGN_TOKENS.md** for token reference
2. Check **IMPLEMENTATION_GUIDE.md** for code patterns
3. Visit `/tokens-showcase` for visual reference
4. Review example components in `components/ui/`

## Summary

The FlowTrace AI design token system provides:

✨ **Complete design token system** following W3C standards
🎨 **Comprehensive color palette** with proper contrast
📝 **Consistent typography** with clear hierarchy
🔧 **Multiple usage methods** (CSS, Tailwind, TypeScript)
📚 **Extensive documentation** with examples
🎯 **Built-in components** using design tokens
♿ **Accessible by default** with proper contrast and sizing

Start using design tokens today for a more maintainable, scalable, and consistent application!
