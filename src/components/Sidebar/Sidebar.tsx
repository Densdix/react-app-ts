import React from "react";
import {NavLink} from "react-router-dom";
import s from './Sidebar.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faUser, faMessage, faNewspaper, faDizzy, faHand, fa} from "@fortawesome/free-regular-svg-icons";
import {faUser, faMessage, faNewspaper, faMusic, faGear, faHome} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    return (
        <nav className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 h-fit">
            <NavLink to="/profile" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span className="text-2xl px-2"><FontAwesomeIcon size={"sm"} icon={faHome}/></span>
                <span>Profile</span>
            </NavLink>

            <NavLink to="/dialogs" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span className="text-2xl px-2"><FontAwesomeIcon size={"sm"} icon={faMessage}/></span>
                <span>Dialogs</span>
            </NavLink>

            <NavLink to="/news" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span className="text-2xl px-2"><FontAwesomeIcon size={"sm"} icon={faNewspaper}/></span>
                <span>News</span>
            </NavLink>

            <NavLink to="/music" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span className="text-2xl px-2"><FontAwesomeIcon size={"sm"} icon={faMusic}/></span>
                <span>Music</span>
            </NavLink>

            <NavLink to="/users" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span className="text-2xl px-2"><FontAwesomeIcon size={"sm"} icon={faUser}/></span>
                <span>Users</span>
            </NavLink>

            <NavLink to="/chat" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                <span className="text-2xl px-2"><FontAwesomeIcon size={"sm"} icon={faUser}/></span>
                <span>Chat</span>
            </NavLink>
        </nav>
    )
}

// <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 h-fit">
//     <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
//         <span className="text-2xl"><FontAwesomeIcon icon={faUser} /></span>
//         <span>Dashboard</span>
//     </a>
//
//     <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
//         <span className="text-2xl"><i className="bx bx-cart"></i></span>
//         <span>Cart</span>
//     </a>
//
//     <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
//         <span className="text-2xl"><i className="bx bx-shopping-bag"></i></span>
//         <span>Shopping</span>
//     </a>
//
//     <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
//         <span className="text-2xl"><i className="bx bx-heart"></i></span>
//         <span>My Favourite</span>
//     </a>
//
//     <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
//         <span className="text-2xl"><i className="bx bx-user"></i></span>
//         <span>Profile</span>
//     </a>
// </aside>

export default Sidebar;