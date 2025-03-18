import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoles } from '../app.roles';
import { appCanActivate } from './guard/app.auth.guard';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { PodcastsComponent } from './pages/podcasts/podcasts.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, data: { title: 'Home' } },
  {
    path: 'artists',
    component: ArtistsComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin, AppRoles.Staff, AppRoles.User],
      title: 'Artists',
    },
  },
  {
    path: 'topics',
    component: TopicsComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin, AppRoles.Staff, AppRoles.User],
      title: 'Topics',
    },
  },
  {
    path: 'podcasts',
    component: PodcastsComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin, AppRoles.Staff, AppRoles.User],
      title: 'Podcasts',
    },
  },
  {
    path: 'noaccess',
    component: NoAccessComponent,
    data: { title: 'No Access' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
