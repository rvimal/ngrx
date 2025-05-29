# EarningComponent Documentation

## Overview
`EarningComponent` is a standalone Angular component that demonstrates NgRx state management for a simple earnings tracker. It allows users to add and remove earnings, with all state managed via NgRx Store.

## Features
- **Add Earning:** Users can input a description and amount, then add it to the earnings list.
- **Remove Earning:** Each earning can be deleted from the list.
- **Reactive State:** The list of earnings is managed by NgRx and displayed reactively.

## Dependencies
- `@ngrx/store` for state management
- `@ngrx/store/selectors` for selecting state
- `@angular/forms` for two-way binding with `ngModel`
- `rxjs` for observable streams

## Template Structure
- **Form:**
  - `description` (text input)
  - `amount` (number input)
  - Submit button to add earning
- **List:**
  - Displays all earnings from the store
  - Each item has a delete button

## State Management
- **Selector:** `selectAllEarnings` selects the earnings array from the NgRx store.
- **Actions:**
  - `addEarning` dispatches a new earning to the store
  - `deleteEarning` removes an earning by ID

## Component Class
- **Properties:**
  - `earnings$`: Observable of the earnings array from the store
  - `description`: Bound to the description input
  - `amount`: Bound to the amount input
- **Constructor:** Injects the NgRx `Store` and initializes `earnings$`.
- **Methods:**
  - `add()`: Dispatches `addEarning` with a new earning object
  - `remove(id: number)`: Dispatches `deleteEarning` for the given ID

## Example Usage
```
<app-earning></app-earning>
```

## Notes
- The component uses Angular's standalone component feature and must be imported in the parent module/component.
- Make sure `FormsModule` is included in the `imports` array for `ngModel` to work.
- All state changes are handled via NgRx actions and reducers.
