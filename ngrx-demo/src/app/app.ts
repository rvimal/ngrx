import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EarningComponent } from './earning/earning.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EarningComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ngrx-demo';
}
