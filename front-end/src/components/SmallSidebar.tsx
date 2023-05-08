import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import {FaTimes} from 'react-icons/fa';
import { AppContext } from "../context/appContext";
import { useContext } from "react";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {

  const {showSidebar, toogleSidebar} = useContext(AppContext);
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toogleSidebar}> 
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toogleSidebar={toogleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar