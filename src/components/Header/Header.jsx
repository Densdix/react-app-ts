import React from "react";
import logo from '../../logo.svg';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <a href={process.env.PUBLIC_URL} style={{float: 'left'}}><img src={logo} className={s.logo} alt="logo"/></a>
                <div className={s.loginBlock}>
                    {props.isAuth
                        ? <div>
                            <div>{props.login} <button onClick={()=>props.setUserLogOut()}>LogOut</button></div>

                        </div>
                        : <NavLink to={"/login"}>Login</NavLink>}
                </div>

        </header>
    )
}

export default Header;