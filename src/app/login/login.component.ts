import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService) {}

  cookieValue = 'UNKNOWN';

  cookieValueJSON = {
    id: 0,
    username: 'unavailable',
  };

  logData = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  submitted = false;
  bool1: boolean;
  bool2: boolean;
  fControls: any;

  updateUserCookie(user): void {
    this.cookieValueJSON = {
      id: user._id,
      username: user.username,
    };
    this.cookieValue = JSON.stringify(this.cookieValueJSON);
    this.cookieService.set('usersCookie', this.cookieValue);
  }

  ngOnInit(): void{
    console.log('paparia')    
    this.bool1 = this.logData.controls.username.errors.required;
    this.bool2 = this.logData.controls.password.errors.required;
    this.fControls = this.logData.controls;
  }

  login(): void {
    this.submitted = true;
    if (this.logData.invalid) {
      return;
    }
    this.authenticationService.authenticate(this.logData.value).then(result => {
      if (result.isLoggedIn) {
        if (this.cookieService.check('usersCookie')) {
          this.cookieService.delete('usersCookie');
        }
        this.updateUserCookie(result.user);
        // if (this.cookieValueJSON.type === 0) {
        //   this.router.navigate(['admin']);
        // }
        // else {
        //   if (this.cookieValueJSON.approved) {
        //     this.router.navigate([`profile/${this.cookieValueJSON.id}`]);
        //   }
        //   else {
        //     this.cookieService.delete('usersCookie');
        //     this.router.navigate(['pending']);
        //   }
        // }
      } else {
        alert('Invalid credentials');
      }
    });
  }
}