import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BookModel } from '../home-page/model/book.model';
import { User } from '../state management/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

private url = 'http://localhost:8080';

  constructor(private httpService: HttpClient) {
    
   }


  getTestData(): Observable<any> {
     return this.httpService.get(this.url + '/hello').pipe(
       map(res => {
         return res;
       }),
       catchError( (err) => {
         return throwError('fuck man', err);
       } )
     );

  }

  getUserData(userName: string, password: string): Observable<User> {
    return this.httpService.get(this.url + '/authentication/' + userName + '/' + password).pipe(
      map((res: any) => {
        return res.entity;
      }), catchError( () => {
        return throwError('error occured while checking user');
      } )
    )
  }

  getBooksByState(state: string): Observable<any> {
    return this.httpService.get(this.url + '/book/' + state).pipe(
      map( (res: any) => {
        return res.entity;
      } )
    )
  }

  getBookByUserId(userId: string): Observable<BookModel[]> {
    return this.httpService.get(this.url + '/book/user-id/' + userId).pipe(
      map( (res: any) => {
        return res.entity;
      } )
    );
  }

  setBookByUserIdAndUserName(book: BookModel): Observable<BookModel> {
    console.log(book)
    return this.httpService.post(this.url + '/book/set-book', book).pipe(
      map( (res: any) => {
        return res.entity;
      } )
    )
  }

  subscribeByUserId(book: BookModel): Observable<boolean> {
    return this.httpService.post(this.url + '/book/subscribe', book).pipe(
      map( (res: any) => {
        console.log(res)
        return res.entity;
       } )
    );
  }

  getSubscribedBookByUserId(userId: string): Observable<BookModel> {
    return this.httpService.get(this.url + '/book/subscribedBook/' + userId).pipe(
      map( (res: any) => {
        return res.entity;
      } )
    );
  }

  deleteSubscriptionByBookId(bookId: string): Observable<boolean> {
    return this.httpService.post(this.url + '/book/delete/subscription/' + bookId, null).pipe(
      map( (res: any) => {
        return res.entity;
      } )
    );
  }

}
