import {
    OPEN_LOGIN_MODEL,
    CLOSE_LOGIN_MODEL
} from "./types";

export const openLoginModel = () => ({
    type:OPEN_LOGIN_MODEL
})
export const closeLoginModel = () => ({
    type:CLOSE_LOGIN_MODEL
})