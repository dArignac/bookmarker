import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bookmark } from '@features/profiles/models/Bookmark';

@Component({
  selector: 'app-bookmark-list',
  imports: [CommonModule],
  templateUrl: './bookmark-list.component.html',
  styleUrl: './bookmark-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkListComponent {
  @Input() bookmarks: Bookmark[] | null = null;
}
