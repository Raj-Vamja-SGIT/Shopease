import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.InitializeForm();
  }

  InitializeForm() {
    this.LoginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]],
      rememberMe: [false]
    })
  }

  get fc() {
    return this.LoginForm.controls;
  }
}
