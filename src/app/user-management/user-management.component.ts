import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSuspendComponent } from '../user-suspend/user-suspend.component';
import { User } from '../user.model';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, UserSuspendComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent
  extends SubscribeManagementComponent
  implements OnInit
{
  users: User[] = [];

  constructor(private userManagementService: UserManagementService) {
    super();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const sub = this.userManagementService.getUser().subscribe(
      (value: any[]) => {
        this.users = value;
        console.log(value);
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    );

    this.addSubscription(sub);
  }

  suspendUser({ id, days }: { id: number; days: number }) {
    if (days === undefined || days === null) {
      console.error("Le nombre de jours de suspension n'est pas défini");
      return;
    }

    const sub = this.userManagementService.suspendUser(id, days).subscribe(
      (value: any) => {
        console.log('Utilisateur suspendu', value);
        this.loadUsers();
      },
      (error: any) => {
        console.error("Erreur lors de la suspension de l'utilisateur", error);
      }
    );

    this.addSubscription(sub);
  }

  reintegrateUser(id: number) {
    console.log(id);

    const sub = this.userManagementService.reintegrateUser(id).subscribe(
      (value: any) => {
        console.log('Utilisateur plus suspendu', value);
        this.loadUsers();
      },
      (error: any) => {
        console.error("Erreur lors de la suspension de l'utilisateur", error);
      }
    );

    this.addSubscription(sub);
  }
}
