import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service';
import { ForumsService } from '../forums.service';
import { Subject } from '../user.model';

@Component({
  selector: 'app-home-forum',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home-forum.component.html',
  styleUrl: './home-forum.component.css',
})
export class HomeForumComponent implements OnInit {
  isModalOpen: boolean = false;
  isAdmin: boolean = false;
  newSubjectDescription: string = '';
  newSubjectTitle = '';
  isLoggedIn: boolean = false;
  subjects: Subject[] = [];
  constructor(
    private forumService: ForumsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSubjects();
    const token = this.authService.getAuthToken();
    if (token) {
      this.isLoggedIn = !this.isLoggedIn;
    }
  }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  createSubject() {
    const subjectBody = {
      title: this.newSubjectTitle || '',
      content: this.newSubjectDescription || '',
    };
    if (this.newSubjectTitle && this.newSubjectDescription) {
      this.forumService
        .sendNewSubject(subjectBody)
        .subscribe((value: Subject) => {
          this.newSubjectTitle = '';
          this.newSubjectDescription = '';
          this.subjects.push(value);
          this.closeModal();
        });
    }
  }

  getSubjects() {
    this.forumService.getSubjects().subscribe((subjects: Subject[]) => {
      this.subjects = subjects;
    });
  }
}
