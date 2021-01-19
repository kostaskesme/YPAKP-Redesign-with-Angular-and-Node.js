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

  logData = new FormGroup({
    afm: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  submitted = false;
  bool1: boolean;
  bool2: boolean;
  fControls: any;

  ngOnInit(): void{
    this.bool1 = this.logData.controls.afm.errors.required;
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
          this.cookieService.delete('usersCookie', '/');
        }
        this.cookieService.set('usersCookie', result.user._id);
        this.router.navigate([`profile/${result.user._id}`]).then(() =>{
          window.location.reload();
        });
      }
      else if(result.message == 'Incorrect Password'){
        alert('Λανθασμένος Κωδικός')
      }else {
        alert('Λανθασμένος ΑΦΜ');
      }
    });
  }
}
