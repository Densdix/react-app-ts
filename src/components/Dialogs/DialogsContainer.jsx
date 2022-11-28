import React from "react";
import {ADD_MESSAGE, addMessageActionCreator, UPDATE_NEW_MESSAGE_TEXT} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


const SuperDialogsContainer = (props) => {

    let state = props.store.getState()

    // let onMessageChange = (text) => {
    //     props.store.dispatch({type: UPDATE_NEW_MESSAGE_TEXT, newText: text})
    // }
    //
    // let addMessage = () => {
    //     props.store.dispatch({type: ADD_MESSAGE})
    // }

    return (
        <Dialogs dialogsPage={state.dialogsPage} dispatch={props.dispatch} addMessage={props.addMessage}/>
    );
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,

    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onMessageChange: (text) => {
            dispatch({type: UPDATE_NEW_MESSAGE_TEXT, newText: text})
        },
        addMessage: () => {
            dispatch({type: ADD_MESSAGE})
        }
    }
}

const DialogsContainer = compose(
    connect(mapStateToProps, {
        addMessage: addMessageActionCreator
    }),
    withAuthRedirect
)(Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs))

export default DialogsContainer;