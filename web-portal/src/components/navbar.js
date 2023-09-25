import React from "react";

import "bootstrap/dist/css/bootstrap.css";

import { NavLink } from "react-router-dom";

//render navbar
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    <img style={{ "width": 25 + '%' }} src="https://www.freepnglogos.com/uploads/vodafone-png-logo/vodafone-employment-opportunities-22.png"></img>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/create/industriesDB"}>
                                Create Industries Record
                            </NavLink>
                            <NavLink className="nav-link" to={"/create/iotDB"}>
                                Create IoT Record
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}