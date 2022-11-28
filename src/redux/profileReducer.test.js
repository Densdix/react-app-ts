import profileReducer, {addPostActionCreator} from "./profileReducer";

let state = {
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
    ]
}

test('add 4th element to the postData massive', () => {

    let action = addPostActionCreator("test")

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(4)
})



