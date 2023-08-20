import React from "react";
import Pagination from "react-js-pagination";
import "./Paging.css";

const Paging = (props) => {
  return (
    <div>
      <Pagination
        activePage={props.page}
        itemsCountPerPage={5}
        totalItemsCount={props.count}
        pageRangeDisplayed={3}
        onChange={props.setPage}
        hideNavigation
        hideDisabled
        hideFirstLastPages
      />
    </div>
  );
};

export default Paging;
