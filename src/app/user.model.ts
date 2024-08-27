export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  suspendedTill: Date;
  suspended: boolean;
}

export interface Message {
  id: number;
  content: string;
  date: string;
  like: number;
  likeUserIds: number[];
  dislike: number;
  dislikeUserIds: number[];
  parentMessageId: number;
  user: User;
}

export interface Subject {
  id: number;
  content: string;
  title: string;
  date: string;
  messages: Message[];
  user: User;
}

export interface LikedDisliked {
  isLiked: boolean;
  isDisliked: boolean;
}
