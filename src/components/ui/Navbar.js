import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const Navbar = () => {
  const history = useHistory();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    history.replace("/login");
    dispatch({ type: types.logout });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Asociaciones
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <NavLink
              activeClassName="active"
              className="nav-link"
              exact
              to="/marvel"
            >
              Marvel
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              exact
              to="/dc"
            >
              DC
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              exact
              to="/search"
            >
              Search
            </NavLink>
          </div>
          <div className="navbar-nav">
            <span className="nav-item nav-link text-info mb-0 ">
              {user.name || "Error al obtener nombre de usuario"}
            </span>
            <button className="nav-link btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
