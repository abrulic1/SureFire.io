import React from "react";
import './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search/Search'
const Home = ()  => {
   return(
    <div className="d-flex justify-content-center home">
    <Search />
    <p>Nesto</p>
    </div>
   )
}


export default Home; 