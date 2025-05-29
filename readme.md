# NgRx Implementation Technical Documentation

## Overview
This document describes the implementation of NgRx state management in the Angular application located in the root folder (`ngrx-demo`). The project demonstrates a simple earnings tracker using NgRx Store, Actions, Reducers, and Selectors.

## Project Structure
- `src/app/earning.model.ts`: Defines the `Earning` interface, representing an earning record with `id`, `description`, and `amount` fields.
- `src/app/earning.actions.ts`: Defines NgRx actions for adding, updating, and deleting earnings using `createAction` and `props`.
- `src/app/earning.reducer.ts`: Contains the reducer and state definition for earnings. Handles state transitions for each action and maintains an array of earnings.
- `src/app/earning.selectors.ts`: Provides selectors to access earnings state, including a feature selector and a selector for all earnings.
- `src/app/earning.component.ts`: Standalone Angular component for interacting with the earnings state. Handles user input, dispatches actions, and displays the earnings list.
- `src/app/app.config.ts`: Configures the NgRx Store and registers the earnings feature state using `provideStore` and `provideState`.

## NgRx Setup Details
### 1. State Model
- **Earning Interface:**
  ```typescript
  export interface Earning {
    id: number;
    description: string;
    amount: number;
  }
  ```
- **EarningState Interface:**
  ```typescript
  export interface EarningState {
    earnings: Earning[];
  }
  ```

### 2. Actions
- **addEarning:** Adds a new earning to the state.
- **updateEarning:** Updates an existing earning by ID.
- **deleteEarning:** Removes an earning by ID.

Example:
```typescript
export const addEarning = createAction('[Earning] Add', props<{ earning: Earning }>());
```

### 3. Reducer
- Uses `createReducer` and `on` to handle each action.
- Returns new state objects for immutability.

Example:
```typescript
export const earningReducer = createReducer(
  initialState,
  on(addEarning, (state, { earning }) => ({
    ...state,
    earnings: [...state.earnings, earning]
  })),
  // ...other handlers...
);
```

### 4. Selectors
- **Feature Selector:**
  ```typescript
  export const selectEarningState = createFeatureSelector<EarningState>('earning');
  ```
- **All Earnings Selector:**
  ```typescript
  export const selectAllEarnings = createSelector(
    selectEarningState,
    (state) => state.earnings
  );
  ```

### 5. Store Configuration
In `app.config.ts`:
```typescript
import { provideState, provideStore } from '@ngrx/store';
import { earningReducer } from './earning.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...other providers...
    provideStore(),
    provideState('earning', earningReducer)
  ]
};
```

## Component Integration
- `EarningComponent` uses the NgRx Store to select and dispatch state changes.
- Uses `ngModel` for form inputs and dispatches actions on form submission or delete.
- The component is standalone and imports `CommonModule` and `FormsModule` for template features.
- The earnings list is displayed reactively using the async pipe.

### Example Component Usage
```html
<app-earning></app-earning>
```

### Example Component Logic
```typescript
export class EarningComponent {
  earnings$: Observable<Earning[]>;
  description = '';
  amount: number | null = null;

  constructor(private store: Store) {
    this.earnings$ = this.store.select(selectAllEarnings);
  }

  add() {
    if (this.description && this.amount != null) {
      const earning: Earning = {
        id: Date.now(),
        description: this.description,
        amount: this.amount
      };
      this.store.dispatch(addEarning({ earning }));
      this.description = '';
      this.amount = null;
    }
  }

  remove(id: number) {
    this.store.dispatch(deleteEarning({ id }));
  }
}
```

## Best Practices
- Keep actions, reducers, and selectors in separate files for maintainability.
- Use feature state names (like `'earning'`) to avoid state collisions.
- Use selectors for all state reads to enable memoization and better testability.
- Use immutable state updates in reducers.
- Use the async pipe in templates to manage subscriptions automatically.

## Extending the Implementation
- Add more features (e.g., editing earnings, loading from an API) by creating new actions, effects, and selectors.
- Use NgRx Effects for handling side effects like HTTP requests.
- Add unit tests for actions, reducers, and selectors.

## References
- [NgRx Documentation](https://ngrx.io/docs)
- [Angular Standalone Components](https://angular.dev/guide/standalone-components)

---
This documentation provides a detailed overview of how NgRx is implemented in this Angular project. For more details, see the individual files in the `src/app` directory.
