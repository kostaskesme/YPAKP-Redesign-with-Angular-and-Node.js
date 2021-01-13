import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { CovidComponent } from './covid/covid.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path : 'profile/:id', component: ProfileComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'contact/appointment', component: AppointmentComponent
  },
  {
    path: 'covid', component: CovidComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
