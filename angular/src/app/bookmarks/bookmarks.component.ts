import { Component, inject, OnInit, resource } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  imports: [],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private serviceApi = inject(ApiService);

  user: User = this.activatedRoute.snapshot.data['user'];

  bookmarksResource = resource({
    loader: () => firstValueFrom(this.serviceApi.getBookmarks()),
  });

  ngOnInit(): void {
    // TODO remove?
  }
}
