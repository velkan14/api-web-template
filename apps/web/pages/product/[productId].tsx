import { useShoppingCart } from "../../contexts/ShoppingCartContext";
import useProduct from "../../hooks/useProduct";
import { formatCurrency } from "../../utils/currency";

export default function ProductPage({ productId }) {
  const { addToCart } = useShoppingCart();

  const { data: product } = useProduct(productId);

  const onAddToCart = () => {
    addToCart(productId);
  };

  if (!product) return null;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="max-w-sm mx-auto mt-6 sm:px-6">
          <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-4 ">
            <img
              src={product.imageSrc}
              alt={product.name}
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {formatCurrency(product.price)}
            </p>

            <button
              type="submit"
              onClick={onAddToCart}
              className="items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md mt-10flex hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { productId } = context.query;

  return {
    notFound: typeof productId !== "string" && productId.length === 0,
    props: {
      productId,
    },
  };
}
