import './App.module.css';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from './components/Profile/Profile';
import MyShop from './components/MyShop/MyShop';
import MyCart from './components/MyCart/MyCart';
import AddCollection from './components/AddCollection/AddCollection';
// import MyOrders from './components/MyOrders/MyOrders';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <Router>
      <Routes>
      <Route exact path='/' Component={Header}></Route> 
      <Route path='/profile' Component={Profile}></Route> 
      <Route path='/myshop' Component={MyShop}></Route>
      <Route path='/mycart' Component={MyCart}></Route>
      <Route path='/addcollection' Component={AddCollection}></Route>
      {/* <Route path='/myorders' Component={MyOrders}></Route> */}
   </Routes>
   </Router>
   </QueryClientProvider>
</div>
  );
}

export default App;
