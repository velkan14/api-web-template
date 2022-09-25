import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartItem } from "../types/cart";

interface ContextProps {
  items: CartItem[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  numberItems: number;
}

// @ts-ignore
const ShoppingCartContext = createContext<ContextProps>();

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("Missing Shopping Cart Provider");
  }
  return context;
};

export const ShoppingCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

  const addToCart = (productId: string) => {
    setCart((c) => {
      if (c.find((i) => i.id === productId)) {
        return cart.map((item) => {
          if (item.id === productId)
            return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
      } else {
        return [...c, { id: productId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((c) => {
      const itemIndex = c.findIndex((i) => i.id === productId);
      if (itemIndex !== -1) {
        const newArray = [...c];
        newArray.splice(itemIndex, 1);
        return newArray;
      }
      return c;
    });
  };

  const numberItems = useMemo(
    () =>
      cart.reduce((total, item) => {
        return total + item.quantity;
      }, 0),
    [cart]
  );

  const value = {
    items: cart,
    addToCart,
    removeFromCart,
    numberItems,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
