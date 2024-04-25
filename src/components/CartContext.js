import React, {createContext, useState, useContext} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const alreadyInCart = (idOfItem) => {
        return !!cartItems.find(((i) => i.id === idOfItem))
    }
    const addItemToCart = (item) => {
        if (alreadyInCart(item.id)) {
            //quantiter
            const newCartItems = cartItems.map((e) => {
                if (e.id === item.id) {
                    e.quantity = e.quantity ? e.quantity + 1 : 1
                }
                return e
            })
            setCartItems(newCartItems);

        } else {
            setCartItems([...cartItems, {...item,quantity:1}]);
        }
    };

    const removeItemFromCart = (item) => {
        const newCartItems = cartItems.filter((e) => {
            if (e.id === item.id) {
                if (e.quantity - 1 === 0) {
                    return false;
                } else {
                    e.quantity = e.quantity - 1;
                }
            }
            return true;
        });

        setCartItems(newCartItems);
    };

    const clearCart = () => {
        setCartItems( []);
    }

    return (
        <CartContext.Provider value={{cartItems, addItemToCart, removeItemFromCart,clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
