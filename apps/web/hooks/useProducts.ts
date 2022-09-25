import useSWR, { SWRConfiguration } from "swr";
import { Product } from "../types/product";
import { fetcher } from "../utils/fetcher";
import { API_BASE_URL } from "../utils/url";

type Args = {
  filterIds?: string[];
  props?: SWRConfiguration;
};

const useProducts = (args?: Args) => {
  const { filterIds, props } = args || {
    filterIds: undefined,
    props: undefined,
  };

  const url =
    filterIds !== undefined
      ? `${API_BASE_URL}/products?ids=${filterIds.join(",")}`
      : `${API_BASE_URL}/products`;

  const { data, mutate } = useSWR<Product[] | undefined>(
    [url, filterIds],
    fetcher,
    props
  );

  return { data, mutate };
};

export default useProducts;
