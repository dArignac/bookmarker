import { Component, inject, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

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

  ngOnInit(): void {
    this.serviceApi.getBookmarks();
  }
}
