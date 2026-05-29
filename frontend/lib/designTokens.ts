/**
 * Design Token Utilities
 * 
 * This module provides utilities for working with design tokens throughout the application.
 * Use these utilities to access design tokens programmatically in TypeScript/JavaScript code.
 */

import tokens from '../tokens.json';

export interface DesignTokens {
  colors: {
    background: {
      primary: { value: string; type: string };
      secondary: { value: string; type: string };
      bg3: { value: string; type: string };
      bg4: { value: string; type: string };
      bg5: { value: string; type: string };
    };
    text: {
      primary: { value: string; type: string };
      secondary: { value: string; type: string };
      text3: { value: string; type: string };
      text4: { value: string; type: string };
      text5: { value: string; type: string };
    };
    palette: {
      [key: string]: { value: string; type: string };
    };
  };
  typography: {
    fontFamilies: {
      [key: string]: { value: string; type: string };
    };
    fontSizes: {
      [key: string]: { value: string; type: string };
    };
    fontWeights: {
      [key: string]: { value: string; type: string };
    };
  };
  borderRadius: {
    [key: string]: { value: string; type: string };
  };
  shadows: {
    [key: string]: { value: string; type: string };
  };
}

/**
 * Get all background color tokens
 */
export const getBackgroundColors = (): Record<string, string> => {
  const colors: Record<string, string> = {};
  Object.entries(tokens.colors.background).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[key] = (value as any).value;
    }
  });
  return colors;
};

/**
 * Get all text color tokens
 */
export const getTextColors = (): Record<string, string> => {
  const colors: Record<string, string> = {};
  Object.entries(tokens.colors.text).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[key] = (value as any).value;
    }
  });
  return colors;
};

/**
 * Get all palette color tokens
 */
export const getPaletteColors = (): Record<string, string> => {
  const colors: Record<string, string> = {};
  Object.entries(tokens.colors.palette).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[key] = (value as any).value;
    }
  });
  return colors;
};

/**
 * Get a specific color token by path
 * @example getColor('background', 'primary') // returns "#FFFFFF"
 */
export const getColor = (category: string, name: string): string | undefined => {
  const categoryTokens = (tokens.colors as any)[category];
  if (categoryTokens && categoryTokens[name]) {
    return categoryTokens[name].value;
  }
  return undefined;
};

/**
 * Get all font family tokens
 */
export const getFontFamilies = (): Record<string, string> => {
  const families: Record<string, string> = {};
  Object.entries(tokens.typography.fontFamilies).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      families[key] = (value as any).value;
    }
  });
  return families;
};

/**
 * Get all font size tokens
 */
export const getFontSizes = (): Record<string, string> => {
  const sizes: Record<string, string> = {};
  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      sizes[key] = (value as any).value;
    }
  });
  return sizes;
};

/**
 * Get a specific font size token
 * @example getFontSize('size7') // returns "16px"
 */
export const getFontSize = (name: string): string | undefined => {
  const fontSizes = tokens.typography.fontSizes as any;
  if (fontSizes[name]) {
    return fontSizes[name].value;
  }
  return undefined;
};

/**
 * Get all border radius tokens
 */
export const getBorderRadii = (): Record<string, string> => {
  const radii: Record<string, string> = {};
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      radii[key] = (value as any).value;
    }
  });
  return radii;
};

/**
 * Get a specific border radius token
 * @example getBorderRadius('md') // returns "25px"
 */
export const getBorderRadius = (name: string): string | undefined => {
  const borderRadius = tokens.borderRadius as any;
  if (borderRadius[name]) {
    return borderRadius[name].value;
  }
  return undefined;
};

/**
 * Get all shadow tokens
 */
export const getShadows = (): Record<string, string> => {
  const shadows: Record<string, string> = {};
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      shadows[key] = (value as any).value;
    }
  });
  return shadows;
};

/**
 * Get a specific shadow token
 * @example getShadow('md') // returns "rgba(0, 0, 0, 0.24) 0px 3px 8px 0px"
 */
export const getShadow = (name: string): string | undefined => {
  const shadowTokens = tokens.shadows as any;
  if (shadowTokens[name]) {
    return shadowTokens[name].value;
  }
  return undefined;
};

/**
 * Generate a Tailwind color palette from design tokens
 * Useful for extending Tailwind config
 */
export const getTailwindColors = () => {
  return {
    ...getBackgroundColors(),
    ...getTextColors(),
    ...getPaletteColors(),
  };
};

/**
 * Generate a Tailwind font family config from design tokens
 * Useful for extending Tailwind config
 */
export const getTailwindFontFamilies = () => {
  return getFontFamilies();
};

/**
 * Generate a Tailwind font size config from design tokens
 * Useful for extending Tailwind config
 */
export const getTailwindFontSizes = () => {
  const sizes: Record<string, [string, { lineHeight: string }]> = {};
  Object.entries(getFontSizes()).forEach(([key, value]) => {
    sizes[key] = [value, { lineHeight: '1.5' }];
  });
  return sizes;
};

/**
 * Generate a Tailwind border radius config from design tokens
 * Useful for extending Tailwind config
 */
export const getTailwindBorderRadius = () => {
  return getBorderRadii();
};

/**
 * Generate a Tailwind shadow config from design tokens
 * Useful for extending Tailwind config
 */
export const getTailwindShadows = () => {
  return getShadows();
};

/**
 * Get the entire design tokens object
 */
export const getDesignTokens = (): DesignTokens => {
  return tokens as DesignTokens;
};

/**
 * Alias for easier imports
 */
export const designTokens = tokens;

/**
 * Helper to create a CSS custom property value
 * @example getCSSVariable('color-bg-primary') // returns "var(--color-bg-primary)"
 */
export const getCSSVariable = (name: string): string => {
  return `var(--${name})`;
};

/**
 * Helper to create multiple CSS custom properties
 */
export const getCSSVariables = (names: string[]): Record<string, string> => {
  const variables: Record<string, string> = {};
  names.forEach((name) => {
    variables[name] = getCSSVariable(name);
  });
  return variables;
};

/**
 * Check if a token exists
 */
export const tokenExists = (category: string, name: string): boolean => {
  try {
    return getColor(category, name) !== undefined;
  } catch {
    return false;
  }
};

/**
 * Get all token names in a category
 */
export const getTokenNames = (
  category: 'background' | 'text' | 'palette' | 'fontFamily' | 'fontSize' | 'borderRadius' | 'shadow'
): string[] => {
  switch (category) {
    case 'background':
      return Object.keys(tokens.colors.background);
    case 'text':
      return Object.keys(tokens.colors.text);
    case 'palette':
      return Object.keys(tokens.colors.palette);
    case 'fontFamily':
      return Object.keys(tokens.typography.fontFamilies);
    case 'fontSize':
      return Object.keys(tokens.typography.fontSizes);
    case 'borderRadius':
      return Object.keys(tokens.borderRadius);
    case 'shadow':
      return Object.keys(tokens.shadows);
    default:
      return [];
  }
};
