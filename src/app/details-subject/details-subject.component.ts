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

@Component({
  selector: 'app-details-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './details-subject.component.html',
  styleUrl: './details-subject.component.css',
})
export class DetailsSubjectComponent{
  messageForm: FormGroup;
  thumbsUp: boolean = false;
  datas: { content: string, firstName:string, lastName:string, title:string }[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private forumService: ForumsService
  ) {
    this.messageForm = this.formBuilder.group({
      message: '',
    });
  }

  ngOnInit() {
    const subjectId=1
    this.getMessage(subjectId);
  }

  onClickLike(id: number) {
    this.messageService.like(id).subscribe((response) => {
      this.thumbsUp = !this.thumbsUp;
    });
  }

  getMessage(id: number) {
    this.forumService.getMessagesById(id).subscribe((value: any) => {
      // Si 'value.messages' contient les messages et que 'value' contient les informations utilisateur
      this.datas = value.messages.map((message: any) => ({
        title: value.title,
        content: message.content,
        firstName: message.user.firstName,
        lastName: message.user.lastName
      }));
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
          console.log('Message envoyé avec succès', response);
          this.messageForm.reset();
          this.datas.push({
            title:response.title,
            content: response.content,
            firstName: response.user.firstName,
            lastName: response.user.lastName})
        },
        (error) => {
          console.error("Erreur lors de l'envoi du message", error);
        }
      );
    }
  }
}
