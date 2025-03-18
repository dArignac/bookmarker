import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  sbService = inject(SupabaseService);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    console.warn(this.sbService.user);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      //console.warn(this.loginForm.value);
      await this.sbService.loginWithEmail(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      );
    }
  }
}
