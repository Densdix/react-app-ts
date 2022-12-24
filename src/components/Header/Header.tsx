import React, {useState} from "react";
import logo from '../../logo.svg';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faUserNinja} from "@fortawesome/free-solid-svg-icons";

type PropsType = {
    isAuth: boolean
    login: string | null
    setUserLogOut: () => void
    sideBarIsVisible: boolean
    setSideBarVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<PropsType> = ({isAuth, login, setUserLogOut, sideBarIsVisible, setSideBarVisibility}) => {
    const [dropdownisActive, setDropdownActive] = useState(false)

    return (
        <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
            {/* logo */}
            <div className="flex items-center space-x-2">
                <button onClick={() => {
                    setSideBarVisibility(!sideBarIsVisible)
                }} type="button" className="text-3xl px-2"><FontAwesomeIcon size={"xs"} icon={faBars}/></button>
                <div><span className="pr-4">Samurai Social Network</span><FontAwesomeIcon icon={faUserNinja}/> </div>
            </div>

            {/* button profile */}
            {isAuth
                ? <div>
                    <button onClick={() => setDropdownActive(!dropdownisActive)} type="button"
                            className="h-9 w-9 overflow-hidden rounded-full">
                        <img src="https://plchldr.co/i/40x40?bg=111111" alt="plchldr.co"/>
                    </button>

                    {/* dropdown profile */}
                    {dropdownisActive &&
                        <div
                            className="absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md"
                            x-show="profileOpen" x-transition>
                            <div className="flex items-center space-x-2 p-2">
                                <img src="https://plchldr.co/i/40x40?bg=111111" alt="plchldr.co"
                                     className="h-9 w-9 rounded-full"/>
                                <div className="font-medium">{login}</div>
                            </div>

                            <div className="flex flex-col space-y-3 p-2">
                                <a href="#" className="transition hover:text-blue-600">My Profile</a>
                                <a href="#" className="transition hover:text-blue-600">Edit Profile</a>
                                <a href="#" className="transition hover:text-blue-600">Settings</a>
                            </div>

                            <div className="p-2">
                                <button className="flex items-center space-x-2 transition hover:text-blue-600">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                        </path>
                                    </svg>
                                    <div><button onClick={()=>setUserLogOut()}>LogOut</button></div>
                                </button>
                            </div>
                        </div>
                    }
                </div>
                : <NavLink to={"/login"}>Login</NavLink>}

        </header>
        // <header className={s.header}>
        //     <a href="/" style={{float: 'left'}}><img src={logo} className={s.logo} alt="logo"/></a>
        //         <div className={s.loginBlock}>
        //             {isAuth
        //                 ? <div>
        //                     <div>{login} <button onClick={()=>setUserLogOut()}>LogOut</button></div>
        //
        //                 </div>
        //                 : <NavLink to={"/login"}>Login</NavLink>}
        //         </div>
        //
        // </header>
    )
}


export default Header;