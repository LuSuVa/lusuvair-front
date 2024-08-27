import { Component, Input } from '@angular/core';
import { Message } from '../user.model';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.css',
})
export class UserMessageComponent extends SubscribeManagementComponent {
  @Input() message?: Message;

  thumbsUp: boolean = false;
  thumbsDown: boolean = false;
  userId: number = -1;

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.userId = parseInt(this.authService.getAuthId(), 10);
    this.thumbsDown =
      this.message?.dislikeUserIds.includes(this.userId) || false;
    this.thumbsUp = this.message?.likeUserIds.includes(this.userId) || false;
  }

  isUserAdmin() {
    return this.authService.getAuthRole().includes('ROLE_ADMIN');
  }

  onClickLike() {
    if (this.message) {
      const sub = this.messageService
        .like(this.message.id)
        .subscribe((response) => {
          this.thumbsUp = response.isLiked;
          this.thumbsDown = response.isDisliked;
        });

      this.addSubscription(sub);
    }
  }

  onClickDislike() {
    if (this.message) {
      const sub = this.messageService
        .dislike(this.message.id)
        .subscribe((response) => {
          this.thumbsUp = response.isLiked;
          this.thumbsDown = response.isDisliked;
        });

      this.addSubscription(sub);
    }
  }
}
