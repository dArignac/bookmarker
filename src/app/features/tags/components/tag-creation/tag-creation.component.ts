import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { ToastService } from '@core/services/toast/toast.service';
import { Tag } from '@features/tags/models/Tag';

@Component({
  selector: 'app-tag-creation',
  imports: [ReactiveFormsModule],
  templateUrl: './tag-creation.component.html',
  styleUrl: './tag-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagCreationComponent {
  sbService = inject(SupabaseService);
  formBuilder = inject(FormBuilder);
  toastService = inject(ToastService);

  passedEditId = input(''); // the id handed over from the profile component
  tagInEdit: Tag | null = null; // the profile that we are currently editing

  form = this.formBuilder.group({
    name: ['', Validators.required],
  });

  isLoading = false;

  // FIXME edit mode
  // constructor() {
  //   effect(() => {
  //     const id = this.passedEditId();
  //     if (!id) return;

  //     (async () => {
  //       if (id.length > 0) {
  //         const { data, error }: { data: Bookmark[] | null; error: PostgrestError | null } = await this.sbService.instance.from('bookmarks').select('id,name').eq('id', id);
  //         if (error === null) {
  //           if (data === null) {
  //             this.toastService.showToast('Requested profile returned no data!', 'error');
  //           } else {
  //             if (data.length != 1) {
  //               this.toastService.showToast('Requested profile returned more than one profile!', 'error');
  //             } else {
  //               this.bookmarkInEdit = data[0];
  //               this.form.patchValue({ name: this.bookmarkInEdit.name }); // Populate the name field
  //             }
  //           }
  //         } else {
  //           this.toastService.showToast('Unable to load selected profile!', 'error');
  //         }
  //       }
  //     })();
  //   });
  // }

  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true; // Start loading

      try {
        // distinguish between updating and creating
        if (this.tagInEdit === null) {
          await this.createTag();
        } else {
          await this.updateTag();
        }
      } finally {
        this.isLoading = false; // Stop loading
      }
    }
  }

  async createTag() {
    const { error } = await this.sbService.instance.from('tags').insert({ name: this.form.value.name, user_id: this.sbService.user!.id });
    if (error == null) {
      this.form.reset(); // Reset the form after successful submission
    } else {
      this.toastService.showToast(error.details, 'error');
    }
  }

  // FIXME edit mode
  async updateTag() {
    // if (this.bookmarkInEdit !== null) {
    //   const { error } = await this.sbService.instance.from('profiles').update({ name: this.form.value.name }).eq('id', this.bookmarkInEdit.id);
    //   if (error == null) {
    //     this.form.reset(); // Reset the form after successful submission
    //     this.bookmarkInEdit = null;
    //   } else {
    //     this.toastService.showToast(error.details, 'error');
    //   }
    // } else {
    //   this.toastService.showToast('Unable to update the profile!', 'error');
    // }
  }
}
