import {createSelector} from "reselect";

export const getUsersPage = (state) => {
    return state.usersPage
}

export const getSelectorUserPage = createSelector(getUsersPage, (usersPage)=>{

    return usersPage
})