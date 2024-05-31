import React from "react";
import Pagination from "react-js-pagination";
const PaginationCom = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
}) => {
  return (
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={pageRangeDisplayed}
      onChange={onChange}
    />
  );
};

export default PaginationCom;
