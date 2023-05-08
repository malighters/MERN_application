import Wrapper from "../assets/wrappers/BigSidebar";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const {showSidebar, toogleSidebar} = useContext(AppContext);
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toogleSidebar={toogleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSidebar