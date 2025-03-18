import { Component } from '@angular/core';
import { AppAuthService } from '../../service/app.auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentPage?: string;

  constructor(
    private authService: AppAuthService,
    public oauthService: OAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          if (child?.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return undefined;
        })
      )
      .subscribe((ttl: string | undefined) => {
        this.currentPage = ttl;
      });
  }

  login() {
    console.log('login');
    this.authService.login();
  }

  logout() {
    console.log('logout');
    this.authService.logout();
  }
}
