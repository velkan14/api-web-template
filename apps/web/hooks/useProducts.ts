import useSWR, { SWRConfiguration } from "swr";
import { Product } from "../types/product";
import { fetcher } from "../utils/fetcher";
import { API_BASE_URL } from "../utils/url";

const useProducts = (props?: SWRConfiguration) => {
  const { data, mutate } = useSWR<Product[] | undefined>(
    `${API_BASE_URL}/products`,
    fetcher,
    props
  );

  console.log(data);
  return { data, mutate };
};

export default useProducts;
