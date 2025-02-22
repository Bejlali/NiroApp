import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  export class AppComponent implements OnInit {
    title = 'Niro App';


    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
      this.setCurrentUser();
    }


    setCurrentUser(){
      //const user: User = JSON.parse(localStorage.getItem('user')!)  or
      const userString = localStorage.getItem('user');
      if (!userString) return
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    }
  }




