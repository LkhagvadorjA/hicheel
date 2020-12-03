import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const USER = 'user';

export class UserAction implements Action {
    readonly type = USER;
    constructor(public payload: User) {}
}

export type All = UserAction;