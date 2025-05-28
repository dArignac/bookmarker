import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  router = inject(Router);

  errorMessage: string | null = null;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.errorMessage = navigation?.extras.state?.['message'] || 'An unexpected error occurred.';
  }
}
