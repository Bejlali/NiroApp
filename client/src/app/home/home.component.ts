import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  model: any = {};


  //constructor(private http: HttpClient) { }
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

/*   getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  } */

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
  login(){
    //console.log(this.model);
    this.accountService.login(this.model).subscribe({
      // next: response =>this.router.navigateByUrl('/members'),
      next: _ =>this.router.navigateByUrl('/members'),
      // error: error => console.log(error)
     // error: error => this.toastr.error(error.error)
    })
  }

}
