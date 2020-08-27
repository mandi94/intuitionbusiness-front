import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { map, retry } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class DiagnosisService {

  ServerUrl = 'http://localhost:3000/questions';
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': undefined}      
      )
  };

  constructor(private http: HttpClient) { }



  getQuestionList() {
    return this.http.get<String>(this.ServerUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
    // return this.http.get<any>(this.ServerUrl ,this.httpOptions).pipe(
    //   catchError(this.handleError)
    // );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
