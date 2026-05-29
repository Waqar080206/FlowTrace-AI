'use client';

import React from 'react';
import {
  TokenButton,
  TokenCard,
  TokenAlert,
  TokenBadge,
  TokenInput,
  TokenPill,
  TokenTypography,
} from '@/components/ui/TokenComponents';

export default function TokensShowcase() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div className="min-h-screen bg-palette-white p-8 font-poppins">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-size10 font-bold text-text-primary mb-2 font-poppins">
            Design Tokens Showcase
          </h1>
          <p className="text-size7 text-text-4">
            Comprehensive demonstration of all available design tokens and components
          </p>
        </div>

        {/* Colors Section */}
        <section className="mb-12">
          <h2 className="text-size9 font-bold text-text-primary mb-6 font-poppins">
            Colors
          </h2>

          {/* Background Colors */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Background Colors
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {[
                { name: 'primary', color: '#FFFFFF', border: true },
                { name: 'secondary', color: '#BD3D41' },
                { name: 'bg3', color: '#E31E24' },
                { name: 'bg4', color: '#00569B' },
                { name: 'bg5', color: '#444444' },
              ].map(({ name, color, border }) => (
                <div key={name} className="text-center">
                  <div
                    className={`w-full h-24 rounded-lg shadow-md mb-2 ${border ? 'border-2 border-palette-light-gray' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-size5 text-text-primary font-poppins">{name}</p>
                  <p className="text-size3 text-text-5">{color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text Colors */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Text Colors
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {[
                { name: 'primary', color: '#000000' },
                { name: 'secondary', color: '#FFFFFF' },
                { name: 'text3', color: '#006C95' },
                { name: 'text4', color: '#444444' },
                { name: 'text5', color: '#555555' },
              ].map(({ name, color }) => (
                <div key={name} className="text-center">
                  <div
                    className="w-full h-24 rounded-lg shadow-md mb-2 flex items-center justify-center bg-palette-white border-2 border-palette-light-gray"
                    style={{ color }}
                  >
                    <span className="font-bold text-size7">Sample</span>
                  </div>
                  <p className="text-size5 text-text-primary font-poppins">{name}</p>
                  <p className="text-size3 text-text-5">{color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Palette */}
          <div>
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Palette
            </h3>
            <div className="grid grid-cols-7 gap-4">
              {[
                { name: 'black', color: '#000000' },
                { name: 'white', color: '#F1F1F1' },
                { name: 'blue', color: '#00569B' },
                { name: 'mixed', color: '#808080' },
                { name: 'red', color: '#C00000' },
                { name: 'dark-gray', color: '#101010' },
                { name: 'light-gray', color: '#D3D3D3' },
              ].map(({ name, color }) => (
                <div key={name} className="text-center">
                  <div
                    className="w-full h-20 rounded-lg shadow-md mb-2 border-2 border-palette-light-gray"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-size5 text-text-primary font-poppins">{name}</p>
                  <p className="text-size3 text-text-5">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-size9 font-bold text-text-primary mb-6 font-poppins">
            Typography
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-palette-white border border-palette-light-gray rounded-lg">
              <h3 className="text-size8 font-poppins mb-3">Font Sizes</h3>
              {[
                { name: 'size1', size: '10px' },
                { name: 'size2', size: '12.8px' },
                { name: 'size3', size: '12px' },
                { name: 'size7', size: '16px (Default)' },
                { name: 'size10', size: '18.72px (Largest)' },
              ].map(({ name, size }) => (
                <div key={name} className="flex justify-between py-2 border-b border-palette-light-gray last:border-b-0">
                  <span className="text-text-4 font-poppins">{name}</span>
                  <span className="text-text-5 font-poppins">{size}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-palette-white border border-palette-light-gray rounded-lg">
              <h3 className="text-size8 font-poppins mb-3">Font Families</h3>
              <div className="space-y-2">
                <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-size7">
                  Poppins Font (Primary)
                </p>
                <p style={{ fontFamily: 'Noto Sans, sans-serif' }} className="text-size7">
                  Noto Sans Font (Secondary)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="mb-12">
          <h2 className="text-size9 font-bold text-text-primary mb-6 font-poppins">
            Components
          </h2>

          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <TokenButton variant="primary">Primary Button</TokenButton>
              <TokenButton variant="secondary">Secondary Button</TokenButton>
              <TokenButton variant="outline">Outline Button</TokenButton>
              <TokenButton variant="ghost">Ghost Button</TokenButton>
              <TokenButton disabled>Disabled Button</TokenButton>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <TokenButton size="sm">Small</TokenButton>
              <TokenButton size="md">Medium</TokenButton>
              <TokenButton size="lg">Large</TokenButton>
            </div>
          </div>

          {/* Cards */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Cards
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <TokenCard title="Elevated Card" variant="elevated">
                This is an elevated card with shadow
              </TokenCard>
              <TokenCard title="Outlined Card" variant="outlined">
                This is an outlined card with border
              </TokenCard>
              <TokenCard title="Flat Card" variant="flat">
                This is a flat card with minimal styling
              </TokenCard>
            </div>
          </div>

          {/* Alerts */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Alerts
            </h3>
            <div className="space-y-3">
              <TokenAlert type="info" title="Information" icon="ℹ">
                This is an informational alert message
              </TokenAlert>
              <TokenAlert type="warning" title="Warning" icon="⚠">
                This is a warning alert message
              </TokenAlert>
              <TokenAlert type="error" title="Error" icon="✕">
                This is an error alert message
              </TokenAlert>
              <TokenAlert type="success" title="Success" icon="✓">
                This is a success alert message
              </TokenAlert>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Badges
            </h3>
            <div className="flex flex-wrap gap-3">
              <TokenBadge variant="primary">Primary</TokenBadge>
              <TokenBadge variant="secondary">Secondary</TokenBadge>
              <TokenBadge variant="success">Success</TokenBadge>
              <TokenBadge variant="warning">Warning</TokenBadge>
              <TokenBadge variant="error">Error</TokenBadge>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <TokenBadge size="sm">Small Badge</TokenBadge>
              <TokenBadge size="md">Medium Badge</TokenBadge>
              <TokenBadge size="lg">Large Badge</TokenBadge>
            </div>
          </div>

          {/* Pills */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Pills
            </h3>
            <div className="flex flex-wrap gap-3">
              <TokenPill variant="primary">Tag 1</TokenPill>
              <TokenPill variant="secondary">Tag 2</TokenPill>
              <TokenPill variant="outlined">Tag 3</TokenPill>
              <TokenPill onClose={() => {}}>Closeable Tag</TokenPill>
            </div>
          </div>

          {/* Input */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Input
            </h3>
            <div className="max-w-md space-y-4">
              <TokenInput
                placeholder="Standard input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <TokenInput placeholder="Disabled input" disabled />
              <TokenInput
                placeholder="Error input"
                error
                errorMessage="This field is required"
              />
            </div>
          </div>

          {/* Typography */}
          <div className="mb-8">
            <h3 className="text-size8 font-semibold text-text-primary mb-4 font-poppins">
              Typography
            </h3>
            <div className="space-y-3">
              <TokenTypography variant="h1">Heading 1</TokenTypography>
              <TokenTypography variant="h2">Heading 2</TokenTypography>
              <TokenTypography variant="h3">Heading 3</TokenTypography>
              <TokenTypography variant="body">Body text</TokenTypography>
              <TokenTypography variant="small">Small text</TokenTypography>
              <TokenTypography variant="label">Label text</TokenTypography>
            </div>
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="mb-12">
          <h2 className="text-size9 font-bold text-text-primary mb-6 font-poppins">
            Border Radius
          </h2>
          <div className="grid grid-cols-6 gap-4">
            {[
              { name: 'sm', radius: '50%' },
              { name: 'md', radius: '25px' },
              { name: 'lg', radius: '32px' },
              { name: 'xl', radius: '100%' },
              { name: '2xl', radius: '30px' },
              { name: 'full', radius: '48px' },
            ].map(({ name, radius }) => (
              <div key={name} className="text-center">
                <div
                  className="w-full h-20 bg-palette-blue mb-2"
                  style={{ borderRadius: radius }}
                />
                <p className="text-size5 text-text-primary font-poppins">{name}</p>
                <p className="text-size3 text-text-5">{radius}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows Section */}
        <section>
          <h2 className="text-size9 font-bold text-text-primary mb-6 font-poppins">
            Shadows
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { name: 'sm', shadowClass: 'shadow-sm' },
              { name: 'md', shadowClass: 'shadow-md' },
              { name: 'lg', shadowClass: 'shadow-lg' },
              { name: 'xl', shadowClass: 'shadow-xl' },
              { name: '2xl', shadowClass: 'shadow-2xl' },
            ].map(({ name, shadowClass }) => (
              <div key={name} className="text-center">
                <div className={`w-full h-24 bg-palette-white rounded-lg mb-2 ${shadowClass}`} />
                <p className="text-size5 text-text-primary font-poppins">{name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
