import Link from "next/link";

const navigation = [
  { name: "Store", href: "/", current: true },
  { name: "Cart", href: "/cart", current: false },
];

export default function Nav() {
  return (
    <nav className="bg-gray-800">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-stretch justify-start flex-1">
            <div className="flex items-center flex-shrink-0">
              <img
                className="block w-auto h-8"
                src="/favicon.ico"
                alt="Your Company"
              />
            </div>
            <div className="flex ml-4 space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                >
                  <span className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
