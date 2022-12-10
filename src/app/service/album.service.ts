import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Album[]> {
    const url = "https://jsonplaceholder.typicode.com/albums";
    return this.http.get<Album[]>(url);
  }

  getById(pId: number): Observable<Album> {
    //return this.http.get<Album>("https://jsonplaceholder.typicode.com/albums/"+pId);
    return this.http.get<Album>(`https://jsonplaceholder.typicode.com/albums/${pId}`);
  }

  insAlbum(pAlbum: Album): Observable<Album> {
    return this.http.post<Album>("https://jsonplaceholder.typicode.com/albums",pAlbum);
  }

  updAlbum(pAlbum: Album): Observable<Album> {
    return this.http.put<Album>(`https://jsonplaceholder.typicode.com/albums/${pAlbum.id}`,pAlbum);
  }

  delAlbum(pId: number): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/albums/${pId}`);
  }
}
