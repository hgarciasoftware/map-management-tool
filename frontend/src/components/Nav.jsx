import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid justify-content-end">
        <ul className="navbar-nav">
          <NavLink to="/" className="nav-link">
            <li className="nav-item">HOME</li>
          </NavLink>
          <NavLink to="map" className="nav-link">
            <li className="nav-item">CHOROPLETH</li>
          </NavLink>
          <NavLink to="admin" className="nav-link">
            <li className="nav-item">ADMIN</li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
