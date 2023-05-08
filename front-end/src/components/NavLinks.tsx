import { NavLink } from "react-router-dom";
import { MouseEventHandler } from "react";
import links from "../utils/links";

const NavLinks = ({toogleSidebar}: {toogleSidebar: MouseEventHandler | undefined}) => {
  return(
    <div className="nav-links">
      {links.map(link => {
        const { id, name, path } = link;
        const Icon = link.icon;
        return( 
          <NavLink 
          key={id} 
          to={path} 
          onClick={toogleSidebar} 
          className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="icon"><Icon/></span>
            { name }
          </NavLink>
        )
      })
    }
    </div>
  )
}

export default NavLinks;