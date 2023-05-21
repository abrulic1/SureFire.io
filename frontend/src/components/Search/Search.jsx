import SearchStyles from "./Search.module.css";
import SearchIcon from "./search.png";
import { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const fetchFun = () => {
    console.log(searchQuery);
  };
  return (
    <div className={SearchStyles["search-bar"]}>
      <input
        type="text"
        placeholder="Search items"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => {
            fetchFun();
          }}
        ></img>
      </button>
    </div>
  );
};

export default Search;
