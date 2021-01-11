import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user.type';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: User;
  id: string = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
  isEmployer: boolean;
  employeeArray: User[];
  employerArray: User[];
  changesArray: [string, Date, string][];
  showConfirmButton: boolean = false;
  displayedColumns: string[] = ['company', 'firstName', 'lastName', 'AFM', "action0"];
  displayedColumns2: string[] = ['firstName', 'lastName', 'AFM', "action1", 'action2', 'action3'];
  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this,this.changesArray = [];
    if (!(this.cookieService.check('usersCookie'))) {
      alert('Not Authorized!');
      this.router.navigate(['']);
    }
    this.userService.profile(this.id).then(response => {
      if (response.found) {
        if(response.User.type === "E"){
          this.isEmployer = true;
          this.employeeArray = [];
          response.User.employees.forEach(employee => {
            employee.showButtonS = false;
            employee.showButtonW = false;
            employee.showButtonL = false;
            this.employeeArray.push(employee);
          });
        }
        else{
          this.isEmployer = false;
          this.employerArray = [];
          response.User.employers.forEach(employer => {
            employer.showButtonS = false;
            employer.showButtonW = false;
            employer.showButtonL = false;
            this.employerArray.push(employer);
          });
        }
        this.userData = response.User;
      }
      else {
        console.log('cant find user!');
      }
    });
  }

  suspend(user:User):void{
    var index = this.employeeArray.indexOf(user);
    this.employeeArray[index].showButtonL = false;
    this.employeeArray[index].showButtonW= false;
    if(this.employeeArray[index].showButtonS === false){
      this.employeeArray[index].showButtonS = true;
      this.showConfirmButton = true;
    }
    else{
      this.employeeArray[index].showButtonS = false;
    }
    this.changesArray.push([user.id, null, "S"]);
  }
  workFromHome(user:User):void{
    var index = this.employeeArray.indexOf(user);
    this.employeeArray[index].showButtonL = false;
    this.employeeArray[index].showButtonS = false;
    if(this.employeeArray[index].showButtonW === false){
      this.employeeArray[index].showButtonW = true;
      this.showConfirmButton = true;
    }
    else{
      this.employeeArray[index].showButtonW = false;
    }
    this.changesArray.push([user.id, null, "S"]);

  }
  leave(user:User):void{
    var index = this.employeeArray.indexOf(user);
    this.employeeArray[index].showButtonW = false;
    this.employeeArray[index].showButtonS = false;
    if(this.employeeArray[index].showButtonL === false){
      this.employeeArray[index].showButtonL = true;
      this.showConfirmButton = true;
    }
    else{
      this.employeeArray[index].showButtonL = false;
    }
  }
  confirm(): void{
    console.log(this.changesArray);
  }
}
