import { useState, createContext, useContext, useEffect } from 'react'
import products from "../products.json";
import {initiateCheckout} from "../lib/payment";


export const CartContext = createContext();

export function useCartState() {
    const defaultCart = {
        products: {}
    }

    const [ cart, updateCart ] = useState(defaultCart);

    useEffect(() => {
        const stateFromStorage = localStorage.getItem("spacejelly_cart");
        const data = stateFromStorage && JSON.parse(stateFromStorage);
        data && updateCart(data);
    }, [])

    useEffect(() => {
        const data = JSON.stringify(cart);
        localStorage.setItem("spacejelly_cart", data)
    }, [cart]);

    const cartItems = Object.keys(cart.products).map(key => {
        const product = products.find(({ id }) => `${id}` === `${key}`);
        return {
            ...cart.products[key],
            pricePerItem: product.price
        }
    });

    const subtotal = cartItems.reduce((accumulator, { pricePerItem, quantity}) => {
        return accumulator + pricePerItem * quantity
    }, 0);

    const totalItems = cartItems.reduce((accumulator, { quantity}) => {
        return accumulator +  quantity
    }, 0);


    function addToCart({ id } = {}) {
        updateCart(prev => {
            const cartState = {...prev};

            if(cartState.products[id]) {
                cartState.products[id].quantity = cartState.products[id].quantity + 1;
            } else {
                cartState.products[id] = {
                    id,
                    quantity: 1
                }
            }
            return cartState
        })
    }

    function checkout() {
        initiateCheckout({
            lineItems: cartItems.map(item => {
                return {
                    price: item.id,
                    quantity: item.quantity
                }
            })
        })
    }

    return {
       subtotal,
       totalItems,
       addToCart,
       checkout,
    }
}

export const useCart = () => {
    const cart = useContext(CartContext);
    return cart;
}
