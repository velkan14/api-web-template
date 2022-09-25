import Link from "next/link";
import { useShoppingCart } from "../contexts/ShoppingCartContext";

export default function Nav() {
  const { numberItems } = useShoppingCart();

  return (
    <nav className="bg-gray-800">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-stretch justify-start flex-1">
            <div className="flex items-center flex-shrink-0">
              <img
                className="block w-auto h-8"
                src="/favicon.ico"
                alt="Company"
              />
            </div>
            <div className="flex ml-4 space-x-4">
              <Link href="/">
                <span className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white">
                  Store
                </span>
              </Link>
              <Link href="/cart">
                <span className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white">
                  {`Cart (${numberItems})`}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
