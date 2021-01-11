import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) { }

    // public viewAllUsers() {
    //     const url = `${environment.appUrl}/users`;
    //     return this.httpClient.get<any>(url).toPromise().then(response => {
    //         return Promise.resolve(response);
    //     })
    // }

    public profile(id: string) {
        const url = `${environment.appUrl}/users/${id}`;
        return this.httpClient.get<any>(url).toPromise().then(response => {
            return Promise.resolve(response);
        })
    }

    public logout() {
        this.cookieService.delete('usersCookie');
        this.router.navigate(['']);
    }

    // public GoToProfile() {
    //     var cookie = JSON.parse(this.cookieService.get('usersCookie'));
    //     if (cookie.type === 0) {
    //         this.router.navigate(['viewUser']);
    //     }
    //     else {
    //         this.router.navigate([`profile/${cookie.id}`]);
    //     }
    // }
}
