import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
      this.checkRole(); // Vous pouvez combiner les deux vérifications
    });
  }

  checkRole(){
    const role= this.authService.getAuthRole()
    if(role.includes('ROLE_ADMIN')){
      this.isAdmin = true
    } else{
      this.isAdmin = false
    }
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
  this.authService.setAuthToken('');
  this.authService.setAuthRole([]); // Réinitialiser les rôles à un tableau vide
  this.isLoggedIn = false;
  this.checkRole(); // Re-vérifier les rôles après déconnexion
  this.router.navigate(['/login']);
}
}
