import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import { VscLoading } from "react-icons/vsc";
import Pagination from "./Pagination";
import Genres from "./Genres";

const Series = ({ searchValue }) => {
   const APIKEY = "95f8742efabd7ac4a603dea27f261aec";

   const [moviesArray, setMoviesArray] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState();
   const [selectedGenres, setSelectedGenres] = useState([]);

   useEffect(() => {
      if (searchValue.length > 0) {
         fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=95f8742efabd7ac4a603dea27f261aec&language=en-US&query=${searchValue}&page=1&include_adult=true
       )}`
         )
            .then((resp) => resp.json())
            .then((respData) => {
               setMoviesArray(respData.results);
               setTotalPages(respData.total_pages);
               setIsLoaded(true);
            });
      }

      if (searchValue.length === 0) {
         fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York&with_watch_monetization_types=flatrate&page=${currentPage}&with_genres=${selectedGenres.join(
               ","
            )}`
         )
            .then((resp) => resp.json())
            .then((respData) => {
               setMoviesArray(respData.results);
               setIsLoaded(true);
               setTotalPages(respData.total_pages);
            });
      }
   }, [currentPage, selectedGenres]);
   return (
      <>
         <DivElement>
            <p className="title">📺 TV Series</p>
            <Genres
               type="tv"
               selectedGenres={selectedGenres}
               setSelectedGenres={setSelectedGenres}
               setCurrentPage={setCurrentPage}
            />

            {!isLoaded ? (
               <h1 className="loading">
                  <VscLoading className="animation" />
                  Loading..
               </h1>
            ) : moviesArray.length === 0 ? (
               <h1 className="no-results">Sorry 😓, No Results To Display.</h1>
            ) : (
               <>
                  <div className="movies-container">
                     {moviesArray.map((element) => {
                        return <MovieCard key={element.id} data={element} />;
                     })}
                  </div>
                  <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     setCurrentPage={setCurrentPage}
                  />
               </>
            )}
         </DivElement>
      </>
   );
};

export default Series;

const DivElement = styled.div`
   display: flex;
   margin: 4rem 5rem;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   /* position: relative; */
   flex-wrap: wrap;
   .no-results {
      color: white;
      font-size: 3rem;
      margin-top: 5rem;
   }

   .loading {
      margin-top: 13rem;
      color: #eee;
      display: grid;
      place-items: center;
      font-size: 5rem;
      .animation {
         animation: rotate 1.5s linear infinite;
      }
   }

   .title {
      color: white;
      font-weight: 100;
      letter-spacing: 1px;
      line-height: 1;
      text-shadow: 4px 4px rgba(0, 0, 0, 0.4);
      font-size: 2.2rem;
      margin: 1rem 0;
   }

   .movies-container {
      animation: scale 0.5s;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
   }

   @media (max-width: 1140px) {
      margin: 4rem 1rem;
   }
   @keyframes rotate {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
`;
