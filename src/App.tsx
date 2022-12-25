//import LoginContainer from "./components/Login/Login";
import React, {useEffect, useState} from "react";
import './App.css';
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Preloader from "./components/common/Preloader/Preloader";
import withSuspense from "./hoc/withSuspense";

import {useAppSelector, useAppThunkDispatch} from "./redux/hooks";
import {initAppThunkCreator} from "./redux/appReducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import Chat from "./components/Chat/Chat";

const LoginContainer = React.lazy(() => import('./components/Login/Login'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

type StatePropsType = {
    initialized: boolean
}

type DispatchPropsType = {
    initApp: () => void
}

type OwnPropsType = {}

type PropsType = StatePropsType & DispatchPropsType & OwnPropsType

// componentDidMount() {
//     this.props.initApp()
// }

export const App = () => {

    const initialized = useAppSelector(state => state.app.initialized)
    const thunkDispatch = useAppThunkDispatch()
    const [sideBarIsVisible, setSideBarVisibility] = useState(true)

    useEffect(() => {
        thunkDispatch(initAppThunkCreator())
    }, [])

    if (!initialized) return <Preloader/>

    return (
        <HashRouter>
            {/*<div className="App">*/}
            {/*    <HeaderContainer/>*/}
            {/*    <Sidebar/>*/}

            {/*    <div className='App-content'>*/}

            {/*        <Routes>*/}
            {/*            <Route path='/dialogs' element={<DialogsContainer/>}/>*/}
            {/*            <Route path='/profile' element={<ProfileContainer/>}>*/}
            {/*                <Route path=':userId' element={<ProfileContainer/>}/>*/}
            {/*            </Route>*/}
            {/*            /!*Lazy load + withSuspense*!/*/}
            {/*            <Route path='/users' element={withSuspense(UsersContainer)}/>*/}
            {/*            /!*Lazy load*!/*/}
            {/*            <Route path='/login' element={<React.Suspense*/}
            {/*                fallback={<Preloader/>}><LoginContainer/></React.Suspense>}/>*/}
            {/*            <Route*/}
            {/*                path="/"*/}
            {/*                element={<Navigate to="/profile" replace/>}*/}
            {/*            />*/}
            {/*        </Routes>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* page */}
            {/* page */}
            <main className="min-h-screen w-full bg-gray-100 text-gray-700 p-2" x-data="layout">
                {/* header page */}
                <HeaderContainer sideBarIsVisible={sideBarIsVisible} setSideBarVisibility={setSideBarVisibility}/>

                <div className="flex">
                    {/* aside */}
                    {sideBarIsVisible && <Sidebar/>}

                    {/* main content page */}
                    <div className="w-full p-4">
                        <Routes>
                            <Route path='/dialogs' element={<DialogsContainer/>}/>
                            <Route path='/profile' element={<ProfileContainer/>}>
                                <Route path=':userId' element={<ProfileContainer/>}/>
                            </Route>
                            {/*Lazy load + withSuspense*/}
                            <Route path='/users' element={withSuspense(UsersContainer)}/>
                            {/*Lazy load*/}
                            <Route path='/login' element={<React.Suspense
                                fallback={<Preloader/>}><LoginContainer/></React.Suspense>}/>

                            <Route path='/chat' element={<React.Suspense
                                fallback={<Preloader/>}><Chat/></React.Suspense>}/>
                            <Route
                                path="/"
                                element={<Navigate to="/profile" replace/>}
                            />
                        </Routes>
                    </div>
                </div>
            </main>




        </HashRouter>
    );
}

// let mapStateToProps = (state: AppStateType) => {
//     return {
//         initialized: state.app.initialized
//     }
// }
//
// export default connect(mapStateToProps, {
//     initApp: initAppThunkCreator
// })(App);
