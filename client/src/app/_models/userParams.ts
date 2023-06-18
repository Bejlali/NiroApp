import { User } from "./user";

export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize =10;
    status= 'Active';
    type= 'Employee'
    orderBy = 'lastActive';
    groups = 'Team';


    constructor(user: User) {
       this.gender = user.gender === 'female' ? 'male' : 'female'
    }

}
