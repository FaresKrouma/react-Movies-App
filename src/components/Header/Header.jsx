import React, { useState } from "react";
import styled from "styled-components";
import headerImage from "./animal-kingdom.png";
import { RiSearchLine } from "react-icons/ri";

const Header = ({ setSearchValue, searchType }) => {
  const [search, setSearch] = useState("");

  return (
    <HeaderElement className="header">
      <div className="header-title">
        <h1>
          Movie<span>Gator </span>
        </h1>
        <img src={headerImage} alt="aligator image" />
        <h2> Entertainment</h2>
      </div>
      <form
        className="search-container"
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(search);
          setSearch("");
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={`Search ${searchType} Here`}
        />
        <button>
          <RiSearchLine size="25px" />
        </button>
      </form>
    </HeaderElement>
  );
};

export default Header;

const HeaderElement = styled.header`
  display: flex;
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.4);
  padding: 6px 0;
  letter-spacing: 1px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background: #25252557;
  font-size: 1.3rem;
  align-items: center;
  justify-content: space-evenly;
  line-height: 1;
  :hover .search-container input {
    width: 300px;
    cursor: text;
    background-color: rgba(0, 0, 0, 0.279);
  }

  .header-title {
    display: flex;
    align-items: center;
    h1 {
    }
    span {
      color: crimson;
    }
    h2 {
      color: #ddd;
      margin: 5px 0 0 5px;
    }
    img {
      height: 40px;
      width: 40px;
      margin: 0 0.3rem;
      vertical-align: baseline;
      display: inline;
    }
  }
  .search-container {
    display: flex;
    align-items: center;

    input {
      border: none;
      letter-spacing: 0.7px;
      width: 0;
      background: transparent;
      padding: 5px 10px;
      height: 40px;
      font-size: 1rem;
      border-radius: 15px;
      text-transform: capitalize;
      color: #ddd;
      cursor: default;
      /* animation: slide-in 0.7s ease forwards; */
      transition: 0.7s;
      &.active {
        cursor: text;
        background-color: rgba(0, 0, 0, 0.279);
        width: 300px;
      }
      :focus {
        outline: none;
        cursor: text;
        background-color: rgba(0, 0, 0, 0.279);
        width: 300px;
      }
      ::placeholder {
        color: #aaa;
        font-weight: lighter;
        font-size: 1rem;
      }
    }
    button {
      background: transparent;
      display: flex;
      align-items: center;
      border: none;
      margin: 0.6rem 0.5rem 0.4rem;
      transition: 0.7s ease;
      cursor: pointer;
      color: white;
      span {
        color: #ddd;
        transition: 0.7s all;
        margin-left: 0.3rem;
        &.active {
          color: transparent;
        }
      }
    }
  }
  @media (max-width: 900px) {
    .header-title h2 {
      display: none;
      color: black;
    }
    .search-container input.active {
      width: 200px;
    }
  }
`;
