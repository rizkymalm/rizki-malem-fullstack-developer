import { useEffect, useRef, useState } from 'react';

import { ButtonText } from '../../common/buttons';

interface TabGridProps {
    options: string[];
    defaultIndex?: number;
    onChange?: (index: number) => void;
}

const TabGrid = ({ options, defaultIndex = 0, onChange }: TabGridProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [widths, setWidths] = useState<number[]>([]);

    /* ===============================
     * Measure tab widths
     =============================== */
    useEffect(() => {
        const measured = itemsRef.current.map(
            el => el?.getBoundingClientRect().width ?? 0
        );
        setWidths(measured);
    }, [options]);

    /* ===============================
     * Calculate indicator offset
     =============================== */
    const offset = widths.slice(0, activeIndex).reduce((acc, w) => acc + w, 0);

    /* ===============================
     * Handlers
     =============================== */
    const handleSelect = (index: number) => {
        const value = options[index];
        if (!value) return;

        setActiveIndex(index);
        onChange?.(index);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowRight') {
            handleSelect(Math.min(activeIndex + 1, options.length - 1));
        }
        if (e.key === 'ArrowLeft') {
            handleSelect(Math.max(activeIndex - 1, 0));
        }
    };

    /* ===============================
     * Auto scroll active tab into view
     =============================== */
    useEffect(() => {
        const activeEl = itemsRef.current[activeIndex];
        activeEl?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        });
    }, [activeIndex]);

    return (
        <div>
            <div
                className="border-accent-light/30 dark:border-accent-dark/30 relative inline-flex border-b"
                ref={containerRef}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
            >
                {options.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={item}
                            ref={el => {
                                itemsRef.current[index] = el;
                            }}
                            className="relative shrink-0"
                        >
                            <ButtonText
                                text={item}
                                type="button"
                                size="sm"
                                loading={false}
                                className={`ty-body-sm transition-colors ${
                                    isActive
                                        ? 'text-accent-light dark:text-accent-dark font-semibold'
                                        : 'text-text-dark-muted hover:text-accent-light dark:hover:text-accent-dark'
                                } `}
                                onClick={() => handleSelect(index)}
                            />
                        </div>
                    );
                })}

                {/* 🔥 Sliding underline */}
                <div
                    className="bg-accent-dark absolute bottom-0 h-0.5 transition-[transform,width] duration-300 ease-in-out"
                    style={{
                        width: widths[activeIndex],
                        transform: `translateX(${offset}px)`,
                    }}
                />
            </div>

            {/* <div className="mt-4">{options[activeIndex]}</div> */}
        </div>
    );
};

export default TabGrid;
