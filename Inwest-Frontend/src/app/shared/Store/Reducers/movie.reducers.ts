import {
  ActionReducerMap,
  createReducer, on
} from '@ngrx/store';
import { Transfer } from '../../Models/transfer';

import {
  addTransferSuccess, deleteTransferSuccess, getTransfersSuccess, updateTransferSuccess
} from '../Actions/transfer.action';

export interface TransferState {
  transfers: ReadonlyArray<Transfer>;
}

const initialState: ReadonlyArray<Transfer> = [];

export const transferReducer = createReducer(
  initialState,
  on(getTransfersSuccess, (state, { transfers }) => [...transfers]),
  on(addTransferSuccess, (state, { transfer }) => [...state, transfer]),
  on(deleteTransferSuccess, (state, { transferId }) =>
    state.filter((transfer) => transfer.id !== transferId)
  ),
  on(updateTransferSuccess, (state, { transfer }) => {
    const transfers = state.map((t) => {
      if (t.id === transfer.id) {
        return transfer;
      }
      return t;
    });
    return transfers;
  })
);

export const reducers: ActionReducerMap<TransferState> = {
  transfers: transferReducer
}