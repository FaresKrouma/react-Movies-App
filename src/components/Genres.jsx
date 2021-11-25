import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Genres = ({
   type,
   setCurrentPage,
   setSelectedGenres,
   selectedGenres,
}) => {
   const [allGenres, setAllGenres] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [selectedGenresNames, setSelectedGenresNames] = useState([]);

   useEffect(() => {
      fetch(
         `https://api.themoviedb.org/3/genre/${type}/list?api_key=95f8742efabd7ac4a603dea27f261aec&language=en-US`
      )
         .then((resp) => resp.json())
         .then((respData) => {
            setAllGenres(respData.genres);
            setIsLoaded(true);
         });
   }, []);

   const handleAdd = (genre) => {
      setSelectedGenres([...selectedGenres, genre.id]);
      setSelectedGenresNames([...selectedGenresNames, genre]);
      setAllGenres(allGenres.filter((element) => element.id !== genre.id));
      setCurrentPage(1);
   };

   const handleRemove = (genre) => {
      //   setSelectedGenres([...selectedGenres, genre.id]);
      //   setSelectedGenresNames([...selectedGenresNames, genre.name]);
      //   setAllGenres(allGenres.filter((element) => element.id !== genre.id));
      //   setCurrentPage(1);
      //   setIsActive(!isActive);
      setSelectedGenres(
         selectedGenres.filter((element) => element !== genre.id)
      );
      setSelectedGenresNames(
         selectedGenresNames.filter((element) => element.name !== genre.name)
      );
      setAllGenres([...allGenres, genre]);
      setCurrentPage(1);
   };

   return (
      <DivElement>
         {!isLoaded ? (
            <h3 style={{ color: "#ddd", fontSize: "1.5rem" }}>Loading..</h3>
         ) : (
            <div className="genres-container">
               {selectedGenresNames.map((element, index) => {
                  return (
                     <button
                        key={index}
                        onClick={() => {
                           handleRemove(element);
                        }}
                        className="genre active"
                        value={element.id}
                     >
                        #{element.name}
                     </button>
                  );
               })}

               {allGenres.map((element) => {
                  return (
                     <button
                        key={element.id}
                        onClick={() => handleAdd(element)}
                        value={element.id}
                        className="genre"
                     >
                        #{element.name}
                     </button>
                  );
               })}
            </div>
         )}
      </DivElement>
   );
};

export default Genres;

const DivElement = styled.div`
   width: 65%;
   text-align: center;
   @media (max-width: 1650px) {
      width: 90%;
   }
   .genre {
      background-color: transparent;
      font-weight: lighter;
      font-size: 1rem;
      border: none;
      color: #eee;
      padding: 2px 5px;
      border-radius: 10px;
      margin: 3px;
      display: inline-block;
      &.active {
         background: #9653da;
         color: white;
      }
   }
`;
