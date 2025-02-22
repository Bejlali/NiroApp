import { Photo } from "./photo";

export interface Member {
  id:           number;
  userName:     string;
  photoUrl:     string;
  age:          number;
  knownAs:      string;
  created:      Date;
  lastActive:   Date;
  gender:       string;
  introduction: string;
  lookingFor:   string;
  interests:    string;
  city:         string;
  country:      string;
  photos:       Photo[];
  fName:        string;
  lName:        string;
  email:        string;
  profile:      string;
  department:   string;
  phone:        string;
  extension:    string;
  address:      string;
}


