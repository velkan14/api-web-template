import useSWR, { SWRConfiguration } from "swr";
import { Product } from "../types/product";
import { fetcher } from "../utils/fetcher";
import { API_BASE_URL } from "../utils/url";
import buildUrl from "build-url";

type Args = {
  filterIds?: string[];
  skip?: number;
  props?: SWRConfiguration;
};

const useProducts = (args?: Args) => {
  const { filterIds, skip, props } = args || {
    filterIds: undefined,
    skip: undefined,
    props: undefined,
  };

  const url = buildUrl(`${API_BASE_URL}/products`, {
    queryParams: {
      ...(filterIds && { ids: filterIds }),
      ...(skip && { skip: String(skip) }),
    },
  });

  const { data, mutate } = useSWR<
    { products: Product[]; totalCountProducts: number } | undefined
  >([url, filterIds], fetcher, props);

  return { data, mutate };
};

export default useProducts;
