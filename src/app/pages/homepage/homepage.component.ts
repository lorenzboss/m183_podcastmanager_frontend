import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../service/app.auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  preferredUsername: string = '';
  givenName: string = '';
  familyName: string = '';
  email: string = '';

  constructor(private authService: AppAuthService) {}

  ngOnInit(): void {
    this.authService.preferredUsernameObservable.subscribe(
      (preferredUsername) => {
        this.preferredUsername = preferredUsername;
      }
    );

    this.authService.givenNameObservable.subscribe((givenName) => {
      this.givenName = givenName;
    });

    this.authService.familyNameObservable.subscribe((familyName) => {
      this.familyName = familyName;
    });

    this.authService.emailObservable.subscribe((email) => {
      this.email = email;
    });
  }
}
