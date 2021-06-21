import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'
import styles from '../styles/Home.module.css'
import { useCart } from "../hooks/use-cart";

const Nav = () => {
    const { subtotal, checkout } = useCart();
    return (
        <nav className={styles.nav}>
            <p>Space Jelly Shop</p>
            <p className={styles.navTitle}>
                <button onClick={checkout}>
                    <FaShoppingCart /> ${subtotal}
                </button>
            </p>
        </nav>
    );
};

export default Nav;