import React from "react";
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import {HashRouter, BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
//import LoginContainer from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {initAppThunkCreator} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import withSuspense from "./hoc/withSuspense";

const LoginContainer = React.lazy(() => import('./components/Login/Login'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends Component {

    componentDidMount() {
        this.props.initApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>

        return (
            <HashRouter>
                <div className="App">
                    <HeaderContainer/>
                    <Sidebar/>
                    <div className='App-content'>
                        <Routes>
                            <Route path='/dialogs' element={<DialogsContainer/>}/>
                            <Route path='/profile' element={<ProfileContainer/>}>
                                <Route path=':userId' element={<ProfileContainer/>}/>
                            </Route>
                            {/*Lazy load + withSuspense*/}
                            <Route path='/users' element={withSuspense(UsersContainer)}/>
                            {/*Lazy load*/}
                            <Route path='/login' element={<React.Suspense fallback={<Preloader/>}><LoginContainer/></React.Suspense>}/>
                        </Routes>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {
    initApp: initAppThunkCreator
})(App);
