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
        const { error } = await this.sbService.instance
          .from('profiles')
          .insert({ name: this.form.value.name, user_id: this.sbService.user!.id });
        console.warn('error', error); // FIXME error handling
        this.form.reset(); // Reset the form after successful submission
      } finally {
        this.isLoading = false; // Stop loading
      }
    }
  }

  showToast() {
    this.toastService.showToast('Lorem Ipsum', 'error');
  }
}
