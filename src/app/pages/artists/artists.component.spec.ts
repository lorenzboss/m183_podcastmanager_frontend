import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsComponent } from './artists.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { IsInRoleDirective } from '../../dir/is.in.role.dir';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { authConfig } from '../../app.module';

describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        HttpClientModule,
        OAuthModule.forRoot({ resourceServer: { sendAccessToken: true } }),
      ],
      providers: [{ provide: AuthConfig, useValue: authConfig }],
      declarations: [ArtistsComponent, IsInRoleDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
