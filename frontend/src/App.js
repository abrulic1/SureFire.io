import './App.module.css';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path='/' Component={Header}></Route> 
      <Route  path='/profile' Component={Profile}></Route> 
   </Routes>
   </Router>
</div>
  );
}

export default App;
