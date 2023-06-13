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
  //paginatedResualt: PaginatedResult<Member[]>= new PaginatedResult<Member[]>;



  constructor(private http: HttpClient) {}

  //getMembers(page?:number, itemsPerPage?: number) {
  getMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
   // params = params.append('orderBy', userParams.orderBy);


    // return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
    //return this.http.get<Member[]>(this.baseUrl + 'users');
   // if (this.members.length > 0) return of(this.members);

   return this.getPaginatedresult<Member[]>(this.baseUrl+ 'users', params);

  }

  private getPaginatedresult<T>(url: string, params: HttpParams) {
    const paginatedResualt: PaginatedResult<T> = new PaginatedResult<T>
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResualt.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
         paginatedResualt.pagination = JSON.parse(pagination);
        }
        return paginatedResualt;
      })

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

  private getPaginationHeaders(pageNumber : number, pageSize : number) {
    let params = new HttpParams();
    //if (page && itemsPerPage) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    //}
    return params;
  }
}
