import React from "react";
import styled from "styled-components";
import { FaHotjar, FaSearch } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import { BiCameraMovie } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavBar = ({ setTrendingType, setSearchValue, setSearchType }) => {
   return (
      <NavElement>
         <Link
            onClick={() => {
               window.scroll(0, 0);
               setSearchValue("");
               setSearchType("");
            }}
            to="/"
            className="nav-tab"
         >
            <div>
               <div className="popup-selection">
                  <p
                     onClick={() => {
                        setTrendingType("movie");
                     }}
                  >
                     Movies
                  </p>
                  <p
                     onClick={() => {
                        setTrendingType("tv");
                     }}
                  >
                     Tv-Series
                  </p>
                  <p
                     onClick={() => {
                        setTrendingType("all");
                     }}
                  >
                     Both
                  </p>
               </div>
               <FaHotjar color="crimson" size="25px" />
               <p> Trending</p>
            </div>
         </Link>
         <Link
            onClick={() => {
               setSearchType("Movies");
               setSearchValue("");
               window.scroll(0, 0);
            }}
            to="movies"
            className="nav-tab"
         >
            <div>
               <BiCameraMovie color="crimson" size="25px" />
               <p> Movies</p>
            </div>
         </Link>
         <Link
            onClick={() => {
               setSearchType("TV-Series");
               setSearchValue("");
               window.scroll(0, 0);
            }}
            to="tv-series"
            className="nav-tab"
         >
            <div>
               <FiMonitor color="crimson" size="25px" />
               <p> TV Series</p>
            </div>
         </Link>
      </NavElement>
   );
};

export default NavBar;

const NavElement = styled.nav`
   bottom: 0px;
   background: #2525258a;
   display: flex;
   box-shadow: 0 -2px 5px 2px rgba(0, 0, 0, 0.4);
   justify-content: center;
   z-index: 100;
   align-items: center;
   width: 100%;
   position: fixed;
   .nav-tab {
      line-height: 0.7;
      text-align: center;
      padding: 3px 0 9px 0;
      color: white;
      position: relative;
      width: 22%;
      text-decoration: none;
      cursor: pointer;
      font-size: 1.3rem;
      height: 100%;
      transition: 0.31s ease;
      :hover {
         transform: scale(1.2);
         :first-child {
            .popup-selection {
               display: block;
            }
         }
      }
   }
   .popup-selection {
      position: absolute;
      background: rgba(34, 34, 34, 0.3);
      line-height: 1.3;
      bottom: 30px;
      border-radius: 25px;
      animation: scale 0.5s;
      font-size: 1rem;
      left: 45px;
      display: none;
      font-weight: lighter;
      padding: 5px;
      p:hover {
         color: crimson;
      }
   }
   @media (max-width: 1100px) {
      .nav-tab {
         width: 33%;
         font-size: 1rem;
      }
      .popup-selection {
         font-size: 0.8rem;
      }
   }
   @keyframes scale {
      0% {
         transform: scale(0);
      }
      100% {
         transform: scale(1);
      }
   }
`;
