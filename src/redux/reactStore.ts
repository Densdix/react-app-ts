import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";

import dialogReducer from "./dialogReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form : formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = legacy_createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
))



// @ts-ignore
window.store = store

export default store