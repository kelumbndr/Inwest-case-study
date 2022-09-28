import { createAction, props } from '@ngrx/store';
import { Transfer } from '../../Models/transfer';

export const getTransfers = createAction('[Transfer] Get transfer');
export const getTransfersSuccess = createAction(
  '[Transfer] Get transfer success',
  (transfers: ReadonlyArray<Transfer>) => ({ transfers })
);

export const addTransfer = createAction(
  '[Transfer] Add transfer',
  (transfer: Transfer) => ({ transfer })
);
export const addTransferSuccess = createAction(
  '[Transfer] Add transfer success',
  (transfer: Transfer) => ({ transfer })
);

export const deleteTransfer = createAction(
  '[Transfer] Delete transfer',
  (transferId: string) => ({ transferId })
);

export const deleteTransferSuccess = createAction(
  '[Transfer] Delete transfer success',
  (transferId: string) => ({ transferId })
);

export const updateTransfer = createAction(
  '[Transfer] Update transfer',
  (transfer: Transfer) => ({ transfer })
);

export const updateTransferSuccess = createAction(
  '[Transfer] Update transfer success',
  (transfer: Transfer) => ({ transfer })
);
