import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-forum',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home-forum.component.html',
  styleUrl: './home-forum.component.css'
})
export class HomeForumComponent implements OnInit {

  isAdmin: boolean = false
  constructor(private authService : AuthService, private router: Router){}

  ngOnInit(){

  }
}
