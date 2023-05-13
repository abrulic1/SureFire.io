import SearchStyles from './Search.module.css';
import SearchIcon from './search.png';
import axios from 'axios';
import { useState } from 'react';

const Search = ({sendDataToParent})=>{
  const [searchQuery, setSearchQuery] = useState('');

  const searchItems = async (input)=>{
    const response = await fetch(`${process.env.INFURA_API_URL}`)
    const data = await response.json();
    console.log(data);
  }
  
  const fetchFun = async () => {
    const response = await fetch(`http://localhost:5000/api/products/products/?name=${encodeURIComponent(searchQuery)}`);
    const responseData = await response.json();
    sendDataToParent(responseData.products);
    console.log("RESPONSE DATA IS: ", responseData.products);
  }

  return (
        <div className={SearchStyles['search-bar']}>
        <input type="text" placeholder="Search items" onChange={(e) => setSearchQuery(e.target.value)}/>
        <button type='submit'><img src={SearchIcon} alt="Search" onClick={()=>{fetchFun()}}></img></button>
      </div>
    )
}


export default Search;