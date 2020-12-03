export interface BookModel {
    bookId: string;
    bookName: string;
    bookState: string;
    borrowerId: string;
    borrowerName: string
}

export interface BookTableColumn {
    bookId: string;
    bookName: string;
    bookState: string;
    borrowerId: string;
    borrowerName: string
}

export interface ColumnDef {
  columnDef: string;
  headerText: string;
}

export const BOOK_COLUMNS: ColumnDef[] = [
  {columnDef: 'bookId', headerText: 'Book ID'},
  {columnDef: 'bookName', headerText: 'Book Name'},
  {columnDef: 'bookState', headerText: 'Book State'},
  {columnDef: 'borrowerId', headerText: 'Borrower ID'},
  {columnDef: 'borrowerName', headerText: 'Borrower'},
];

export const OPEN = 'OPEN';

export const BOOKED = 'BOOKED';