import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePodcast, Podcast, UpdatePodcast } from '../data/podcast';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PodcastsService {
  readonly backendUrl = 'podcast';

  constructor(private http: HttpClient) {}

  public getPodcasts(): Observable<Podcast[]> {
    const podcasts = this.http.get<Podcast[]>(
      environment.backendBaseUrl + this.backendUrl
    );
    return podcasts;
  }

  public savePodcast(podcast: CreatePodcast): Observable<Podcast> {
    return this.http.post<Podcast>(
      environment.backendBaseUrl + this.backendUrl,
      podcast
    );
  }

  public updatePodcast(podcast: UpdatePodcast): Observable<Podcast> {
    return this.http.put<Podcast>(
      environment.backendBaseUrl + this.backendUrl + '/' + podcast.id,
      podcast
    );
  }

  public deletePodcast(podcast: Podcast): Observable<Podcast> {
    return this.http.delete<Podcast>(
      environment.backendBaseUrl + this.backendUrl + '/' + podcast.id
    );
  }
}
