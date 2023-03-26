import { useState } from 'react';
import './Header.css';
import Search from '../Search/Search';
import NavLinks from '../NavLinks/NavLinks';
import Menu from './menu.png';
import Close from './close.png';
import SideDrawer from '../SideDrawer/SideDrawer';
import EthereumIcon from './ethereum.png';

const Header = ()=>{
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown(currentState => !currentState);
  }

    return (
      <div className="header">
        <div className='logo'>
          <img src={EthereumIcon} alt="Ethereum"></img>
          <h1>ETHin</h1>
        </div>
        <Search />
        <NavLinks />
        <button className='menu' onClick={handleClick}>
          {isShown ? <img src={Close}></img> : <img src={Menu}></img>}
        </button>
        {isShown && (<SideDrawer />)}
      </div>
    );
}


export default Header;