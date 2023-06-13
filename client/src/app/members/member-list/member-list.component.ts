import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members$: Observable<Member[]> | undefined;
  members: Member[] = [] ;
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 5;
  //members: Member[]=[];

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {

    //this.loadMembers();
    //this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }
/*
  loadMembers(){
    this.memberService.getMembers().subscribe({
      next: members => this.members= members
      }
      )
    } */

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }

    }})
/*     if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      }) */
    }
    pageChanged(event: any) {
       //if (this.userParams && this.userParams?.pageNumber !== event.page) {
       if (this.pageNumber !== event.page) {
       this.pageNumber = event.page;
      //   this.memberService.setUserParams(this.userParams);
        this.loadMembers();
      }
    }
  }



