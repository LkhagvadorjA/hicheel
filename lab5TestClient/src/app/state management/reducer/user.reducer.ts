import { All, USER } from '../action/user.action';
import { User } from '../user.model';

export type Action = All;

const defaultValue: User = {
    userName : '',
    userId: '',
    role: '',
    password: ''
}

const newState = (state, newData) => {
    return Object.assign( {}, state, newData );
}

export function userReducer(state: User = defaultValue, action: Action) {
    switch (action.type) {
        case USER:
            return newState(state, action.payload);
        default:
            return state;
    }
}