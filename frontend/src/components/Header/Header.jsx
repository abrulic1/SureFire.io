import './Header.css';
import Search from '../Search/Search';
import ProfileImage from './profile.png';
import Cart from './cart.png'

const Header = ()=>{
    return (
      <div className="header">
        <h1>Naslov</h1>
        <Search />
        <div className='images-actions'>
        <button><img src={ProfileImage} alt="Profile image"></img></button>
       <button><img src={Cart} alt="Cart image"></img></button>
        <div className="transactions-picture-button"></div>
        </div>
      </div>
    );
}


export default Header;