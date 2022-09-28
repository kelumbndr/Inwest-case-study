import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  tap
} from 'rxjs/operators';
import { TransferDataService } from '../../services/transfer-data.service';
import {
  addTransfer,
  addTransferSuccess,
  deleteTransfer,
  deleteTransferSuccess,
  getTransfers,
  getTransfersSuccess,
  updateTransfer,
  updateTransferSuccess
} from '../Actions/transfer.action';


@Injectable()
export class TransferEffects {


  loadTransfers$ = createEffect(() =>
    this.action$.pipe(
      ofType(getTransfers),
      exhaustMap(() =>
        this.transferDataService.getTransfers().pipe(
          map((transfers) => {
            console.log(transfers);
            return getTransfersSuccess(transfers);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addTransfer$ = createEffect(() =>
    this.action$.pipe(
      ofType(addTransfer),
      tap((transfer) => console.log(transfer)),
      concatMap(({ transfer }) =>
        this.transferDataService.addTransfers(transfer).pipe(
          map((newTransfer) => addTransferSuccess(newTransfer)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteTransfer$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteTransfer),
      mergeMap(({ transferId }) =>
        this.transferDataService.deleteTransfers(transferId).pipe(
          map(() => deleteTransferSuccess(transferId)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateTransfer$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateTransfer),
      concatMap(({ transfer }) =>
        this.transferDataService.updateTransfers(transfer).pipe(
          map(() => updateTransferSuccess(transfer)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private action$: Actions, private transferDataService: TransferDataService) {}

}
