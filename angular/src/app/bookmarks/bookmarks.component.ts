import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  imports: [],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  // FIXME necessary?
  // user: User = this.activatedRoute.snapshot.data['user'];

  // bookmarksResource = resource({
  //   loader: () => firstValueFrom(this.serviceApi.getBookmarks()),
  // });

  ngOnInit(): void {
    // TODO remove?
  }
}
