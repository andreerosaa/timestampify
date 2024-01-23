import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private _router: Router) {}

  timer: number = 1;

  ngOnInit() {
    this.IncrementProgressSpinner();
  }

  IncrementProgressSpinner() {
    if (this.timer > 100) {
      this._router.navigate(['/']);
      return;
    }

    this.timer++;

    setTimeout(() => this.IncrementProgressSpinner(), 30);
  }
}
