import {combineReducers } from "redux"
import AuthReducer from "./auth"
import UserReducer from "./login"

let reducer = combineReducers({
    AReducer: AuthReducer,
    UReducer: UserReducer
})

export default reducer