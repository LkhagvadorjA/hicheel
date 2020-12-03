import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../state management/user.model';



interface AppState {
  message: string;
}

interface UserState {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  message$: Observable<string>;
  user$: Observable<User>;

  constructor(private store: Store<UserState>) { 
    // this.message$ = this.store.select('message');
    this.user$ = this.store.select('user');
  }

  getMessage() { return this.message$; }

  getAuth() { return this.user$; }
}
