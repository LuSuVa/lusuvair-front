import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    const token = this.authService.getAuthToken();
    if (token !== null && token !== '') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    this.authService.setAuthToken('');  // Efface le jeton d'authentification
    this.isLoggedIn = false;
    this.router.navigate(['/']);  // Redirige vers la page d'accueil ou de login après déconnexion
  }
}
