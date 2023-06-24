import SearchStyles from "./Search.module.css";
import SearchIcon from "./search.png";
import React, { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchFun = () => {
    console.log(searchQuery);
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    localStorage.setItem("search", searchQuery);
    if (!searches.includes(searchQuery)) {
      searches.push(searchQuery);
      localStorage.setItem("searches", JSON.stringify(searches));
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (e.target.value == '')
      setShowSuggestions(false);
    else setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    localStorage.setItem("search", suggestion);
    console.log("have a nice day");
  };
  
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  const searchSuggestions = searches.filter((item) =>
    item.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className={SearchStyles["search-bar"]}>
      <input
        type="text"
        placeholder="Search items"
        onChange={handleInputChange}
        value={searchQuery}
      />
      <button type="submit">
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => {
            fetchFun();
            setShowSuggestions(false);
          }}
        ></img>
      </button>
      {showSuggestions && searchSuggestions.length > 0 && (
        <ul className={SearchStyles["suggestions-list"]}>
          {searchSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
