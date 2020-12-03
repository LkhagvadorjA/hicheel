import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { BookModel } from '../../model/book.model';
import { AutheticationService } from 'src/app/authentication/authetication.service';
import { User } from 'src/app/state management/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../../common/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-home-page',
  template: `
    <h1>HELLO GREETING FROM HOME PAGE</h1>
    <div>
    <div>
      <mat-button-toggle-group color="primary" >
        <mat-button-toggle (click)="getBook('OPEN')" >Bolomjit</mat-button-toggle>
        <mat-button-toggle (click)="getBook('BOOKED')" >Zahialagdsan</mat-button-toggle>
        <mat-button-toggle (click)="getBookByUserId()" >Uuriin</mat-button-toggle>
      </mat-button-toggle-group>

    </div>

      <book-table [data]='books' [state]='state' [userId]="userId" [userName]="userName"
                  (bookEmitter)="setBook($event)" (getBackBookEmitter)="getBackBook($event)" 
                  (subscriptionEmitter)="subscribeBook($event)"></book-table>
    </div>
  `,
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userName: string;
  userId: string;
  books: BookModel[];
  selectedBook: BookModel;
  state: string;
  BOOKED = 'BOOKED';
  OPEN = 'OPEN';
  constructor(private service: ServiceService, private authSb: AutheticationService, private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.authSb.getAuth().subscribe((res: User) => {
      this.userName = res.userName;
      this.userId = res.userId;
    });
    this.service.getSubscribedBookByUserId(this.userId).subscribe( (res: BookModel) => {
      console.log(res)
      if (null !== res) {
        res.borrowerName = this.userName;
        this.openDialog(res);
      }
    } )
  }

    openDialog(book: BookModel): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width: '500px',
      data: book
    });

    dialogRef.afterClosed().subscribe((result: BookModel) => {
      if( result !== undefined ) {
        result.bookState = this.BOOKED;
        result.borrowerId = this.userId;
        result.borrowerName = this.userName;
        this.setBook(result);
      }
      
      this.service.deleteSubscriptionByBookId(book.bookId).subscribe( (res: boolean) => {
        console.log(res)
      } );
    });
  }

  getBook(state: string) {
    this.service.getBooksByState(state).subscribe(res => {
      this.books = res;
      this.state = state;
    });
  }

  getBookByUserId() {
    this.service.getBookByUserId(this.userId).subscribe((res: BookModel[]) => {
      this.books = res !== null ? res : [];
      this.state = 'BOOKED';
    })
  }

  setBook(selectedBook: BookModel) {
    this.sendBook(selectedBook, 0)
  }

  getBackBook(selectedBook: BookModel) {
    this.sendBook(selectedBook, 1);
  }

  subscribeBook(book: BookModel) {
    this.service.subscribeByUserId(book).subscribe( (res: boolean) => {
      console.log(res)
    } );
  }

  sendBook(selectedBook: BookModel, index: number) {
    this.service.setBookByUserIdAndUserName(selectedBook).subscribe( res => {
      if (res) {
        this.snackBar.open( 'Amjilttai', 'close', { duration: 3000 } );
        if (index === 0) { this.getBook(this.state); } else if ( index === 1 ) { this.getBookByUserId(); }
      } else {
        this.snackBar.open( 'Amjiltgui!', 'close', { duration: 3000 } );
      }
    } );
  }
}
