import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(
    public authservice: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}
user 
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.authservice.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

  }

  // tslint:disable-next-line: typedef
  login() {
    this.authservice.login(this.model).subscribe(
      (next) => {
        this.alertify.success('logged in successfully');
      },
      (error) => {
        this.alertify.error(error);
      }, () => {
          this.router.navigate(['/members']);
      }
    );
  }

  // tslint:disable-next-line: typedef
  loggedIn() {
    return this.authservice.loggedIn();
  }
  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authservice.decodedToken = null;
    this.authservice.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['home']);
  }
}
