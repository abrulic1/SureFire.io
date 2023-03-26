import './Search.css';
import SearchIcon from './search.png';
const Search = ()=>{
    return (
        <div className="search-bar">
        <input type="text" placeholder="Search items" />
        <button type='submit'><img src={SearchIcon} alt="Search"></img></button>
      </div>
    )
}


export default Search;