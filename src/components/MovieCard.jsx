import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const MovieCard = ({
   data: {
      id,
      title,
      original_name,
      first_air_date,
      poster_path,
      vote_average,
      release_date,
   },
}) => {
   const IMGAPI = "https://image.tmdb.org/t/p/w300/";
   const [showModal, setShowModal] = useState(false);

   return (
      <>
         <DivElement onClick={() => setShowModal(true)}>
            <span
               style={{
                  backgroundColor:
                     vote_average > 8
                        ? "#55ff7a"
                        : vote_average < 5.5
                        ? "#fdff7e"
                        : "#ffb81edf",
               }}
               className="vote-count"
            >
               {vote_average > 0 && vote_average.toFixed(1)}
            </span>
            <div className="image-container">
               <img src={IMGAPI + poster_path} alt={`${title} Movie poster`} />
            </div>
            <div className="movie-title">
               <h3>{title || original_name}</h3>
            </div>
            <div className="info-container">
               <h4>{release_date || first_air_date}</h4>
               <span>#{first_air_date ? "TvSeries" : "Movie"}</span>
            </div>
         </DivElement>
         {showModal && (
            <Modal
               setShowModal={setShowModal}
               type={!first_air_date ? "movie" : "tv"}
               id={id}
            />
         )}
      </>
   );
};

export default MovieCard;

const DivElement = styled.div`
   width: 304px;
   background: #222;
   color: #eee;
   position: relative;
   box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
   border-radius: 10px;
   margin: 0.5rem 1rem;
   transition: 0.3s;
   :hover {
      transform: scale(1.05);
      background-color: #eee;
      color: black;
   }
   .vote-count {
      position: absolute;
      top: -5px;
      right: -5px;
      border-radius: 50%;
      color: black;
      font-size: 1.2rem;
      padding: 5px;
   }
   .image-container {
      padding: 2px;
      img {
         border-radius: 15px 15px 5px 5px;
         object-fit: cover;
      }
   }
   .movie-title {
      padding-left: 0.5rem;
      text-align: center;
      line-height: 1.1;
      letter-spacing: 0.5px;
   }
   .info-container {
      display: flex;
      justify-content: space-between;
      text-transform: capitalize;
      color: #aaa;
      padding: 0.5rem 0.8rem;
   }
`;
