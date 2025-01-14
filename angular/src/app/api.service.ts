import { HttpClient } from '@angular/common/http';
import { Injectable, resource } from '@angular/core';
import { Bookmark } from './models/Bookmark';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token: string = '';

  constructor(private http: HttpClient) {}

  setAccessToken(token: string) {
    this.token = token;
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${environment.apiUrl}/bookmarks`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
