import Link from "next/link";
import { useShoppingCart } from "../../contexts/ShoppingCartContext";
import { Product } from "../../types/product";
import { formatCurrency } from "../../utils/currency";
import { creator } from "../../utils/fetcher";
import { API_BASE_URL } from "../../utils/url";

type Props = {
  product: Product;
  quantity: number;
};

const CartItem = ({ product, quantity }: Props) => {
  const { removeFromCart } = useShoppingCart();

  const onRemoveItem = (productId: string) => {
    removeFromCart(productId);
    creator(`${API_BASE_URL}/products/${productId}/cartRemoved`);
  };

  return (
    <li className="flex py-6">
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-1 ml-4">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`product/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="ml-4">{formatCurrency(product.price)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between flex-1 text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => onRemoveItem(product.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
