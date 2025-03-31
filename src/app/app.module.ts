import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistDialogComponent } from './components/artist-dialog/artist-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { PodcastDialogComponent } from './components/podcast-dialog/podcast-dialog.component';
import { TopicDialogComponent } from './components/topic-dialog/topic-dialog.component';
import { IsInRoleDirective } from './dir/is.in.role.dir';
import { IsInRolesDirective } from './dir/is.in.roles.dir';
import { HttpXSRFInterceptor } from './interceptor/http.csrf.interceptor';
import { ArtistsComponent } from './pages/artists/artists.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { PodcastsComponent } from './pages/podcasts/podcasts.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { AppAuthService } from './service/app.auth.service';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'podcastmanager',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    IsInRoleDirective,
    IsInRolesDirective,
    HeaderComponent,
    HomepageComponent,
    NoAccessComponent,
    ArtistsComponent,
    TopicsComponent,
    PodcastsComponent,
    DeleteDialogComponent,
    PodcastDialogComponent,
    ArtistDialogComponent,
    TopicDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    OAuthModule.forRoot({ resourceServer: { sendAccessToken: true } }),
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: AuthConfig, useValue: authConfig },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true },
    {
      provide: OAuthStorage,
      useFactory: storageFactory,
    },
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
}
