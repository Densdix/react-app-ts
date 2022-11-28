import {createSelector} from "reselect";

export const getUserID = (state) => {
    return state.auth.userId
}

export const getUserIDSelector = createSelector(getUserID, (userId) => {
    return userId
})