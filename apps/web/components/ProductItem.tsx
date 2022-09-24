import Link from "next/link";
import { Product } from "../types/product";
import { formatCurrency } from "../utils/currency";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="relative group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="object-cover object-center w-full h-full lg:h-full lg:w-full"
        />
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${product.id}`}>
              <span
                aria-hidden="true"
                className="absolute inset-0 cursor-pointer"
              />
            </Link>
            {product.name}
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {formatCurrency(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
