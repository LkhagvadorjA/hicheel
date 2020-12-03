import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { UserAction } from 'src/app/state management/action/user.action';
import { User } from 'src/app/state management/user.model';


interface AppState {
  message: string;
}

@Component({
  selector: 'app-login-container',
  template: `

  <mat-card>
    <div class="container">
      <mat-form-field appearance="outline">
          <input matInput placeholder="User Name" [(ngModel)]='userName'  >
      </mat-form-field>
      <mat-form-field appearance="outline">
          <input matInput placeholder="Password" type="password" [(ngModel)]='password' >
      </mat-form-field>
      <button mat-raised-button color="primary" (click)='login()' >LOGIN</button>
    </div>
  </mat-card>
  `,
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent implements OnInit {

  userName: string;
  password: string;

  constructor(private router: Router, private service: ServiceService, private snackBar: MatSnackBar,
    private store: Store<AppState>) { }

  ngOnInit() {
  }

  login() {
    this.service.getUserData(this.userName, this.password).subscribe((res: User) => {
      if (res) {
        console.log(res)
        this.store.dispatch( new UserAction( {userName: this.userName, userId: res.userId, role: res.role, password: ''} ) );
        this.router.navigate(['/home-page']);
      } else {
         this.snackBar.open( 'Username or password is invalid!', 'close', { duration: 3000 } );
       }
    });
  }

}
