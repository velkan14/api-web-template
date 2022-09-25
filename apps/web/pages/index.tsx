import { useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import ProductsList from "../components/ProductsList";
import ReactPaginate from "react-paginate";
import useProducts from "../hooks/useProducts";

export default function Web() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useProducts();

  const handlePageClick = (event) => {
    setPageIndex(event.selected + 1);
  };

  const active =
    "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20";
  const defaultClassname =
    "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20";

  return (
    <ContentWrapper>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Amazing Products!
      </h2>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={data ? data.totalCountProducts / data.products.length : 0}
        previousLabel="Previous"
        containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
        activeLinkClassName={active}
        pageLinkClassName={defaultClassname}
        breakLinkClassName={defaultClassname}
        nextLinkClassName={`rounded-r-md ${defaultClassname}`}
        previousLinkClassName={`rounded-l-md ${defaultClassname}`}
      />
      <div>
        <ProductsList index={pageIndex} />
        {/* Pre fetch the next page */}
        <div style={{ display: "none" }}>
          <ProductsList index={pageIndex + 1} />
        </div>
      </div>
    </ContentWrapper>
  );
}
