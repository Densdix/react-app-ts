import React from "react";
import {dialogActionsCreators} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/reactStore";
import {compose} from "redux";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messageData: state.dialogsPage.messageData,
    }
}
// const DialogsContainer = connect(mapStateToProps, {
//         addMessage: dialogActionsCreators.addMessageActionCreator
//     })(withAuthRedirect(Dialogs))

const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {
        addMessage: dialogActionsCreators.addMessageActionCreator
    }),
    withAuthRedirect
)(Dialogs)

export default DialogsContainer