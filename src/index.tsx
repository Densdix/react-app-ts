import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import store from './redux/reactStore';
import {Provider} from "react-redux";
import {App} from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// setInterval(()=> {
//     store.dispatch( {type: "FAKE"})
// }, 1000)

root.render(
    //<React.StrictMode>
    <Provider store={store}>
        {/*<App store={store} state={state} dispatch={store.dispatch.bind(store)}/>*/}
        <App/>
    </Provider>
    //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
