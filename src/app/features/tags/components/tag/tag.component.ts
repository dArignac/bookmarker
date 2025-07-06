import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tag } from '@features/tags/models/Tag';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  @Input() tag: Tag | undefined;
}
