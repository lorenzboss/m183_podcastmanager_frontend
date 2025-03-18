import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Writer, CreateWriter } from '../data/writer';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WritersService {
  readonly backendUrl = 'writer';

  constructor(private http: HttpClient) {}

  public getWriters(): Observable<Writer[]> {
    const writers = this.http.get<Writer[]>(
      environment.backendBaseUrl + this.backendUrl
    );
    return writers;
  }

  public saveWriter(writer: CreateWriter): Observable<Writer> {
    return this.http.post<Writer>(
      environment.backendBaseUrl + this.backendUrl,
      writer
    );
  }

  public updateWriter(writer: Writer): Observable<Writer> {
    return this.http.put<Writer>(
      environment.backendBaseUrl + this.backendUrl + '/' + writer.id,
      writer
    );
  }

  public deleteWriter(writer: Writer): Observable<Writer> {
    return this.http.delete<Writer>(
      environment.backendBaseUrl + this.backendUrl + '/' + writer.id
    );
  }
}
