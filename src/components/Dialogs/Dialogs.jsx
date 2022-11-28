import React from "react";
import s from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

import {emptyField} from "../../utils/validators";
import {FormControl} from "../common/FormsControls/FormsControls";

const Dialogs = (props) => {

    const onSubmit = (dialogsFormData) => {

        console.log("dialogsFormData",dialogsFormData)
        props.addMessage(dialogsFormData.message)
    }

    let newMessageElement = React.createRef()

    let onMessageChange = () => {
        //let text = e.target.value
        let text = newMessageElement.current.value
        //props.dispatch({type: UPDATE_NEW_MESSAGE_TEXT, newText: text})
        //console.log(text)
        props.onMessageChange(text)
    }

    let addMessage = () => {
        //props.dispatch({type: ADD_MESSAGE})
        props.addMessage()
    }

    let correctTextData = (newMessageText) => {
        let maxLength = 16
        if (newMessageText.length <= maxLength) {
            let correctMessageText = newMessageText.toLowerCase();
            return correctMessageText.charAt(0).toUpperCase() + correctMessageText.slice(1);
        } else {
            let correctMessageText = newMessageText.toLowerCase().slice(0, -1);
            return correctMessageText.charAt(0).toUpperCase() + correctMessageText.slice(1);
        }

    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.dialogsPage.dialogsData.map(el => <Dialog name={el.name} id={el.id}/>)}
            </div>
            <div className={s.messages}>
                {props.dialogsPage.messageData.map(el => <Message text={el.msg}/>)}
                <DialogsForm onSubmit={onSubmit}/>
            </div>

        </div>
    );
}

let DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name="message" validate={[emptyField]} component={FormControl} typefield="textarea" placeholder={"Enter your text"}></Field></div>
            <div>
                <button type="submit">Send</button>
            </div>
        </form>
    )
}

DialogsForm = reduxForm({
    // a unique name for the form
    form: 'dialogs'
})(DialogsForm)

export default Dialogs;