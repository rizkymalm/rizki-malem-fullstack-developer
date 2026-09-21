import React from 'react';

interface Props {
    value: number;
    index: number;
    children: React.ReactNode;
}

const TabContent = ({ value, index, children }: Props) => {
    return value === index && <div>{children}</div>;
};

export default TabContent;
