import { Icon } from '@iconify/react';
import type { JSX } from 'react';
import React from 'react';

import { Spinner } from '../loading';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    type: JSX.IntrinsicElements['button']['type'];
    size: 'sm' | 'md' | 'lg';
    variant: 'contained' | 'text' | 'outline';
    icon?: string;
    iconSize?: number;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    // color?: 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning';
}

const THEMES = {
    contained: [
        'bg-accent-light dark:bg-accent-dark',
        'border border-accent-light border-accent-dark',
        'text-text-light-primary text-accent-dark',
        'hover:bg-accent-light-hover hover:dark:bg-accent-dark-hover',
        'hover:dark:border-accent-dark hover:border-accent-light',
        'hover:text-text-light-primary hover:dark:text-text-light-primary',
        'active:bg-transparent active:dark:bg-transparent',
        'active:dark:text-text-dark-primary',
        'disabled:bg-accent-light-subtle disabled:dark:bg-accent-dark-subtle',
        'disabled:border-accent-light-subtle disabled:dark:border-accent-dark-subtle',
        'disabled:text-text-light-muted disabled:dark:text-text-dark-muted',
    ].join(' '),
    outline: [
        'bg-transparent',
        'border border-accent-light dark:border-accent-dark',
        'text-accent-light dark:text-accent-dark',
        'hover:dark:bg-accent-dark-hover hover:bg-accent-light-hover',
        'hover:text-text-light-primary hover:dark:text-text-light-primary',
        'active:bg-transparent active:dark:bg-transparent',
        'active:text-accent-light active:dark:text-accent-dark',
        'disabled:hover:bg-transparent',
        'disabled:border-accent-light/40 disabled:dark:border-accent-dark/20',
        'disabled:text-accent-light/40 disabled:dark:text-accent-dark/20',
    ].join(' '),
    text: [
        'bg-transparent',
        'border-0',
        'text-accent-light dark:text-accent-dark',
        'hover:bg-accent-light/20 hover:dark:bg-accent-dark/20',
        'active:bg-transparent active:dark:bg-transparent',
        'disabled:hover:bg-transparent',
        'disabled:text-accent-light/40 disabled:dark:text-accent-dark/20',
    ].join(' '),
};

const ButtonPrimary = ({
    text,
    type,
    variant,
    size,
    icon,
    iconSize,
    fullWidth,
    loading,
    disabled,
    className,
    ...props
}: Props) => {
    const textSize =
        size === 'sm' ? 'ty-body-sm' : size === 'md' ? 'ty-body' : 'ty-body-lg';
    const paddingSize =
        size === 'sm'
            ? 'px-[10px] py-1'
            : size === 'md'
              ? 'px-4 py-[10px]'
              : 'px-[18px] py-[10px]';

    const colorTheme = THEMES[variant] || THEMES.contained;

    return variant === 'contained' ? (
        <button
            className={`flex justify-center gap-1 ${colorTheme} ${paddingSize} ${textSize} ${fullWidth ? 'w-full' : ''} ${className}`}
            disabled={disabled ?? loading}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {loading ? (
                <Spinner size="sm" color="dark" />
            ) : (
                <>
                    {icon && (
                        <Icon
                            icon={`${icon}`}
                            width={iconSize}
                            height={iconSize}
                            className="m-auto"
                        />
                    )}
                    {text}
                </>
            )}
        </button>
    ) : variant === 'outline' ? (
        <button
            className={`flex justify-center gap-1 ${colorTheme} ${paddingSize} ${textSize} ${fullWidth && 'w-full'} ${className}`}
            disabled={disabled ?? loading}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {loading ? (
                <Spinner size="sm" color="accent" />
            ) : (
                <>
                    {icon && (
                        <Icon
                            icon={`${icon}`}
                            width={iconSize}
                            height={iconSize}
                            className="m-auto"
                        />
                    )}
                    {text}
                </>
            )}
        </button>
    ) : (
        <button
            className={`flex justify-center gap-1 ${colorTheme} ${paddingSize} ${textSize} ${fullWidth && 'w-full'} ${className}`}
            disabled={disabled ?? loading}
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            {...props}
        >
            {loading ? (
                <Spinner size="sm" color="accent" />
            ) : (
                <>
                    {icon && (
                        <Icon
                            icon={`${icon}`}
                            width={iconSize}
                            height={iconSize}
                            className="m-auto"
                        />
                    )}
                    {text}
                </>
            )}
        </button>
    );
};

export default ButtonPrimary;
