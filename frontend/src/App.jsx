import "./App.module.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import MyShop from "./components/MyShop/MyShop";
import MyCart from "./components/MyCart/MyCart";
import AddItem from "./components/AddItem/AddItem";
import Item from "./components/Item/Item";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route exact path="/" Component={HomePage}></Route>
            <Route path="/profile" Component={Profile}></Route>
            <Route path="/myshop" Component={MyShop}></Route>
            <Route path="/mycart" Component={MyCart}></Route>
            <Route path="/additem" Component={AddItem}></Route>
            <Route path="/product" Component={Item} query="id"></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}
