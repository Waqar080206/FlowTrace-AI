import tokens from '../tokens.json';

// Transform design tokens into Tailwind-compatible format
export const getColorTokens = () => {
  const colors: Record<string, string> = {};

  // Background colors
  Object.entries(tokens.colors.background).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[`bg-${key}`] = value.value;
    }
  });

  // Text colors
  Object.entries(tokens.colors.text).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[`text-${key}`] = value.value;
    }
  });

  // Palette colors
  Object.entries(tokens.colors.palette).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[`palette-${key}`] = value.value;
    }
  });

  return colors;
};

export const getFontSizes = () => {
  const sizes: Record<string, string> = {};

  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      sizes[key] = value.value;
    }
  });

  return sizes;
};

export const getBorderRadius = () => {
  const radii: Record<string, string> = {};

  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      radii[key] = value.value;
    }
  });

  return radii;
};

export const getShadows = () => {
  const shadows: Record<string, string> = {};

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      shadows[key] = value.value;
    }
  });

  return shadows;
};

export const getFontFamilies = () => {
  const families: Record<string, string> = {};

  Object.entries(tokens.typography.fontFamilies).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      families[key] = value.value;
    }
  });

  return families;
};

// Direct token access
export const designTokens = tokens;
