import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from './models/Bookmark';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token: string = '';

  constructor(private http: HttpClient) {}

  setAccessToken(token: string) {
    this.token = token;
  }

  getBookmarks(): Bookmark[] {
    this.http
      .get<Bookmark[]>(`${environment.apiUrl}/bookmarks`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((x) => {
        // FIXME handle
        console.log(x);
      });

    return [];
  }
}
