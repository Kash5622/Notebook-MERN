import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Nav() {
  let location = useLocation();
  const handleClick=()=>{
    localStorage.removeItem("Auth-Token");
  }
  // React.useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Notebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About us</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact us</Link>
              </li>
            </ul>
            {!localStorage.getItem("Auth-Token")?
            <div>
            <Link className="btn btn-success mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-warning mx-1" to="/signup" role="button">Sign Up</Link>
            </div> : <Link className="btn btn-danger mx-1" onClick={handleClick}  to="/login" role="button">Logout</Link>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav