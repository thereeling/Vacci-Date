import {
    UPDATE_MATCHES,
    UPDATE_USERS,
    UPDATE_RECOMMENDED_USER
} from './actions'

const initialstate = {
    users: [],
    matches: [],
    recommendedUser: ''
};

export const reducer= (state = initialstate, action) => {
    switch (action.type) {
        case UPDATE_MATCHES:
            return {
                ...state,
                matches: [...action.matches]
            };
        case UPDATE_USERS:
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
}