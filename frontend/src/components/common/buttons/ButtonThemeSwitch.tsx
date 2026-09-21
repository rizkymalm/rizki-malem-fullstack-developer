import ButtonToggle from './ButtonToggle';

const ButtonThemeSwitch = ({
    theme,
    onClick,
}: {
    theme: string;
    onClick: () => void;
}) => {
    const isChecked = theme === 'dark';

    return <ButtonToggle isChecked={isChecked} onClick={onClick} />;
};

export default ButtonThemeSwitch;
