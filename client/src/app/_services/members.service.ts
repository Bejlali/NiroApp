import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResualt: PaginatedResult<Member[]>= new PaginatedResult<Member[]>;



  constructor(private http: HttpClient) {}

  getMembers(page?:number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page && itemsPerPage){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage)


    }


    // return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
    //return this.http.get<Member[]>(this.baseUrl + 'users');
   // if (this.members.length > 0) return of(this.members);

   return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
    map(response =>{
      if (response.body){
      this.paginatedResualt.result = response.body;
    }
    const pagination = response.headers.get('Pagination');
    if (pagination){
      this.paginatedResualt.pagination = JSON.parse(pagination);
    }
    return this.paginatedResualt;
  })

/*       map((members) => {
        this.members = members;
        return members;
      }) */
    );
  }

  getMember(username: string) {
    //return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());
    //return this.http.get<Member>(this.baseUrl + 'users/' + username);

    const member = this.members.find(x => x.userName === username);
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);

  }

  /*   getHttpOptions(){
     const userString = localStorage.getItem('user');
     if (!userString) return;
     const user = JSON.parse(userString);
     return{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
     }
  } */

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      })
    )
  }
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
