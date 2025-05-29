import { createReducer, on } from '@ngrx/store';
import { addEarning, updateEarning, deleteEarning } from './earning.actions';
import { Earning } from './earning.model';

export interface EarningState {
  earnings: Earning[];
}

export const initialState: EarningState = {
  earnings: []
};

export const earningReducer = createReducer(
  initialState,
  on(addEarning, (state, { earning }) => ({
    ...state,
    earnings: [...state.earnings, earning]
  })),
  on(updateEarning, (state, { earning }) => ({
    ...state,
    earnings: state.earnings.map(e => e.id === earning.id ? earning : e)
  })),
  on(deleteEarning, (state, { id }) => ({
    ...state,
    earnings: state.earnings.filter(e => e.id !== id)
  }))
);
