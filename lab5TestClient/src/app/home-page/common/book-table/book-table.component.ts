import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookTableColumn, BOOK_COLUMNS, OPEN, BOOKED, BookModel } from '../../model/book.model';

@Component({
  selector: 'book-table',
  template: `
    <h1> HELLO BOOK TABLE </h1>
    <mat-table [dataSource]="dataSource">

    <ng-container *ngFor="let column of columns" matColumnDef="{{column.columnDef}}">
      <mat-header-cell *matHeaderCellDef> {{column.headerText}} </mat-header-cell>
      <mat-cell *matCellDef="let element">
        <mat-icon *ngIf="column.columnDef === 'bookId'" [matMenuTriggerFor]="contextMenu"
         color="primary" class="book-menu">more_vert</mat-icon>
        {{element[column.columnDef]}}
       </mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns; sticky:true"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;" (click)="selectRow(row)"></mat-row>
    </mat-table>
    <p *ngIf="isDataEmpty()" class="mat-title error-table-text">JAGSAALT HOOSON BAINA</p>

    <mat-menu #contextMenu="matMenu">
      <ng-template matMenuContent>
        <button mat-menu-item *ngIf="state === OPEN" (click)="borrowBook()" >ZEELEH</button>
        <button mat-menu-item *ngIf="isOwner()" (click)="getBackBook()" >BUTSAAH</button>
        <button mat-menu-item *ngIf="isBooked()" (click)="subscribeBook()">ZAHIALAH</button>
      </ng-template>
    </mat-menu>
  `,
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit, OnChanges {
  @Input() data: BookModel[];
  @Input() state: string;
  @Input() userName: string;
  @Input() userId: string;
  @Output() bookEmitter = new EventEmitter<BookModel>();
  @Output() getBackBookEmitter = new EventEmitter<BookModel>();
  @Output() subscriptionEmitter = new EventEmitter<BookModel>();
  dataSource = new MatTableDataSource();
  displayedColumns: string[];
  columns = BOOK_COLUMNS;
  selectedBook: BookModel;
  BOOKED = 'BOOKED';
  OPEN = 'OPEN';
  SUBSCRIBED = 'SUBSCRIBED';


  constructor() { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  isDataEmpty(): boolean {
    return (this.dataSource.data === undefined || this.dataSource.data.length === 0);
  }

  borrowBook() {
    this.selectedBook.bookState = this.BOOKED;
    this.selectedBook.borrowerId = this.userId;
    this.selectedBook.borrowerName = this.userName;
    this.bookEmitter.emit(this.selectedBook);
  }

  getBackBook() {
    const hasBookedBook = this.data.find( book => book.bookState === this.BOOKED && book.borrowerId !== this.userId );
    this.selectedBook.bookState = this.OPEN;
    this.selectedBook.borrowerId = '';
    this.selectedBook.borrowerName = '';
    hasBookedBook ? this.bookEmitter.emit(this.selectedBook) : this.getBackBookEmitter.emit(this.selectedBook);
  }

  subscribeBook() {
    const subscribedBook: BookModel = {
      bookId: this.selectedBook.bookId, bookName: this.selectedBook.bookName, bookState: this.SUBSCRIBED,
      borrowerId: this.userId, borrowerName: this.userName
    }
    this.subscriptionEmitter.emit(subscribedBook);
  }

  selectRow(item: BookModel) {
    this.selectedBook = item;
  }

  isOwner(): boolean {
    if (this.selectedBook === undefined) { return false; }
    return this.state === this.BOOKED && this.userId === this.selectedBook.borrowerId;
  }

  isBooked(): boolean {
    if (this.selectedBook === undefined) { return false; }
    return this.state === this.BOOKED && this.userId !== this.selectedBook.borrowerId;
  }

}
