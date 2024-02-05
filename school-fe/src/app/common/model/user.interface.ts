import { ProfileInterface } from "../../model/profile.interface";

export interface UserInterface {
  username?: string;
  password?: string;
  retypedPassword?: string;
  role?: string;
  profile?: ProfileInterface;
}