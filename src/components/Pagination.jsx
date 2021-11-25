import React from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
   const PagesArray = [
      currentPage - 4 < totalPages && currentPage - 4,
      currentPage - 3 < totalPages && currentPage - 3,
      currentPage - 2 < totalPages && currentPage - 2,
      currentPage - 1 < totalPages && currentPage - 1,
      currentPage,
      currentPage + 1 < totalPages && currentPage + 1,
      currentPage + 2 < totalPages && currentPage + 2,
      currentPage + 3 < totalPages && currentPage + 3,
      currentPage + 4 < totalPages && currentPage + 4,
      currentPage + 5 < totalPages && currentPage + 5,
      currentPage + 6 < totalPages && currentPage + 6,
      totalPages > 7 && currentPage !== totalPages && totalPages,
   ];

   const handleClick = (e) => {
      let number = e.target.textContent;
      setCurrentPage(parseInt(number, 10));
      window.scroll(0, 0);
   };
   return (
      <DivElement>
         {totalPages > 1 && (
            <div className="pagination-container">
               {totalPages > 8 && (
                  <FaArrowLeft
                     color="crimson"
                     size="25px"
                     cursor="pointer"
                     onClick={() => {
                        currentPage !== 1 &&
                           setCurrentPage(parseInt(currentPage, 10) - 1);
                        window.scroll(0, 0);
                     }}
                  />
               )}
               {PagesArray.map((element) => {
                  return (
                     element > 0 && (
                        <span
                           className="paginate"
                           key={element}
                           style={{
                              background:
                                 currentPage === element ? "crimson" : "",
                           }}
                           onClick={handleClick}
                        >
                           {element}
                        </span>
                     )
                  );
               })}
               {totalPages > 8 && (
                  <FaArrowRight
                     cursor="pointer"
                     size="25px"
                     onClick={() => {
                        currentPage !== totalPages &&
                           setCurrentPage(parseInt(currentPage, 10) + 1);
                        window.scroll(0, 0);
                     }}
                     color="crimson"
                  />
               )}
            </div>
         )}
      </DivElement>
   );
};

export default Pagination;

const DivElement = styled.div`
   .pagination-container {
      display: flex;
      justify-content: center;
      align-items: center;
      .paginate {
         margin: 0.5rem;
         transition: 0.5s ease;
         cursor: pointer;
         font-size: 1.2rem;
         text-align: center;
         color: #eee;
         font-weight: lighter;
         height: 30px;
         width: 30px;
         border-radius: 50%;
         &:hover {
            background: #222;
         }
      }
   }
`;
