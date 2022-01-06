import { selector, atom } from "recoil";
import { USER } from "../constants";
import { IUser } from "../types";

export const userDetail = atom<IUser>({
    key: USER.USER_DETAIL,
    default: {
        email: "",
        password: "",
        isAuth: false,
    }
})

export const setUserDetail = selector<IUser>({
    key: USER.SET_USER_DETAIL,
    get: ({get}) => {
        const res = get(userDetail)
        return res;
    },
})