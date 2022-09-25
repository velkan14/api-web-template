import Link from "next/link";
import { useMemo } from "react";
import CartItem from "../components/cart/CartItem";
import ContentWrapper from "../components/ContentWrapper";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import useProducts from "../hooks/useProducts";
import { formatCurrency } from "../utils/currency";

function CartPage() {
  const { items } = useShoppingCart();
  const itemsIds = useMemo(() => {
    return items.map((i) => i.id);
  }, [items]);

  const { data } = useProducts({ filterIds: itemsIds });
  const { products } = data || {
    products: [],
    totalCountProducts: 0,
  };

  const price = useMemo(() => {
    return (
      products?.reduce((total, curr) => {
        const item = items.find((i) => i.id === curr.id);
        const quantity = item?.quantity || 0;
        return total + curr.price * quantity;
      }, 0) || 0
    );
  }, [items, products]);

  return (
    <ContentWrapper>
      <div className="max-w-6xl pointer-events-auto">
        <div className="flex flex-col h-full bg-white ">
          <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
            <p className="text-lg font-medium text-gray-900">Shopping cart</p>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items.map((item) => {
                    const product = products?.find((p) => p.id === item.id);

                    if (!product)
                      return (
                        <li key={item.id} className="flex py-6">
                          Loading...
                        </li>
                      );

                    return (
                      <CartItem
                        key={item.id}
                        product={product}
                        quantity={item.quantity}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formatCurrency(price)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link href="#">
                <a className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                  Checkout
                </a>
              </Link>
            </div>
            <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
              <p>
                or{" "}
                <Link href="/">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default CartPage;
