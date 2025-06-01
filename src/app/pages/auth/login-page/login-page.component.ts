import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase/supabase.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  sbService = inject(SupabaseService);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  isLoading = false; // New property to track loading state

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Start loading
      try {
        await this.sbService.loginWithEmail(this.loginForm.value.email!, this.loginForm.value.password!);
      } finally {
        this.isLoading = false; // Stop loading
      }
    }
  }
}
