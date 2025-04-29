import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostgrestError } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase.service';
import { ToastService } from '../toast.service';
import { Profile } from '../types';

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

  passedEditId = input(''); // the id handed over from the profile component
  profileInEdit: Profile | null = null; // the profile that we are currently editing

  form = this.formBuilder.group({
    name: ['', Validators.required],
  });

  isLoading = false;

  constructor() {
    effect(() => {
      const id = this.passedEditId();
      if (!id) return;

      (async () => {
        if (id.length > 0) {
          const { data, error }: { data: Profile[] | null; error: PostgrestError | null } = await this.sbService.instance.from('profiles').select('id,name').eq('id', id);
          if (error === null) {
            if (data === null) {
              this.toastService.showToast('Requested profile returned no data!', 'error');
            } else {
              if (data.length != 1) {
                this.toastService.showToast('Requested profile returned more than one profile!', 'error');
              } else {
                this.profileInEdit = data[0];
              }
            }
          } else {
            this.toastService.showToast('Unable to load selected profile!', 'error');
          }
        }
      })();
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true; // Start loading
      try {
        const { error } = await this.sbService.instance.from('profiles').insert({ name: this.form.value.name, user_id: this.sbService.user!.id });
        if (error == null) {
          this.form.reset(); // Reset the form after successful submission
        } else {
          this.toastService.showToast(error.details, 'error');
        }
      } finally {
        this.isLoading = false; // Stop loading
      }
    }
  }
}
