import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";

const Page = ({ index }) => {
  const { data } = useProducts({ skip: index });

  if (data === undefined) return <p>Loading ...</p>;
  const { products } = data;

  return (
    <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
export default Page;
