# Design Tokens Documentation

## Overview

This document describes the design token system used in FlowTrace AI. Design tokens are the single source of truth for all design decisions, ensuring consistency across the entire application.

The design tokens are defined in `tokens.json` following the [Design Tokens Community Group format](https://design-tokens.github.io/community-group/format/).

## Token Structure

### Colors

#### Background Colors
- **`--color-bg-primary`** (`#FFFFFF`) - Primary background, used for main content areas
- **`--color-bg-secondary`** (`#BD3D41`) - Secondary background, used for emphasis
- **`--color-bg-3`** (`#E31E24`) - Tertiary background, used for alerts
- **`--color-bg-4`** (`#00569B`) - Quaternary background, used for primary actions
- **`--color-bg-5`** (`#444444`) - Quinary background, used for footer/dark areas

#### Text Colors
- **`--color-text-primary`** (`#000000`) - Primary text color
- **`--color-text-secondary`** (`#FFFFFF`) - Secondary text color (light text on dark backgrounds)
- **`--color-text-3`** (`#006C95`) - Link/accent text color
- **`--color-text-4`** (`#444444`) - Secondary text, reduced emphasis
- **`--color-text-5`** (`#555555`) - Tertiary text, further reduced emphasis

#### Palette Colors
- **`--color-palette-black`** (`#000000`) - Pure black
- **`--color-palette-white`** (`#F1F1F1`) - Off-white
- **`--color-palette-blue`** (`#00569B`) - Primary blue
- **`--color-palette-mixed`** (`#808080`) - Medium gray
- **`--color-palette-red`** (`#C00000`) - Alert red
- **`--color-palette-dark-gray`** (`#101010`) - Dark gray
- **`--color-palette-light-gray`** (`#D3D3D3`) - Light gray

### Typography

#### Font Families
- **`--font-poppins`** - Primary font (Poppins)
- **`--font-noto`** - Secondary font (Noto Sans)
- **`--font-sans-serif`** - Fallback sans-serif
- **`--font-fontawesome`** - Icon font (FontAwesome)

#### Font Sizes
- **`--font-size-1`** - 10px (smallest)
- **`--font-size-2`** - 12.8px
- **`--font-size-3`** - 12px (small text)
- **`--font-size-4`** - 13.3333px
- **`--font-size-5`** - 13px
- **`--font-size-6`** - 14.4px (body text)
- **`--font-size-7`** - 16px (default text)
- **`--font-size-8`** - 16.8px (headings)
- **`--font-size-9`** - 17.92px (larger headings)
- **`--font-size-10`** - 18.72px (largest)

### Border Radius

- **`--radius-sm`** - 50% (circular)
- **`--radius-md`** - 25px (medium radius)
- **`--radius-lg`** - 32px (large radius)
- **`--radius-xl`** - 100% (fully circular)
- **`--radius-2xl`** - 30px (extra large)
- **`--radius-full`** - 48px (fully rounded)

### Shadows

- **`--shadow-sm`** - Subtle shadow: `rgba(0, 0, 0, 0.15) 0px 3px 3px 0px`
- **`--shadow-md`** - Medium shadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px 0px`
- **`--shadow-lg`** - Large shadow: `rgba(0, 0, 0, 0.19) 0px 10px 20px 0px, rgba(0, 0, 0, 0.23) 0px 6px 6px 0px`
- **`--shadow-xl`** - Extra large shadow: `rgba(0, 0, 0, 0.2) 0px 8px 16px 0px`
- **`--shadow-2xl`** - Double extra large shadow: `rgba(0, 0, 0, 0.25) 0px 4px 8px 0px`

## Usage

### CSS Custom Properties

Use CSS variables directly in your stylesheets:

```css
.my-element {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-poppins);
  font-size: var(--font-size-7);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

### Tailwind CSS Classes

The design tokens are integrated into Tailwind CSS. Use the following classes:

#### Colors
```jsx
<div className="bg-bg-primary text-text-primary">
  <h1 className="text-palette-blue">Hello</h1>
</div>
```

#### Font Sizes
```jsx
<p className="text-size7">Normal text</p>
<p className="text-size10">Large text</p>
```

#### Border Radius
```jsx
<div className="rounded-md">Rounded box</div>
<div className="rounded-full">Circular element</div>
```

#### Shadows
```jsx
<div className="shadow-md">Box with medium shadow</div>
<card className="shadow-lg">Card with large shadow</card>
```

#### Fonts
```jsx
<div className="font-poppins">Poppins font</div>
<div className="font-noto">Noto Sans font</div>
```

### TypeScript/JavaScript

Import the token utilities in your components:

```typescript
import { designTokens, getColorTokens, getFontSizes } from '@/lib/tokens';

// Access design tokens
const colors = getColorTokens();
const sizes = getFontSizes();

// Direct token access
const primaryColor = designTokens.colors.background.primary.value; // "#FFFFFF"
```

## Best Practices

1. **Always use design tokens** - Never hardcode colors, fonts, or sizes
2. **Use CSS variables** for dynamic theming in the future
3. **Use Tailwind classes** for layout and spacing
4. **Use utilities** when you need programmatic access to token values
5. **Keep consistency** - Use the same token across similar elements
6. **Mobile-first** - Consider responsive design when applying tokens

## Component Examples

### Button with Tokens

```typescript
export const Button = ({ children, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-poppins text-size7 font-semibold transition-all duration-300';
  
  const variants = {
    primary: 'bg-bg-4 text-text-secondary shadow-md hover:shadow-lg',
    secondary: 'bg-bg-secondary text-text-secondary shadow-sm hover:shadow-md',
    outline: 'border border-palette-light-gray text-text-primary hover:bg-palette-white'
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
};
```

### Card with Tokens

```typescript
export const Card = ({ title, children }) => {
  return (
    <div className="bg-bg-primary rounded-lg shadow-md p-6 border border-palette-light-gray">
      <h2 className="text-text-primary text-size8 font-poppins mb-4">
        {title}
      </h2>
      <p className="text-text-4 text-size7">
        {children}
      </p>
    </div>
  );
};
```

### Alert with Tokens

```typescript
export const Alert = ({ type = 'info', message }) => {
  const backgroundColors = {
    info: 'bg-bg-4',
    warning: 'bg-bg-3',
    error: 'bg-palette-red',
    success: 'bg-palette-green'
  };

  return (
    <div className={`${backgroundColors[type]} text-text-secondary rounded-md p-4 shadow-md`}>
      <p className="text-size7 font-poppins">{message}</p>
    </div>
  );
};
```

## Integration with Next.js

The design tokens are automatically available:

1. **CSS Variables** - Use anywhere in CSS/SCSS
2. **Tailwind Classes** - Use in className attributes
3. **TypeScript** - Import from `@/lib/tokens`

## Extending Tokens

To add new tokens:

1. Update `tokens.json` with the new token
2. Update `tailwind.config.ts` to include the new token in theme extensions
3. Add corresponding CSS custom properties in `styles/tokens.css`
4. Update the utility functions in `lib/tokens.ts` if needed
5. Document the new token in this file

## Token Maintenance

- Review tokens quarterly for usage and relevance
- Remove unused tokens to keep the system clean
- Update tokens.json as the design evolves
- Keep Tailwind config in sync with tokens.json
- Version control the design token changes
