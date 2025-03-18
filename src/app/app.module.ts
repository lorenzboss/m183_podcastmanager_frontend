import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpXSRFInterceptor } from './interceptor/http.csrf.interceptor';
import { AppAuthService } from './service/app.auth.service';
import { IsInRoleDirective } from './dir/is.in.role.dir';
import { IsInRolesDirective } from './dir/is.in.roles.dir';
import { environment } from '../environments/environment.prod';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddArtistDialogComponent } from './components/add-artist-dialog/add-artist-dialog.component';
import { EditArtistDialogComponent } from './components/edit-artist-dialog/edit-artist-dialog.component';
import { DeleteArtistDialogComponent } from './components/delete-artist-dialog/delete-artist-dialog.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { AddTopicDialogComponent } from './components/add-topic-dialog/add-topic-dialog.component';
import { EditTopicDialogComponent } from './components/edit-topic-dialog/edit-topic-dialog.component';
import { DeleteTopicDialogComponent } from './components/delete-topic-dialog/delete-topic-dialog.component';
import { PodcastsComponent } from './pages/podcasts/podcasts.component';
import { AddPodcastDialogComponent } from './components/add-podcast-dialog/add-podcast-dialog.component';
import { EditPodcastDialogComponent } from './components/edit-podcast-dialog/edit-podcast-dialog.component';
import { DeletePodcastDialogComponent } from './components/delete-podcast-dialog/delete-podcast-dialog.component';
import { MatSelectModule } from '@angular/material/select';

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
    AddArtistDialogComponent,
    EditArtistDialogComponent,
    DeleteArtistDialogComponent,
    TopicsComponent,
    AddTopicDialogComponent,
    EditTopicDialogComponent,
    DeleteTopicDialogComponent,
    PodcastsComponent,
    AddPodcastDialogComponent,
    EditPodcastDialogComponent,
    DeletePodcastDialogComponent,
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
