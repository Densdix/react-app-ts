import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";

let store = {
    _state: {
        profilePage: {
            postData: [
                {
                    id: 1,
                    msg: "Hi, Hello from you",
                    likesCount: 10,
                    imgUrl: "https://www.pngall.com/" +
                        "wp-content/uploads/12/Avatar-Profile-PNG-Photos.png"
                },
                {
                    id: 2,
                    msg: "See yaa",
                    likesCount: 30,
                    imgUrl: "https://img.freepik.com/" +
                        "premium-vector/man-avatar-profile-on-round-icon_24640-14044.jpg?w=2000"
                },
                {
                    id: 3,
                    msg: "GGWP",
                    likesCount: 60,
                    imgUrl: "https://w7.pngwing.com/" +
                        "pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
                }
            ],
            newPostText: ""
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: "DimaDev", msg: ["Hi, Hello, How Are you"]},
                {id: 2, name: "Victor"},
                {id: 3, name: "Alina"},
                {id: 4, name: "Ramzes"},
                {id: 5, name: "Alestsu"},
            ],
            messageData: [
                {id: 1, msg: "Hi"},
                {id: 2, msg: "Hello"},
                {id: 3, msg: "Go ogo go"},
                {id: 4, msg: "How are yo"}
            ],
            newMessageText: ""
        }
    },
    getState(){
        return this._state;
    },
    rerenderEntireTree() {},
    subscribe(callback) {
        this.rerenderEntireTree = callback
    },
    dispatch(action){
        this._state.profilePage = profileReducer(action, this._state.profilePage)
        this._state.dialogsPage = dialogReducer(action, this._state.dialogsPage)
        this.rerenderEntireTree(this._state)
    }

}

window.store = store

export default store;