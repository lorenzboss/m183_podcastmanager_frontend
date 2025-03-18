import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist, CreateArtist } from '../data/artist';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  readonly backendUrl = 'artist';

  constructor(private http: HttpClient) {}

  public getArtists(): Observable<Artist[]> {
    const artists = this.http.get<Artist[]>(
      environment.backendBaseUrl + this.backendUrl
    );
    return artists;
  }

  public saveArtist(artist: CreateArtist): Observable<Artist> {
    return this.http.post<Artist>(
      environment.backendBaseUrl + this.backendUrl,
      artist
    );
  }

  public updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(
      environment.backendBaseUrl + this.backendUrl + '/' + artist.id,
      artist
    );
  }

  public deleteArtist(artist: Artist): Observable<Artist> {
    return this.http.delete<Artist>(
      environment.backendBaseUrl + this.backendUrl + '/' + artist.id
    );
  }
}
