import type { ReactNode } from 'react';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    contentBefore?: ReactNode;
    contentAfter?: ReactNode;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string | boolean;
    align?: 'right' | 'left' | 'center';
}

const TextField = ({
    contentBefore,
    contentAfter,
    fullWidth,
    error,
    helperText,
    align,
    ...props
}: Props) => {
    return (
        <div className={`${fullWidth && 'w-full'} my-2`}>
            <span
                className={`inline-flex w-full gap-1 rounded-[4px] border px-2 ${error ? 'border-error' : 'border-neutral-200 dark:border-dark-3'} bg-light-1 transition-all focus-within:border-b-2 focus-within:border-b-accent-light-hover focus-visible:outline-none dark:bg-dark-1 dark:focus-within:border-b-accent-dark-hover`}
            >
                {contentBefore && (
                    <span className="m-auto box-border">{contentBefore}</span>
                )}
                <input
                    type="text"
                    placeholder="Username"
                    className={`${align === 'right' ? 'text-right' : align === 'left' ? 'text-left' : align === 'center' ? 'text-center' : 'text-left'} w-full rounded border border-none py-2 focus-visible:outline-none dark:bg-dark-1 dark:text-textDarkPrimary`}
                    {...props}
                />
                {contentAfter && (
                    <span className="m-auto box-border">{contentAfter}</span>
                )}
            </span>
            {error && (
                <div className="text-left text-text-xs font-medium text-error">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default TextField;
