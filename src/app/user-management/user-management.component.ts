import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSuspendComponent } from '../user-suspend/user-suspend.component';
import { User } from '../user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, UserSuspendComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  isModalOpen: boolean = false;
  suspensionDays: number = 0;
  constructor(private userManagementService: UserManagementService) {}

  ngOnInit() {
    this.loadUsers();
  }

  isOpen() {
    this.isModalOpen = !this.isModalOpen;
  }

  loadUsers() {
    this.userManagementService.getUser().subscribe(
      (value: any[]) => {
        this.users = value;
        console.log(value);
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );
  }

  suspendUser({ id, days }: { id: number; days: number }) {
    // Vérifiez que this.suspensionDays est bien défini
    if (this.suspensionDays === undefined || this.suspensionDays === null) {
      console.error("Le nombre de jours de suspension n'est pas défini");
      return;
    }

    this.userManagementService
      .suspendUser(id, days)
      .subscribe(
        (value: any) => {
          console.log('Utilisateur suspendu', value);
        },
        (error: any) => {
          console.error("Erreur lors de la suspension de l'utilisateur", error);
        }
      );

    // Fermez le modal
    this.isOpen();
  }
}
