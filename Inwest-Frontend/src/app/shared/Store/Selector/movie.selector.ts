import { createSelector } from '@ngrx/store';
import { Transfer } from '../../Models/transfer';
import { TransferState } from '../Reducers/movie.reducers';

export const transferSelector = createSelector(
  (state: TransferState) => state.transfers,
  (tranfers: ReadonlyArray<Transfer>) => tranfers
);
