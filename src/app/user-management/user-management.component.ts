import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users:any[]=[]
  isModalOpen:boolean = false
  suspensionDays : number=0
  constructor(private userManagementService : UserManagementService){}

  ngOnInit(){
    this.loadUsers()
  }

  isOpen(){
    this.isModalOpen = !this.isModalOpen
  }

  loadUsers(){
    this.userManagementService.getUser().subscribe(
      (value:any[])=> {
        this.users= value
        console.log(value);
      },
      error =>{
        console.error('Erreur lors du chargement des utilisateurs',error)
      }
    );
  }

  suspendUser(userId: number) {
    // Vérifiez que this.suspensionDays est bien défini
    if (this.suspensionDays === undefined || this.suspensionDays === null) {
      console.error('Le nombre de jours de suspension n\'est pas défini');
      return;
    }

    this.userManagementService.suspendUser(userId, this.suspensionDays).subscribe(
      (value: any) => {
        console.log('Utilisateur suspendu', value);
      },
      (error: any) => {
        console.error('Erreur lors de la suspension de l\'utilisateur', error);
      }
    );

    // Fermez le modal
    this.isOpen();
  }

}
