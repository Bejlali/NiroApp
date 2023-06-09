import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input () usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {}
  //registerForm: FormGroup | undefined;
  registerForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),




    });
/*     this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    }); */
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }



  register() {
      console.log(this.registerForm?.value);

    // this.accountService.register(this.model).subscribe({
    //   next: () => {
    //     this.cancel();
    //   },
    //   // error: (error: any) => console.log(error),
    //   //error: error => this.toastr.error(error.error)

    //       error: error => {
    //         this.toastr.error(error.error);
    //         console.log(error);
    //       }
    //     })

      }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
