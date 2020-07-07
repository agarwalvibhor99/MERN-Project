import React, {Fragment} from 'react'
import {Link, withRouter} from "react-router-dom"
import { signout, isAuthenticated } from '../auth/helper'



const currentTabCheck = (history, path) => {
    if (history.location.pathname === path){
        return {color: "#2ecc72"}
    }
    return {color: "#FFFFFF"}
}

const NavigationBar = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-dark ">
            <li className="nav-item">
                <Link style={currentTabCheck(history, "/")} className="nav-link" to="/">
                    Home
                </Link>

            </li>
            <li className="nav-item">
                <Link style={currentTabCheck(history, "/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>

            </li>
            <li className="nav-item">
                <Link style={currentTabCheck(history, "/user/dasboard")} className="nav-link" to="/user/dashboard">
                   U Dashboard
                </Link>

            </li>
            <li className="nav-item">
                <Link style={currentTabCheck(history, "/admin/dasboard")} className="nav-link" to="/admin/dashboard">
                    A Dashboard
                </Link>

            </li>
            
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link style={currentTabCheck(history, "/signup")} className="nav-link" to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTabCheck(history, "/signin")} className="nav-link" to="/signin">
                            Signin
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() &&(
            <li className="nav-item">
                <span className="nav-link text-warning" onClick={() => {
                    signout(() =>{
                        history.push("/")
                    })
                }}>
                    Signout
                </span>
             </li>
            )}
        </ul>
    </div>

)

export default withRouter(NavigationBar) 
