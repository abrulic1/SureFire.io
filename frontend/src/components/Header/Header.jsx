import { useState } from 'react';
import HeaderStyles from './Header.module.css';
import Search from '../Search/Search';
import NavLinks from '../NavLinks/NavLinks';
import Menu from './menu.png';
import Close from './close.png';
import SideDrawer from '../SideDrawer/SideDrawer';
import Functionalities from '../ProfileFunctionalities/ProfileFunctionalities';
import EthereumIcon from './ethereum.png';
import { useNavigate } from 'react-router-dom';
import MyCart from '../MyCart/MyCart';

const Header = ({sendDataToParent})=>{
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [userFunctionalities, setUserFunctionalities] = useState(false);
  const [isCartShown, setIsCartShown] = useState(false);
  const [products, setProducts] = useState([]);
  const handleClick = () => {
    setIsShown(currentState => !currentState);
  }

  const handleClickSendToParent = (data) => {
    console.log("Uslo je u handleClickSendToParent iz Headera");
    sendDataToParent(data);
 //   console.log("PRODUCTS IZ HANDECLICKTOSENDTOPARENT: ", products);
  };

  const handleDataFromChild = (data) => {
    console.log("Uslo je u hadneDataDromChild iz Headera")

    console.log("DATA IZ HEADERA IZ HANDEDATAFROM CLILD: ", data);
    setProducts(Object.values(data));
    handleClickSendToParent(data);
  };



    return (
      <div className={HeaderStyles.header}>
        <div className={HeaderStyles.logo} onClick={()=>navigate('/')}>
          <img src={EthereumIcon} alt="Ethereum"></img>
          <h1>SureFire.io</h1>
        </div>
        <Search sendDataToParent={handleDataFromChild} />
        <NavLinks userFunctionalities={userFunctionalities} setUserFunctionalities={setUserFunctionalities} setIsCartShown={setIsCartShown}/>
        <button className={HeaderStyles.menu} onClick={handleClick}>
          {isShown ? <img src={Close}></img> : <img src={Menu}></img>}
        </button>
        {isShown && (<SideDrawer />)}
        {userFunctionalities  && <Functionalities userFunctionalities={userFunctionalities} setUserFunctionalities={setUserFunctionalities}/>}
        {isCartShown && <MyCart setIsCartShown={setIsCartShown}/>}
      </div>
    );
}


export default Header;