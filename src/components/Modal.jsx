import React, { useEffect, useState } from "react";
import { FaCheckSquare, FaWindowClose, FaYoutube } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import styled from "styled-components";

const Modal = ({ id, type, setShowModal }) => {
   const [movieData, setMovieData] = useState({});
   const [movieVideo, setMovieVideo] = useState({});
   const [movieCredit, setMovieCredit] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const IMGAPI = "https://image.tmdb.org/t/p/w500/";

   useEffect(() => {
      fetch(
         `https://api.themoviedb.org/3/${type}/${id}?api_key=95f8742efabd7ac4a603dea27f261aec&language=en-US`
      )
         .then((resp) => resp.json())
         .then((respData) => {
            setMovieData(respData);
            setIsLoaded(true);
         });

      fetch(
         `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=95f8742efabd7ac4a603dea27f261aec&language=en-US`
      )
         .then((resp) => resp.json())
         .then((respData) => setMovieVideo(respData.results[0]));

      fetch(
         `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=95f8742efabd7ac4a603dea27f261aec&language=en-US`
      )
         .then((resp) => resp.json())
         .then((respData) => setMovieCredit(respData.cast));
   }, []);

   const {
      genres,
      number_of_seasons,
      number_of_episodes,
      name,
      production_companies,
      overview,
      poster_path,
      release_date,
      first_air_date,
      last_air_date,
      networks,
      tagline,
      vote_count,
      vote_average,
      title,
      status,
   } = movieData;

   return (
      <DivElement onClick={() => setShowModal(false)}>
         <div className="modal-container">
            {!isLoaded ? (
               <div className="modal-loading">
                  <h1>
                     <VscLoading className="animation" /> Loading..
                  </h1>
               </div>
            ) : (
               <>
                  <div className="modal-image-container">
                     <img src={IMGAPI + poster_path} alt="" />
                  </div>
                  <div className="modal-info-container">
                     <h1 className="modal-title">
                        {title || name}{" "}
                        {tagline && <p className="tagline">" {tagline} "</p>}
                     </h1>
                     {genres && (
                        <div className="modal-genres">
                           {genres.map((element) => (
                              <span key={element.id} className="modal-genre">
                                 #{element.name}
                                 {"  "}
                              </span>
                           ))}
                        </div>
                     )}
                     <div className="votes">
                        <b>Rating :</b> {vote_average}/10 out of {vote_count}{" "}
                        votes.
                     </div>
                     {networks && (
                        <div className="networks">
                           <span>
                              <b>Networks :</b>{" "}
                              {networks.map((element) => (
                                 <span key={element.name} className="network">
                                    {element.name}{" "}
                                 </span>
                              ))}
                           </span>
                        </div>
                     )}
                     {production_companies && type === "movie" && (
                        <div className="networks">
                           <span>
                              <b>Product Of :</b>
                              {production_companies.map((element) => (
                                 <span key={element.name} className="network">
                                    {element.name}.
                                 </span>
                              ))}
                           </span>
                        </div>
                     )}
                     {type === "tv" && (
                        <div className="series-subInfo">
                           <span className="episodes">
                              <b>Total Episodes :</b>
                              {number_of_episodes}
                           </span>
                           <span className="seasons">
                              <b>Total Seasons :</b> {number_of_seasons}
                           </span>
                        </div>
                     )}

                     <div className="release-date">
                        {type === "movie" && (
                           <span>
                              <b>Release Date :</b>
                              {release_date}
                           </span>
                        )}
                        {type === "tv" && (
                           <>
                              <span className="series-subInfo">
                                 <b>First Air Date :</b>
                                 {first_air_date}
                              </span>
                              <span className="series-subInfo">
                                 <b>Last Air Date :</b>
                                 {last_air_date}
                              </span>
                              <span className="series-subInfo">
                                 <b>Ended ? </b>
                                 {status === "Ended" ? (
                                    <FaCheckSquare
                                       className="ended"
                                       color="limegreen"
                                    />
                                 ) : (
                                    <FaWindowClose
                                       className="ended"
                                       color="red"
                                    />
                                 )}
                              </span>
                           </>
                        )}
                     </div>
                     <div className="modal-overview">
                        <h3 className="overview-title">Overview :</h3>
                        {overview}
                     </div>
                     <div className="credit-container">
                        {movieCredit.map((element) => (
                           <div key={element.id} className="credit">
                              <img
                                 src={`https://image.tmdb.org/t/p/w200${element.profile_path}`}
                                 alt=""
                              />
                              <p>{element.name}</p>
                           </div>
                        ))}
                     </div>
                     <div
                        className={
                           movieVideo !== undefined
                              ? "youtube-link"
                              : "youtube-link in-active"
                        }
                     >
                        <a
                           target="_blank"
                           href={
                              movieVideo !== undefined
                                 ? `https://www.youtube.com/watch?v=${movieVideo.key}`
                                 : `https://www.youtube.com/results?search_query=${
                                      title || name
                                   } trailer`
                           }
                        >
                           <FaYoutube className="youtube-icon" size="40px" />{" "}
                           {movieVideo !== undefined
                              ? "Click to Watch Trailer"
                              : "Click to Search Trailer"}
                        </a>
                     </div>
                  </div>
               </>
            )}
         </div>
      </DivElement>
   );
};

export default Modal;

const DivElement = styled.div`
   .modal-loading {
      text-align: center;
      font-size: 1.5rem;
      grid-column: 1/-1;
      padding: 2rem 0;
      .animation {
         animation: rotate 1s infinite linear;
      }
   }
   position: fixed;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   color: #eee;
   z-index: 500;
   height: 100%;
   width: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   animation: scale 0.4s ease;
   .modal-container {
      background-color: rgba(0, 0, 0, 0.65);
      overflow: hidden;
      border-radius: 10px;
      width: 1400px;
      box-shadow: 0 0 10px 2px rgba(143, 143, 143, 0.7);
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: 1fr;
   }

   .modal-image-container {
      img {
         display: block;
         width: 100%;
         object-fit: cover;
      }
   }
   .modal-info-container {
      padding: 0.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      line-height: 1.4;
      text-align: center;
      /* align-items: center; */
      justify-content: space-evenly;
      overflow: hidden;
      b {
         color: #868686;
         margin-right: 0.3rem;
         text-shadow: 3px 3px 2px rgba(59, 59, 59, 0.521);
      }
      .tagline {
         color: #888;
         font-size: 1.2rem;
      }
      .modal-genres .modal-genre {
         color: #b27aeb;
         margin-left: 15px;
         /* margin-top: 0.3rem; */
         display: inline-block;
         font-size: 1.1rem;
      }
      .votes,
      .release-date {
         font-size: 1.2rem;
      }
      .network {
         margin: 0 0.25rem;
      }

      .series-subInfo {
         margin-right: 1rem;
         display: inline-flex;
         justify-content: center;
         align-items: center;
         .ended {
            margin-left: 0.2rem;
         }
      }
      .episodes {
         margin-right: 1rem;
      }

      .modal-overview {
         font-size: 1.15rem;
         padding: 0.5rem;
         box-shadow: 0 0 10px 2px rgba(3, 3, 3, 0.322) inset;
         border-radius: 15px;
         min-height: 170px;
         font-weight: lighter;
         background-color: rgba(63, 63, 63, 0.8);
         .overview-title {
            font-size: 2rem;
         }
      }
      .credit-container {
         display: flex;
         overflow: auto;
         /* padding-bottom: 10px; */
         .credit {
            margin: 0 5px 3px;
         }
         &::-webkit-scrollbar {
            background: transparent;
            height: 10px;
            border-radius: 5px;
         }

         &::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 5px;
         }
         .credit img {
            height: 90px;
            width: 90px;
            object-fit: cover;
            /* margin: 0 5px; */
            border-radius: 50%;
         }
         .credit p {
            /* padding: 0 3px; */
         }
      }
      .youtube-link {
         border-radius: 15px;
         background-color: #ff3d3de6;
         box-shadow: 0 0 8px 2px rgba(255, 64, 64, 0.671);
         &.in-active {
            background: #ffb84edd;
            box-shadow: 0 0 8px 2px rgba(109, 109, 109, 0.568);
         }
         a {
            text-decoration: none;
            color: #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            padding: 10px;
         }
         .youtube-icon {
            margin-right: 10px;
         }
      }
   }
`;
