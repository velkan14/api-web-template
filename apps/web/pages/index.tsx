import { useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import ProductItem from "../components/ProductItem";
import useProducts from "../hooks/useProducts";

export default function Web() {
  const { data: products } = useProducts();

  return (
    <ContentWrapper>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Amazing Products!
      </h2>

      {products !== undefined ? (
        <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </ContentWrapper>
  );
}
