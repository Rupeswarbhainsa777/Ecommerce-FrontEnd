import './MenuBar.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {assets} from "../../assets/assets.js";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";

const Menubar = () => {

    const navigate = useNavigate();
    const location = useLocation();


    const {setAuthData,auth} = useContext(AppContext);
     const logout = () => {


                   localStorage.removeItem("token");
                   localStorage.removeItem("role");
                   setAuthData(null,null);
                   navigate("/login");

    }
      const isActive =(path)=>{
         return location.pathname === path;
      }

      const isAdmin = auth.role === 'ROLE_ADMIN';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <a className="navbar-brand" href="#">
                <img
                    src="https://www.svgrepo.com/show/303109/adobe-xd-logo.svg"
                    alt="Adobe XD Logo"
                    height="40"
                />
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-2" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/dashboard') ? 'fw-bold text-primary' : ''}`} to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/explore') ? 'fw-bold text-primary' : ''}`} to="/explore">Explore</Link>
                    </li>
                    {
                        isAdmin && (
                            <>

                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/items') ? 'fw-bold text-primary' : ''}`} to="/items">Manage Items</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/category') ? 'fw-bold text-primary' : ''}`} to="/category">Manage Category</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/users') ? 'fw-bold text-primary' : ''}`} to="/users">Manage User</Link>
                                </li>
                            </>
                        )
                    }

                </ul>


                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropDown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={assets.profile} alt="" height={32} width={32} />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropDown">
                            <li>
                                <a href="#!" className="dropdown-item">
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a href="#!" className="dropdown-item">
                                    Activity log
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a href="#!" className="dropdown-item" onClick={logout}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>















            </div>
        </nav>
    );
};

export default Menubar;

{/* User Profile Dropdown */}
{/*<div className="dropdown text-end">*/}
{/*    <a*/}
{/*        href="#"*/}
{/*        className="d-block link-light text-decoration-none dropdown-toggle"*/}
{/*        id="dropdownUser1"*/}
{/*        data-bs-toggle="dropdown"*/}
{/*        aria-expanded="false"*/}
{/*    >*/}
{/*        <img*/}
{/*            src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"*/}
{/*            alt="User"*/}
{/*            width="32"*/}
{/*            height="32"*/}
{/*            className="rounded-circle"*/}
{/*        />*/}
{/*    </a>*/}
{/*    <ul className="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">*/}
{/*        <li><a className="dropdown-item" href="#">Profile</a></li>*/}
{/*        <li><a className="dropdown-item" href="#">Settings</a></li>*/}
{/*        <li><hr className="dropdown-divider" /></li>*/}
{/*        <li><a className="dropdown-item" href="#">Sign out</a></li>*/}
{/*    </ul>*/}
{/*</div>*/}