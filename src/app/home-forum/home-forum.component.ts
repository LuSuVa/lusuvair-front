import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-forum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-forum.component.html',
  styleUrl: './home-forum.component.css'
})
export class HomeForumComponent implements OnInit {

  isAdmin: boolean = false
  constructor(private authService : AuthService){}

  ngOnInit(){

  }
}
