import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArtistsService } from './artists.service';
import { Artist, CreateArtist } from '../data/artist';
import { environment } from '../../environments/environment.prod';

describe('ArtistsService', () => {
  let service: ArtistsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistsService],
    });

    service = TestBed.inject(ArtistsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch artists', () => {
    const dummyArtists: Artist[] = [
      { id: 1, firstname: 'Jay', lastname: 'Samuelz' },
      { id: 2, firstname: 'Arya', lastname: 'Lee' },
    ];

    service.getArtists().subscribe((artists) => {
      expect(artists.length).toBe(2);
      expect(artists).toEqual(dummyArtists);
    });

    const req = httpMock.expectOne(
      environment.backendBaseUrl + service.backendUrl
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyArtists);
  });

  it('should save an artist', () => {
    const dummyArtist: CreateArtist = {
      firstname: 'Marques',
      lastname: 'Brownlee',
    };

    const returnedArtist: Artist = {
      id: 1,
      firstname: 'Marques',
      lastname: 'Brownlee',
    };

    service.saveArtist(dummyArtist).subscribe((artist) => {
      expect(artist).toEqual(returnedArtist);
    });

    const req = httpMock.expectOne(
      environment.backendBaseUrl + service.backendUrl
    );
    expect(req.request.method).toBe('POST');
    req.flush(returnedArtist);
  });

  it('should update an artist', () => {
    const dummyArtist: Artist = {
      id: 1,
      firstname: 'Andrew',
      lastname: 'Manganelli',
    };

    service.updateArtist(dummyArtist).subscribe((artist) => {
      expect(artist).toEqual(dummyArtist);
    });

    const req = httpMock.expectOne(
      environment.backendBaseUrl + service.backendUrl + '/' + dummyArtist.id
    );
    expect(req.request.method).toBe('PUT');
    req.flush(dummyArtist);
  });

  it('should delete an artist', () => {
    const dummyArtist: Artist = { id: 1, firstname: 'David', lastname: 'Imel' };

    service.deleteArtist(dummyArtist).subscribe((artist) => {
      expect(artist).toEqual(dummyArtist);
    });

    const req = httpMock.expectOne(
      environment.backendBaseUrl + service.backendUrl + '/' + dummyArtist.id
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyArtist);
  });
});
