import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  sbService = inject(SupabaseService);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      await this.sbService.loginWithEmail(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      );
    }
  }
}
