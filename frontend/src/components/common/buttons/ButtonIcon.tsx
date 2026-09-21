import { Icon } from '@iconify/react';
import type { JSX } from 'react';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    onClick?: () => void;
    iconSize?: number;
    type: JSX.IntrinsicElements['button']['type'];
}

const ButtonIcon = ({ icon, iconSize, type, onClick, ...props }: Props) => {
    return (
        <button
            className="flex gap-2 rounded-md border-transparent bg-transparent px-1 text-accent-dark transition-all disabled:text-textlight-muted"
            type={
                type === 'submit'
                    ? 'submit'
                    : type === 'reset'
                      ? 'reset'
                      : 'button'
            }
            onClick={onClick}
            {...props}
        >
            <Icon
                icon={`${icon}`}
                width={iconSize}
                height={iconSize}
                className="m-auto"
            />
        </button>
    );
};

export default ButtonIcon;
