import {Action} from '@ngrx/store';

export function simpleReducer( state: string, action: Action ) {
    switch(action.type) {
        case 'SPANISH':
            return state;
    case 'FRENCH' :
        return state = 'french sda';
    default:
        return state;
    }
}