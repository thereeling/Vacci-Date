import { useReducer } from "react";
import {
    UPDATE_MATCHES,
    FILTERED_USERS,
    UPDATE_RECOMMENDED_USER
} from './actions'



export const reducer= (state, action) => {
    switch (action.type) {
        case UPDATE_MATCHES:
            return {
                ...state,
                matches: [...action.matches]
            };
        case FILTERED_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case UPDATE_RECOMMENDED_USER:
            return {
                ...state,
                recommendedUser: action.recommendedUser
            }
        default:
            return state;
    }
};

export function useUserReducer(initialState) {
    return useReducer(reducer, initialState)
}