import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from '../message.service';
import { CommonModule } from '@angular/common';
import { ForumsService } from '../forums.service';
import { AuthService } from '../auth.service';
import { UserMessageComponent } from "../user-message/user-message.component";
import { Subject } from '../user.model';

@Component({
  selector: 'app-details-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, UserMessageComponent],
  templateUrl: './details-subject.component.html',
  styleUrl: './details-subject.component.css',
})
export class DetailsSubjectComponent {
  messageForm: FormGroup;
  subject ?: Subject

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private forumService: ForumsService,
    private authService: AuthService
  ) {
    this.messageForm = this.formBuilder.group({
      message: '',
    });
  }

  ngOnInit() {
    const subjectId = 1;
    this.getSubject(subjectId);
  }

  getSubject(id: number) {
    this.forumService.getSubjectById(id).subscribe((value: Subject) => {
      this.subject= value
    });
  }

  submitMessage() {
    const messageContent = this.messageForm.get('message')?.value;

    if (messageContent) {
      const messageData = {
        sectionId: 1, // Remplacez par l'ID du sujet ou autre identifiant pertinent
        content: messageContent,
      };

      this.messageService.sendMessage(messageData).subscribe(
        (response) => {
          this.subject?.messages.push(response)
          this.messageForm.reset();
        },
        (error) => {
          console.error("Erreur lors de l'envoi du message", error);
        }
      );
    }
  }
}
