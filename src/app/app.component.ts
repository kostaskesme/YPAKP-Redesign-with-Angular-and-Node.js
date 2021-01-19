import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'YPAKP';
  location: string = window.location.href;
  loggedIn: boolean;
  profileLink: string;
  pageId: string;

  cookieValueJSON = {
    id: 0,
    firstName: 'unavailable',
    lastName: 'unavailable'
  };
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void{
    this.loggedIn = this.cookieService.check('usersCookie');
    this.profileLink = "profile/" + this.cookieService.get('usersCookie');
    if(window.location.href.includes("profile")){
      this.pageId = "profile";
    }
    else{
      this.pageId = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1)
      if(this.pageId == ""){
        this.pageId = "home"
      }
    }
    document.getElementById(this.pageId).classList.add("active");
  }

  logout(): void{
    this.router.navigate(['']).then( () =>{
      this.cookieService.delete('usersCookie', '/');
      window.location.reload();
    })
  }
}
