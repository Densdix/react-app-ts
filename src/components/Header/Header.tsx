import React from "react";
import logo from '../../logo.svg';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: string | null
    setUserLogOut: () => void
}

const Header: React.FC<PropsType> = ({isAuth, login, setUserLogOut}) => {
    return (
        <header className={s.header}>
            <a href="/" style={{float: 'left'}}><img src={logo} className={s.logo} alt="logo"/></a>
                <div className={s.loginBlock}>
                    {isAuth
                        ? <div>
                            <div>{login} <button onClick={()=>setUserLogOut()}>LogOut</button></div>

                        </div>
                        : <NavLink to={"/login"}>Login</NavLink>}
                </div>

        </header>
    )
}

export default Header;