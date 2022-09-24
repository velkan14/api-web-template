import useSWR, { SWRConfiguration } from "swr";
import { Product } from "../types/product";
import { fetcher } from "../utils/fetcher";
import { API_BASE_URL } from "../utils/url";

const useProduct = (productId: string, props?: SWRConfiguration) => {
  const { data, mutate } = useSWR<Product | undefined>(
    `${API_BASE_URL}/products/${productId}`,
    fetcher,
    props
  );

  return { data, mutate };
};

export default useProduct;
