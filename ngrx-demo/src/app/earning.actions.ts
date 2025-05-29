import { createAction, props } from '@ngrx/store';
import { Earning } from './earning.model';

export const addEarning = createAction('[Earning] Add', props<{ earning: Earning }>());
export const updateEarning = createAction('[Earning] Update', props<{ earning: Earning }>());
export const deleteEarning = createAction('[Earning] Delete', props<{ id: number }>());
