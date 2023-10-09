import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import "../styles/Pagination.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const PaginationUI = ({
  setCurrentPage,
  usersPerPage,
  setData,
  currentPage,
  data,
  setSearchApiData,
  searchApiData,
}) => {
  const matches = useMediaQuery("(max-width:450px)");

  //funtinality to change the page number and make it current page.
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  //Funtinality to delete the all selected user and return the updated data.
  const handleDeleteSelected = () => {
    const updatedData = data.filter((user) => !user.checked);
    const updatedSearchApiData = searchApiData.filter((user) => !user.checked);
    setData(updatedData);
    setSearchApiData(updatedSearchApiData);
  };

  useEffect(() => {
    if (data.length) {
      if (currentPage > Math.ceil(data.length / usersPerPage)) {
        setCurrentPage(currentPage - 1);
      }
    }
  }, [currentPage, data]);

  return (
    <section className="pagination-container">
      <section className="delete-selected">
        <Button
          variant="contained"
          onClick={handleDeleteSelected}
          color="error"
          className="delete-selected-button"
        >
          Delete Selected
        </Button>
      </section>
      {/* logic to select previous page, current page and undate the state */}
      <nav className="pagination">
        <Pagination
          count={Math.ceil(data.length / usersPerPage)}
          page={currentPage}
          onChange={handleChange}
          showFirstButton
          showLastButton
          color="primary"
          size={matches ? "small" : "large"}
        />
      </nav>
    </section>
  );
};

export default PaginationUI;
