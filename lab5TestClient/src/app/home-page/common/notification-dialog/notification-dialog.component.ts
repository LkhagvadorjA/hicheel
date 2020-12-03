import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookModel } from '../../model/book.model';



@Component({
  selector: 'app-notification-dialog',
  template: `
    <h1 mat-dialog-title> Sain baina uu {{ data.borrowerName }} </h1>
    <div mat-dialog-content>
     <p> Tanii zahialsan {{data.bookName}} nom  zeelehed belen bolson baina. </p>
    </div>

    <div mat-dialog-actions>
      <button mat-button (click)="cancel()">Zahialahgui</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Zahialna</button>
    </div>
  `,
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent{

  constructor(public dialogRef: MatDialogRef<NotificationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: BookModel) { }

  cancel(): void {
    this.dialogRef.close();
  }

}
