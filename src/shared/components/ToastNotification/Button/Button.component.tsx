import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    children: React.ReactNode; // Kiểu dữ liệu của children là React.ReactNode
    handleClick: () => void; // Kiểu dữ liệu của handleClick là hàm không trả về
};

const Button: React.FC<ButtonProps> = ({ children, handleClick }) => (
    <button className={styles.button} onClick={handleClick}>
        {children}
    </button>
);

export default Button;
