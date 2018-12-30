import axios from 'axios'
import * as API from '../../constants/api/room'

// action type

// get room list
const GET_ROOM_LIST_START = 'GET_ROOM_LIST_START'
const GET_ROOM_LIST_SUCCESS = 'GET_ROOM_LIST_SUCCESS'
const GET_ROOM_LIST_END = 'GET_ROOM_LIST_END'

const initialState = {
}

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // get room list
        case GET_ROOM_LIST_START:
            return {
                ...state,
            }
        case GET_ROOM_LIST_SUCCESS:
            console.log("Room_List: ", action)
            return {
                ...state,
            }
        case GET_ROOM_LIST_END:
            return {
                ...state,
            }
        default:
            return state;
    }
}

// action-creator

// get room list
const getRoomListStart = () => {
    return { type: GET_ROOM_LIST_START }
}
const getRoomListSuccess = (json) => {
    return {
        type: GET_ROOM_LIST_SUCCESS,
        payload: json,
    }
}
const getRoomListEnd = () => {
    return { type: GET_ROOM_LIST_END }
}
export const getRoomList = (page = 1) => {
    return (dispatch, getState) => {
        const uri = API.RoomList + `?page=${page}`
        dispatch(getRoomListStart())
        axios.get(uri).then((json) => {
            dispatch(getRoomListSuccess(json))
        }).catch((err) => {
            console.error(err)
        })
        dispatch(getRoomListEnd())

    }
}
