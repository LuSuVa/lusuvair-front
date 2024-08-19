import { Component } from '@angular/core';
import {
  Validators,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: NonNullableFormBuilder, private authService: AuthService) {}

  submit() {
    console.log('Je me suis connecté... ou pas');
    const loginBody = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    }
    this.authService.login(loginBody);
  }
}
