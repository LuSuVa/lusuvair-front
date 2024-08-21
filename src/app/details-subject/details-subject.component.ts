import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-details-subject',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details-subject.component.html',
  styleUrl: './details-subject.component.css'
})
export class DetailsSubjectComponent {
  messageForm: FormGroup;
  thumbsUp: boolean = false;

  constructor(private formBuilder: FormBuilder, private forumService: ForumService) {
    this.messageForm = this.formBuilder.group({
      message: '' // Le champ de message
    });
  }

  onClickLike(id: number) {
    this.forumService.like(id).subscribe(response => {
      this.thumbsUp = !this.thumbsUp; // Toggle the like state
    });
  }

  submitMessage() {
    const messageContent = this.messageForm.get('message')?.value;

    if (messageContent) {
      const messageData = {
        id: 1, // Remplacez par l'ID du sujet ou autre identifiant pertinent
        message: messageContent
      };

      this.forumService.sendMessage(messageData).subscribe(response => {
        console.log('Message envoyé avec succès', response);
        this.messageForm.reset(); // Réinitialise le formulaire après envoi
      }, error => {
        console.error('Erreur lors de l\'envoi du message', error);
      });
    }
  }
}
