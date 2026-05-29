# Design Tokens Implementation Guide

## Quick Start

### 1. Using CSS Custom Properties

Add the tokens CSS to your component or global styles:

```tsx
// app/layout.tsx
import '../styles/tokens.css';

export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

Then use in CSS:

```css
.my-component {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-poppins);
  font-size: var(--font-size-7);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

### 2. Using Tailwind CSS Classes

Use the integrated Tailwind classes directly:

```tsx
export default function MyComponent() {
  return (
    <div className="bg-bg-primary text-text-primary rounded-md shadow-md p-4">
      <h1 className="text-size10 font-poppins font-bold">Welcome</h1>
      <p className="text-text-4 text-size7">This uses design tokens via Tailwind</p>
    </div>
  );
}
```

### 3. Using Token Utilities in TypeScript

```typescript
import { 
  getColor, 
  getFontSize, 
  getBorderRadius, 
  getShadow,
  designTokens 
} from '@/lib/designTokens';

// Get specific tokens
const primaryColor = getColor('background', 'primary'); // "#FFFFFF"
const headingSize = getFontSize('size10'); // "18.72px"
const cardRadius = getBorderRadius('md'); // "25px"
const cardShadow = getShadow('md'); // "rgba(0, 0, 0, 0.24) 0px 3px 8px 0px"

// Get all tokens of a type
import { getBackgroundColors, getTextColors } from '@/lib/designTokens';

const allBgColors = getBackgroundColors();
const allTextColors = getTextColors();

// Access raw tokens
const primaryBg = designTokens.colors.background.primary.value;
```

## Common Usage Patterns

### Pattern 1: Styled Components with Tokens

```typescript
import styled from 'styled-components';
import { getColor, getFontSize } from '@/lib/designTokens';

const StyledCard = styled.div`
  background-color: ${getColor('background', 'primary')};
  color: ${getColor('text', 'primary')};
  font-size: ${getFontSize('size7')};
  border-radius: var(--radius-md);
  padding: 1rem;
`;

export default function Card() {
  return <StyledCard>Card content</StyledCard>;
}
```

### Pattern 2: Dynamic Component Styling

```typescript
import { getColor } from '@/lib/designTokens';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export function Button({ variant, children }: ButtonProps) {
  const colorMap = {
    primary: getColor('background', 'bg4'),
    secondary: getColor('background', 'bg5'),
    danger: getColor('palette', 'red'),
  };

  return (
    <button
      style={{
        backgroundColor: colorMap[variant],
        color: 'white',
        padding: '8px 16px',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
```

### Pattern 3: Theme Customization

```typescript
// Create a custom hook for theme access
import { getCSSVariable } from '@/lib/designTokens';

export function useDesignTokens() {
  return {
    colors: {
      primary: getCSSVariable('color-bg-primary'),
      secondary: getCSSVariable('color-bg-secondary'),
      text: getCSSVariable('color-text-primary'),
    },
    fonts: {
      primary: getCSSVariable('font-poppins'),
      secondary: getCSSVariable('font-noto'),
    },
    spacing: {
      sm: '8px',
      md: '16px',
      lg: '24px',
    },
  };
}

// Use in component
export function MyComponent() {
  const tokens = useDesignTokens();
  
  return (
    <div style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.primary }}>
      Content
    </div>
  );
}
```

### Pattern 4: Creating Base Components

```typescript
// components/base/Container.tsx
'use client';

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  variant?: 'default' | 'card' | 'section';
}

export function Container({ children, variant = 'default' }: ContainerProps) {
  const variants = {
    default: 'bg-bg-primary text-text-primary p-0',
    card: 'bg-bg-primary text-text-primary p-6 rounded-lg shadow-md border border-palette-light-gray',
    section: 'bg-bg-primary text-text-primary p-8 rounded-xl shadow-lg',
  };

  return <div className={variants[variant]}>{children}</div>;
}

// Use in pages
import { Container } from '@/components/base/Container';

export default function Page() {
  return (
    <Container variant="section">
      <h1 className="text-size10 font-poppins">Page Content</h1>
    </Container>
  );
}
```

### Pattern 5: Responsive Design with Tokens

```typescript
'use client';

interface ResponsiveCardProps {
  title: string;
  children: React.ReactNode;
}

export function ResponsiveCard({ title, children }: ResponsiveCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-bg-primary rounded-lg shadow-md p-4 md:p-6 lg:p-8">
        <h2 className="text-size8 md:text-size9 lg:text-size10 font-poppins mb-2 md:mb-4">
          {title}
        </h2>
        <p className="text-text-4 text-size5 md:text-size6 lg:text-size7">
          {children}
        </p>
      </div>
    </div>
  );
}
```

### Pattern 6: Custom Hooks for Token Access

```typescript
// hooks/useTokens.ts
import {
  getColor,
  getFontSize,
  getFontFamilies,
  getBorderRadius,
  getShadow,
} from '@/lib/designTokens';

export function useTokens() {
  return {
    colors: {
      bgPrimary: getColor('background', 'primary'),
      bgSecondary: getColor('background', 'secondary'),
      textPrimary: getColor('text', 'primary'),
      textSecondary: getColor('text', 'secondary'),
      blue: getColor('palette', 'blue'),
      red: getColor('palette', 'red'),
    },
    fonts: {
      poppins: getFontFamilies().poppins,
      noto: getFontFamilies().noto,
    },
    sizes: {
      sm: getFontSize('size3'),
      md: getFontSize('size7'),
      lg: getFontSize('size10'),
    },
    radius: {
      sm: getBorderRadius('sm'),
      md: getBorderRadius('md'),
      lg: getBorderRadius('lg'),
    },
    shadows: {
      sm: getShadow('sm'),
      md: getShadow('md'),
      lg: getShadow('lg'),
    },
  };
}

// Usage in component
'use client';

import { useTokens } from '@/hooks/useTokens';

export function MyComponent() {
  const tokens = useTokens();

  return (
    <div
      style={{
        backgroundColor: tokens.colors.bgPrimary,
        color: tokens.colors.textPrimary,
        fontFamily: tokens.fonts.poppins,
        fontSize: tokens.sizes.md,
        borderRadius: tokens.radius.md,
        boxShadow: tokens.shadows.md,
        padding: '16px',
      }}
    >
      Content using all tokens
    </div>
  );
}
```

## Color Contrast Guidelines

When using color tokens, ensure sufficient contrast:

- **Text on Background**: Primary text (#000000) on white backgrounds
- **Text on Secondary**: Secondary text (#FFFFFF) on dark backgrounds (bg4, bg5)
- **Links**: Use text3 (#006C95) for links
- **Interactive Elements**: Use bg4 (#00569B) for primary actions

## Accessibility Considerations

1. **Color Alone**: Don't rely on color alone to convey information
2. **Text Contrast**: Ensure WCAG AA compliance (4.5:1 for normal text)
3. **Font Sizes**: Use size7 (16px) as minimum for body text
4. **Focus States**: Provide clear focus indicators using palette-blue

## Performance Tips

1. **CSS Variables**: Use CSS variables for dynamic theming (minimal runtime cost)
2. **Tailwind Classes**: Prefer Tailwind classes for static styling (optimized at build time)
3. **Memoization**: Memoize token calculations in custom hooks
4. **Selective Loading**: Only import needed token utilities

## Migration Guide

If migrating from hardcoded values:

```typescript
// Before: Hardcoded colors
const cardStyle = {
  backgroundColor: '#FFFFFF',
  color: '#000000',
  borderRadius: '25px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px 0px',
};

// After: Design tokens
import { getColor, getBorderRadius, getShadow } from '@/lib/designTokens';

const cardStyle = {
  backgroundColor: getColor('background', 'primary'),
  color: getColor('text', 'primary'),
  borderRadius: getBorderRadius('md'),
  boxShadow: getShadow('md'),
};

// Or with CSS variables
const cardStyle = {
  backgroundColor: 'var(--color-bg-primary)',
  color: 'var(--color-text-primary)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-md)',
};

// Or with Tailwind
<div className="bg-bg-primary text-text-primary rounded-md shadow-md">
  Card content
</div>
```

## Testing with Tokens

```typescript
import { getColor, getFontSize } from '@/lib/designTokens';

describe('Design Tokens', () => {
  it('should return correct primary background color', () => {
    expect(getColor('background', 'primary')).toBe('#FFFFFF');
  });

  it('should return correct font size', () => {
    expect(getFontSize('size7')).toBe('16px');
  });

  it('should return undefined for non-existent tokens', () => {
    expect(getColor('background', 'nonexistent')).toBeUndefined();
  });
});
```

## Resources

- [Design Tokens Showcase](./tokens-showcase)
- [DESIGN_TOKENS.md](./DESIGN_TOKENS.md)
- [tokens.json](./tokens.json)
- [lib/designTokens.ts](./lib/designTokens.ts)
- [components/ui/TokenComponents.tsx](./components/ui/TokenComponents.tsx)
