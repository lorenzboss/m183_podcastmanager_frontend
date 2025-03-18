import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly usernameObservable: Observable<string> =
    this.usernameSubject.asObservable();
  private useraliasSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly useraliasObservable: Observable<string> =
    this.useraliasSubject.asObservable();
  private emailSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly emailObservable: Observable<string> =
    this.emailSubject.asObservable();
  private givenNameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly givenNameObservable: Observable<string> =
    this.givenNameSubject.asObservable();
  private familyNameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly familyNameObservable: Observable<string> =
    this.familyNameSubject.asObservable();
  private preferredUsernameSubject: BehaviorSubject<string> =
    new BehaviorSubject('');
  public readonly preferredUsernameObservable: Observable<string> =
    this.preferredUsernameSubject.asObservable();
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly accessTokenObservable: Observable<string> =
    this.accessTokenSubject.asObservable();

  constructor(
    private oauthService: OAuthService,
    private authConfig: AuthConfig
  ) {
    this.handleEvents(null);
  }

  private _decodedAccessToken: any;

  get decodedAccessToken() {
    return this._decodedAccessToken;
  }

  private _accessToken = '';

  get accessToken() {
    return this._accessToken;
  }

  async initAuth(): Promise<any> {
    return new Promise<void>(() => {
      this.oauthService.configure(this.authConfig);
      this.oauthService.events.subscribe((e) => this.handleEvents(e));
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.oauthService.setupAutomaticSilentRefresh();
    });
  }

  public getRoles(): Observable<Array<string>> {
    if (this._decodedAccessToken !== null) {
      return new Observable<Array<string>>((observer) => {
        if (this._decodedAccessToken.resource_access.podcastmanager.roles) {
          if (
            Array.isArray(
              this._decodedAccessToken.resource_access.podcastmanager.roles
            )
          ) {
            const resultArr =
              this._decodedAccessToken.resource_access.podcastmanager.roles.map(
                (r: string) => r.replace('ROLE_', '')
              );
            observer.next(resultArr);
          } else {
            observer.next([
              this._decodedAccessToken.resource_access.podcastmanager.roles.replace(
                'ROLE_',
                ''
              ),
            ]);
          }
        }
      });
    }
    return of([]);
  }

  public getIdentityClaims(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }

  public logout() {
    this.oauthService.logOut();
    this.useraliasSubject.next('');
    this.usernameSubject.next('');
    this.emailSubject.next('');
    this.givenNameSubject.next('');
    this.familyNameSubject.next('');
    this.preferredUsernameSubject.next('');
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  private handleEvents(event: any) {
    if (event instanceof OAuthErrorEvent) {
      console.error(event);
    } else {
      this._accessToken = this.oauthService.getAccessToken();
      this.accessTokenSubject.next(this._accessToken);
      this._decodedAccessToken = this.jwtHelper.decodeToken(this._accessToken);

      // Extrahieren der Daten aus dem JWT-Token
      if (this._decodedAccessToken) {
        // Vorname und Nachname
        if (
          this._decodedAccessToken?.given_name &&
          this._decodedAccessToken?.family_name
        ) {
          const username =
            this._decodedAccessToken?.given_name +
            ' ' +
            this._decodedAccessToken?.family_name;
          this.usernameSubject.next(username);
        }

        // Vorname, Nachname, E-Mail und bevorzugter Benutzername
        this.givenNameSubject.next(this._decodedAccessToken?.given_name || '');
        this.familyNameSubject.next(
          this._decodedAccessToken?.family_name || ''
        );
        this.emailSubject.next(this._decodedAccessToken?.email || '');
        this.preferredUsernameSubject.next(
          this._decodedAccessToken?.preferred_username || ''
        );
      }

      const claims = this.getIdentityClaims();
      if (claims !== null) {
        if (claims['preferred_username'] !== '') {
          this.useraliasSubject.next(claims['preferred_username']);
        }
      }
    }
  }
}
