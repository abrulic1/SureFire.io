import SearchStyles from './Search.module.css';
import SearchIcon from './search.png';
const Search = ()=>{
  
  const searchItems = async (input)=>{
    const response = await fetch(`${process.env.INFURA_API_URL}`)
    const data = await response.json();
    console.log(data);
}

    return (
        <div className={SearchStyles['search-bar']}>
        <input type="text" placeholder="Search items" />
        <button type='submit'><img src={SearchIcon} alt="Search" onClick={searchItems}></img></button>
      </div>
    )
}


export default Search;