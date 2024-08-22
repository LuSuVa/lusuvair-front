import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service';
import { ForumsService } from '../forums.service';

@Component({
  selector: 'app-home-forum',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './home-forum.component.html',
  styleUrl: './home-forum.component.css'
})
export class HomeForumComponent implements OnInit{
  isModalOpen : boolean = false
  isAdmin: boolean = false
  newSubjectDescription : string =''
  newSubjectTitle = '';
  isLoggedIn :boolean = false
  subjects :{title:string, description:string}[]=[]
  constructor(private forumService : ForumsService, private authService : AuthService, private router: Router){}

ngOnInit(){
  const token = this.authService.getAuthToken()
  if(token){
    this.isLoggedIn= !this.isLoggedIn
  }
}

  openModal(){
    this.isModalOpen= true
  }
  closeModal(){
    this.isModalOpen=false
  }
  createSubject() {
    const subjectBody = {
      title: this.newSubjectTitle|| '',
      description: this.newSubjectDescription|| '',
    }
    if (this.newSubjectTitle && this.newSubjectDescription) {
      this.forumService.sendNewSubject(subjectBody)
      this.newSubjectTitle = '';
      this.newSubjectDescription = '';
      this.closeModal();
    }
  }
}
