import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  minDate: Date = new Date();
  employeeArray: User[];
  employer: User;
  changesArray: [string, Date, string][];
  showConfirmButton: boolean = false;
  applied: boolean = false;
  displayedColumns: string[] = ['firstName', 'lastName', 'AFM', "situation", "situationDate", "action1", 'action2', 'action3', 'action4'];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) { }

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
          this.employeeArray = response.array;
          this.employeeArray.forEach(element => {
            if(element.situation === "S"){
              element.situation = "Σε παύση";
            }
            else if(element.situation === "W"){
              element.situation = "Κατ' οίκον";
            }
            else if(element.situation === "L"){
              element.situation = "Σε Άδεια";
            }
            else{
              element.situation = "Δια Ζώσης";
            }
          })
        }
        else{
          this.isEmployer = false;
          if(response.User.situation === "S"){
            response.User.situation = "Σε παύση";
          }
          else if(response.User.situation === "W"){
            response.User.situation = "Κατ' οίκον";
          }
          else if(response.User.situation === "L"){
            response.User.situation = "Σε Άδεια";
          }
          else{
            response.User.situation = "Δια Ζώσης";
          }
          this.employer = response.employer[0];
          console.log(this.employer);
        }
        this.userData = response.User;
        this.applied = this.userData.applied;
      }
      else {
        console.log('cant find user!');
        this.router.navigate(['login']);
      }
    });
  }

  suspend(user: User): void {
    var index = this.employeeArray.indexOf(user);
    this.employeeArray[index].showButtonL = false;
    this.employeeArray[index].showButtonW= false;
    if(this.employeeArray[index].showButtonS === false){
      this.employeeArray[index].showButtonS = true;
      this.showConfirmButton = true;
    }
    else{
      this.changesArray = this.changesArray.filter(element => element[0] != user._id);
      this.employeeArray[index].showButtonS = false;
    }
  }

  workFromHome(user: User):void {
    var index = this.employeeArray.indexOf(user);
    this.employeeArray[index].showButtonL = false;
    this.employeeArray[index].showButtonS = false;
    if(this.employeeArray[index].showButtonW === false){
      this.employeeArray[index].showButtonW = true;
      this.showConfirmButton = true;
    }
    else{
      this.changesArray = this.changesArray.filter(element => element[0] != user._id);
      this.employeeArray[index].showButtonW = false;
    }
  }

  leave(user: User):void {
    var index = this.employeeArray.indexOf(user);
    this.employeeArray[index].showButtonW = false;
    this.employeeArray[index].showButtonS = false;
    if(this.employeeArray[index].showButtonL === false){
      this.employeeArray[index].showButtonL = true;
      this.showConfirmButton = true;
    }
    else{
      this.changesArray = this.changesArray.filter(element => element[0] != user._id);
      this.employeeArray[index].showButtonL = false;
    }
  }

  returnToNormal(user: User):void {
    var index = this.employeeArray.indexOf(user);
    this.employeeArray[index].showButtonW = false;
    this.employeeArray[index].showButtonS = false;
    this.employeeArray[index].showButtonL = false;
    this.showConfirmButton = true;
    this.changesArray = this.changesArray.filter(element => element[0] != user._id);
    this.changesArray.push([user._id, null, "N"]);
  }

  changeDate(user: User): void {
    this.changesArray = this.changesArray.filter(element => element[0] != user._id);
    if(user.showButtonL === true){
      this.changesArray.push([user._id, user.situationDate, "L"]);
    }
    else if(user.showButtonS === true){
      this.changesArray.push([user._id, user.situationDate, "S"]);
    }
    else if(user.showButtonW === true){
      this.changesArray.push([user._id, user.situationDate, "W"]);
    }
    else{
      console.log("Something is wrong");
    }
  }

  confirm(): void{
    this.userService.changeSituation(this.changesArray).then(response => {
      if (response.done) {
        location.reload();
      }
      else
        console.log(response);
    })
  }

  cancel(): void{
    location.reload();
  }

  applyForLeave(): void{
    console.log(this.id);
    this.userService.apply(this.id).then(response => {
      if (response.done) {
        alert("Επιτυχία!");
        location.reload();
      }
      else
      alert("Αποτυχία!");
        console.log(response);
    })
  }
}
