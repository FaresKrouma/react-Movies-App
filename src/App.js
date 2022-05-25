import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import Trending from "./components/Trending";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Search from "./components/Search";

function App() {
   const [trendingType, setTrendingType] = useState("all");
   const [searchValue, setSearchValue] = useState("");
   const [searchType, setSearchType] = useState("");

   return (
      <BrowserRouter>
         <DivElement>
            <Header searchType={searchType} setSearchValue={setSearchValue} />
            <Route
               path="/"
               exact
               component={() => {
                  return (
                     <Trending
                        searchValue={searchValue}
                        trendingType={trendingType}
                     />
                  );
               }}
            />

            <Route
               path="/movies"
               component={() => {
                  return <Movies searchValue={searchValue} />;
               }}
            />
            <Route
               path="/tv-series"
               component={() => {
                  return <Series searchValue={searchValue} />;
               }}
            />
            <NavBar
               setTrendingType={setTrendingType}
               setSearchValue={setSearchValue}
               setSearchType={setSearchType}
            />
         </DivElement>
      </BrowserRouter>
   );
}

export default App;

const DivElement = styled.div``;
