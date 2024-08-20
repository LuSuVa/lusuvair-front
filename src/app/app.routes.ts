import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeForumComponent } from './home-forum/home-forum.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forum', component: HomeForumComponent },
  { path: 'weather', component: WeatherComponent },
];
