import React from "react";
import s from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {emptyField} from "../../utils/validators";
import {FormControl} from "../common/FormsControls/FormsControls";
import {DialogsDataType, MessageDataType} from "../../redux/dialogReducer";
import {ProfileUserContactsType, ProfileUserPhotosType} from "../../redux/profileReducer";

type PropsType = {
    dialogsData: Array<DialogsDataType>
    messageData: Array<MessageDataType>
    addMessage: (value: string) => void
}
export type DialogsUserDataType = {
    message: string
}

const Dialogs: React.FC<PropsType> = ({addMessage, dialogsData, messageData}) => {

    const onSubmit = (dialogsFormData: DialogsUserDataType) => {

        console.log("dialogsFormData",dialogsFormData)
        addMessage(dialogsFormData.message)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsData.map(el => <Dialog name={el.name} id={el.id}/>)}
            </div>
            <div className={s.messages}>
                {messageData.map(el => <Message text={el.msg}/>)}
                <ReduxDialogsForm onSubmit={onSubmit}/>
            </div>

        </div>
    );
}

let DialogsForm : React.FC<InjectedFormProps<DialogsUserDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name="message" validate={[emptyField]} component={FormControl} typefield="textarea" placeholder={"Enter your text"}></Field></div>
            <div>
                <button type="submit">Send</button>
            </div>
        </form>
    )
}

const ReduxDialogsForm = reduxForm<DialogsUserDataType>({
    // a unique name for the form
    form: 'dialogs'
})(DialogsForm)

export default Dialogs;