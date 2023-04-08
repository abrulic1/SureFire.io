import './App.module.css';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from './components/Profile/Profile';
import MyShop from './components/MyShop/MyShop';
import Wishlist from './components/Wishlist/Wishlist';
import MyOrders from './components/MyOrders/MyOrders';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path='/' Component={Header}></Route> 
      <Route  path='/profile' Component={Profile}></Route> 
      <Route path='/myshop' Component={MyShop}></Route>
      <Route path='/wishlist' Component={Wishlist}></Route>
      <Route path='/myorders' Component={MyOrders}></Route>
   </Routes>
   </Router>
</div>
  );
}

export default App;
