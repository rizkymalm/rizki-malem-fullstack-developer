import { Icon } from '@iconify/react';
import { useState } from 'react';

import { ButtonIcon } from '../buttons';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    helperText?: string | boolean;
    fullWidth?: boolean;
}

const TextFieldPassword = ({
    error,
    helperText,
    fullWidth,
    ...props
}: Props) => {
    const [visible, setVisible] = useState(false);
    const handleVisibilityPassword = () => {
        setVisible(!visible);
    };
    return (
        <div className={`${fullWidth && 'w-full'} my-2`}>
            <span
                className={`inline-flex w-full gap-1 rounded-sm border px-2 ${error ? 'border-error' : 'dark:border-dark-3 border-neutral-200'} bg-light-1 focus-within:border-b-accent-light-hover dark:bg-dark-1 dark:focus-within:border-b-accent-dark-hover transition-all focus-within:border-b-2 focus-visible:outline-none`}
            >
                <span className="m-auto box-border">
                    <Icon
                        icon="mdi:password-outline"
                        width="16"
                        height="16"
                        className="dark:text-textDarkTertiary"
                    />
                </span>
                <input
                    {...props}
                    type={visible ? 'text' : 'password'}
                    className={`${fullWidth && 'w-full'} dark:border-dark-3 dark:bg-dark-1 dark:text-textDarkPrimary py-2 focus-visible:outline-none`}
                />
                <ButtonIcon
                    icon={visible ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                    iconSize={16}
                    type="button"
                    onClick={handleVisibilityPassword}
                />
            </span>
            {error && (
                <div className="text-text-xs text-error text-left font-medium">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default TextFieldPassword;
