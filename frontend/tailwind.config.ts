import type { Config } from 'tailwindcss'
import tokens from './tokens.json'

const getColorTokens = () => {
  const colors: Record<string, string> = {};

  // Background colors - prefix with 'bg-'
  Object.entries(tokens.colors.background).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[`bg-${key}`] = (value as any).value;
    }
  });

  // Text colors - prefix with 'text-'
  Object.entries(tokens.colors.text).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[`text-${key}`] = (value as any).value;
    }
  });

  // Palette colors - prefix with 'palette-'
  Object.entries(tokens.colors.palette).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      colors[`palette-${key}`] = (value as any).value;
    }
  });

  return colors;
};

const getFontSizes = () => {
  const sizes: Record<string, [string, { lineHeight: string }]> = {};

  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      const sizeValue = (value as any).value;
      sizes[key] = [sizeValue, { lineHeight: '1.5' }];
    }
  });

  return sizes;
};

const getBorderRadius = () => {
  const radii: Record<string, string> = {};

  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      radii[key] = (value as any).value;
    }
  });

  return radii;
};

const getShadows = () => {
  const shadows: Record<string, string> = {};

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    if (typeof value === 'object' && 'value' in value) {
      shadows[key] = (value as any).value;
    }
  });

  return shadows;
};

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...getColorTokens(),
        'risk-red': '#E24B4A',
        'risk-amber': '#EF9F27',
        'risk-green': '#1D9E75'
      },
      fontSize: getFontSizes(),
      borderRadius: getBorderRadius(),
      boxShadow: getShadows(),
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        noto: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
