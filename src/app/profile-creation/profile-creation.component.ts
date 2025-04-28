import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-profile-creation',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-creation.component.html',
  styleUrl: './profile-creation.component.scss',
})
export class ProfileCreationComponent {
  sbService = inject(SupabaseService);
  formBuilder = inject(FormBuilder);
  toastService = inject(ToastService);

  form = this.formBuilder.group({
    name: ['', Validators.required],
  });

  isLoading = false;

  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true; // Start loading
      try {
        const { error } = await this.sbService.instance.from('profiles').insert({ name: this.form.value.name, user_id: this.sbService.user!.id });
        if (error == null) {
          this.form.reset(); // Reset the form after successful submission
        } else {
          this.showToast(error.details);
        }
      } finally {
        this.isLoading = false; // Stop loading
      }
    }
  }

  showToast(errorMessage: string) {
    this.toastService.showToast(errorMessage, 'error');
  }
}
