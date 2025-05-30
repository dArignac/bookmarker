import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent {
  router = inject(Router);

  errorMessage: string | null = null;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.errorMessage = navigation?.extras.state?.['message'] || 'An unexpected error occurred.';
  }
}
