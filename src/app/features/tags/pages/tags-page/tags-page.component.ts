import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TagCreationComponent } from '@features/tags/components/tag-creation/tag-creation.component';
import { GLOBAL_RX_STATE } from 'app/state';
import { TagComponent } from '../../components/tag/tag.component';

@Component({
  selector: 'app-tags-page',
  imports: [CommonModule, TagComponent, TagCreationComponent],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsPageComponent {
  globalState = inject(GLOBAL_RX_STATE);
  readonly tags$ = this.globalState.select('tags');
}
