import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResualt: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  memberCache = new Map();
  user: User | undefined;
  userParams: UserParams | undefined;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }
  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  //getMembers(page?:number, itemsPerPage?: number) {
  getMembers(userParams: UserParams) {
    // console.log(Object.values(userParams).join('-'));
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) return of(response);

    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('status', userParams.status);
    params = params.append('type', userParams.type);
    params = params.append('groups', userParams.groups);
    params = params.append('orderBy', userParams.orderBy);

    // return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
    //return this.http.get<Member[]>(this.baseUrl + 'users');
    // if (this.members.length > 0) return of(this.members);

    //return this.getPaginatedresult<Member[]>(this.baseUrl+ 'users', params);

    return getPaginatedResult<Member[]>(
      this.baseUrl + 'users',params, this.http).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }



  getMember(username: string) {
    //return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());
    //return this.http.get<Member>(this.baseUrl + 'users/' + username);

    /*     const member = this.members.find(x => x.userName === username);
    if (member) return of(member); */

    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

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
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    // return this.http.get<Member[]>(this.baseUrl + 'likes?predicate='+ predicate);
    return getPaginatedResult<Member[]>(this.baseUrl + 'likes', params, this.http);

    // return this.getPaginatedResult<Member[]>(this.baseUrl + 'likes', params);
  }
}
