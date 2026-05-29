import React from 'react';

/**
 * Example Button Component using Design Tokens
 */
export const TokenButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}> = ({ children, variant = 'primary', size = 'md', disabled = false }) => {
  const baseClasses = 'font-poppins font-semibold rounded-md transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-size3',
    md: 'px-4 py-2 text-size7',
    lg: 'px-6 py-3 text-size8',
  };

  const variantClasses = {
    primary: 'bg-palette-blue text-palette-white shadow-md hover:shadow-lg hover:bg-bg-4 active:shadow-sm',
    secondary: 'bg-bg-secondary text-text-secondary shadow-sm hover:shadow-md active:shadow-xs',
    outline: 'border-2 border-palette-blue text-palette-blue bg-transparent hover:bg-palette-blue hover:text-palette-white active:bg-palette-blue active:bg-opacity-80',
    ghost: 'text-palette-blue bg-transparent hover:bg-palette-blue hover:bg-opacity-10 active:bg-opacity-20',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

/**
 * Example Card Component using Design Tokens
 */
export const TokenCard: React.FC<{
  children: React.ReactNode;
  title?: string;
  variant?: 'elevated' | 'outlined' | 'flat';
}> = ({ children, title, variant = 'elevated' }) => {
  const baseClasses = 'rounded-lg p-6 font-poppins';

  const variantClasses = {
    elevated: 'bg-palette-white shadow-md border border-palette-light-gray',
    outlined: 'bg-palette-white border-2 border-palette-blue',
    flat: 'bg-palette-white bg-opacity-50 border border-palette-light-gray',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {title && (
        <h3 className="text-text-primary text-size8 font-bold mb-4 font-poppins">
          {title}
        </h3>
      )}
      <div className="text-text-4 text-size7">
        {children}
      </div>
    </div>
  );
};

/**
 * Example Alert Component using Design Tokens
 */
export const TokenAlert: React.FC<{
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  icon?: React.ReactNode;
}> = ({ children, type = 'info', title, icon }) => {
  const backgroundColors = {
    info: 'bg-palette-blue bg-opacity-10 border-palette-blue',
    warning: 'bg-bg-3 bg-opacity-10 border-bg-3',
    error: 'bg-palette-red bg-opacity-10 border-palette-red',
    success: 'bg-green-100 border-green-500',
  };

  const textColors = {
    info: 'text-palette-blue',
    warning: 'text-bg-3',
    error: 'text-palette-red',
    success: 'text-green-700',
  };

  const iconBackgrounds = {
    info: 'bg-palette-blue text-palette-white',
    warning: 'bg-bg-3 text-text-secondary',
    error: 'bg-palette-red text-text-secondary',
    success: 'bg-green-500 text-text-secondary',
  };

  return (
    <div className={`rounded-lg border-l-4 ${backgroundColors[type]} p-4 font-poppins`}>
      <div className="flex gap-3">
        {icon && (
          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-size7 font-bold ${iconBackgrounds[type]}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h4 className={`text-size7 font-bold mb-1 ${textColors[type]}`}>
              {title}
            </h4>
          )}
          <p className={`text-size7 ${textColors[type]}`}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Example Badge Component using Design Tokens
 */
export const TokenBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, variant = 'primary', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-size3',
    md: 'px-3 py-1.5 text-size5',
    lg: 'px-4 py-2 text-size7',
  };

  const variantClasses = {
    primary: 'bg-palette-blue text-palette-white',
    secondary: 'bg-bg-secondary text-text-secondary',
    success: 'bg-green-500 text-palette-white',
    warning: 'bg-bg-3 text-text-secondary',
    error: 'bg-palette-red text-text-secondary',
  };

  return (
    <span className={`rounded-full font-poppins font-semibold inline-block ${sizeClasses[size]} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

/**
 * Example Input Component using Design Tokens
 */
export const TokenInput: React.FC<{
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}> = ({ placeholder, type = 'text', value, onChange, disabled = false, error = false, errorMessage }) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-md font-poppins text-size7 border-2 transition-all duration-300
          ${error ? 'border-palette-red focus:border-palette-red' : 'border-palette-light-gray focus:border-palette-blue'}
          ${disabled ? 'bg-palette-light-gray text-text-5 cursor-not-allowed' : 'bg-palette-white text-text-primary'}
          focus:outline-none focus:shadow-md`}
      />
      {error && errorMessage && (
        <p className="text-palette-red text-size5 mt-1 font-poppins">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

/**
 * Example Badge Component using Design Tokens
 */
export const TokenPill: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined';
  onClose?: () => void;
}> = ({ children, variant = 'primary', onClose }) => {
  const variantClasses = {
    primary: 'bg-palette-blue text-palette-white',
    secondary: 'bg-bg-secondary text-text-secondary',
    outlined: 'border border-palette-blue text-palette-blue bg-transparent',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-poppins text-size7 ${variantClasses[variant]}`}>
      <span>{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-1 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};

/**
 * Example Divider Component using Design Tokens
 */
export const TokenDivider: React.FC<{ variant?: 'solid' | 'dashed' }> = ({ variant = 'solid' }) => {
  const variantClasses = {
    solid: 'border-solid border-palette-light-gray',
    dashed: 'border-dashed border-palette-light-gray',
  };

  return <hr className={`my-4 border-t border-${variantClasses[variant]}`} />;
};

/**
 * Example Typography Component using Design Tokens
 */
export const TokenTypography: React.FC<{
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'label';
  component?: keyof React.JSX.IntrinsicElements;
}> = ({ children, variant = 'body', component: Component = 'div' }) => {
  const variantClasses = {
    h1: 'text-size10 font-bold font-poppins text-text-primary',
    h2: 'text-size9 font-bold font-poppins text-text-primary',
    h3: 'text-size8 font-bold font-poppins text-text-primary',
    h4: 'text-size7 font-bold font-poppins text-text-primary',
    h5: 'text-size6 font-semibold font-poppins text-text-primary',
    h6: 'text-size6 font-semibold font-poppins text-text-4',
    body: 'text-size7 font-normal font-poppins text-text-4',
    small: 'text-size5 font-normal font-poppins text-text-5',
    label: 'text-size6 font-semibold font-poppins text-text-primary',
  };

  return (
    <Component className={variantClasses[variant]}>
      {children}
    </Component>
  );
};
