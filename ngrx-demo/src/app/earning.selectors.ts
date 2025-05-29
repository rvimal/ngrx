import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EarningState } from './earning.reducer';

export const selectEarningState = createFeatureSelector<EarningState>('earning');

export const selectAllEarnings = createSelector(
  selectEarningState,
  (state) => state.earnings
);
