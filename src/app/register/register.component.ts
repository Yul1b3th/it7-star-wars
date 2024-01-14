// register.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '@app/_components/alert';
import { FakeBackendService } from '@app/_helpers/fake-backend.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export default class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private fakeBackendService: FakeBackendService
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.getUsers();
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private getUsers() {
    this.fakeBackendService.getUsers().subscribe(
      (users) => {
        console.log('Usuarios desde el backend falso:', users);
      },
      (error) => {
        console.error('Error al obtener usuarios desde el backend falso:', error);
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alert on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
