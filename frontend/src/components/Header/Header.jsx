import { useState } from 'react';
import HeaderStyles from './Header.module.css';
import Search from '../Search/Search';
import NavLinks from '../NavLinks/NavLinks';
import Menu from './menu.png';
import Close from './close.png';
import SideDrawer from '../SideDrawer/SideDrawer';
import Functionalities from '../ProfileFunctionalities/ProfileFunctionalities';
import EthereumIcon from './ethereum.png';

const Header = ()=>{
  const [isShown, setIsShown] = useState(false);
  const [userFunctionalities, setUserFunctionalities] = useState(false);
  const handleClick = () => {
    setIsShown(currentState => !currentState);
  }

    return (
      <div className={HeaderStyles.header}>
        <div className={HeaderStyles.logo}>
          <img src={EthereumIcon} alt="Ethereum"></img>
          <h1>SureFire.io</h1>
        </div>
        <Search />
        <NavLinks userFunctionalities={userFunctionalities} setUserFunctionalities={setUserFunctionalities}/>
        <button className={HeaderStyles.menu} onClick={handleClick}>
          {isShown ? <img src={Close}></img> : <img src={Menu}></img>}
        </button>
        {isShown && (<SideDrawer />)}
        {userFunctionalities  && <Functionalities userFunctionalities={userFunctionalities} setUserFunctionalities={setUserFunctionalities}/>}
      </div>
    );
}


export default Header;