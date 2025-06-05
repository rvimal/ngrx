import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Earning } from './earning.model';
import { selectAllEarnings } from './earning.selectors';
import { addEarning, updateEarning, deleteEarning } from './earning.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-earning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Earnings</h2>
    <form (ngSubmit)="add()">
      <input [(ngModel)]="description" name="description" placeholder="Description" required />
      <input [(ngModel)]="amount" name="amount" type="number" placeholder="Amount" required />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li *ngFor="let earning of earnings$ | async">
        {{ earning.description }}: {{ earning.amount }}
        <button (click)="remove(earning.id)">Delete</button>
      </li>
    </ul>
  `
})
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
