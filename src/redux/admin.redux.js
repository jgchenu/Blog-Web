import axios from "@/axios/index";
import {
    message
} from "antd";

//action
const LOGOUT = "admin/logout";
const LOAD_DATA = "admin/loadData";
const initState = {
    avatar: "",
    userName: ""
};

//action type
//更新个人信息
function infoAdminData(data) {
    return {
        type: LOAD_DATA,
        payload: data
    };
}


export function admin(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                ...action.payload
            };
        case LOGOUT:
            return initState
        default:
            return state;
    }
}


//获取个人信息
export function getAdminInfo() {
    return dispatch => {
        axios({
            url: "/admin",
            method: "get"
        }).then(res => {
            if (res.data.code === 200) {
                dispatch(infoAdminData(res.data.data));
            } else {
                message.warn(res.data.message, 1);
            }
        });
    };
}