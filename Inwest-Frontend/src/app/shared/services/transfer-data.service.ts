import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Transfer } from '../Models/transfer';

@Injectable({
  providedIn: 'root',
})
export class TransferDataService {
  private url = 'http://localhost:3000/api/tranfers';
  constructor(private http: HttpClient) {}

  getTransfers(): Observable<ReadonlyArray<Transfer>> {
    return this.http.get<ReadonlyArray<Transfer>>(this.url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  addTransfers(transfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(this.url, transfer).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  deleteTransfers(transferId: string) {
    return this.http.delete(`${this.url}/${transferId}`).pipe(
      delay(2000),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateTransfers(transfer: Transfer): Observable<Transfer> {
    return this.http.put<Transfer>(`${this.url}/${transfer.id}`, transfer).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
