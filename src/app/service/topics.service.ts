import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTopic, Topic } from '../data/topic';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  readonly backendUrl = 'topic';

  constructor(private http: HttpClient) {}

  public getTopics(): Observable<Topic[]> {
    const topics = this.http.get<Topic[]>(
      environment.backendBaseUrl + this.backendUrl
    );
    return topics;
  }

  public saveTopic(topic: CreateTopic): Observable<Topic> {
    return this.http.post<Topic>(
      environment.backendBaseUrl + this.backendUrl,
      topic
    );
  }

  public updateTopic(topic: Topic): Observable<Topic> {
    return this.http.put<Topic>(
      environment.backendBaseUrl + this.backendUrl + '/' + topic.id,
      topic
    );
  }

  public deleteTopic(topic: Topic): Observable<Topic> {
    return this.http.delete<Topic>(
      environment.backendBaseUrl + this.backendUrl + '/' + topic.id
    );
  }
}
