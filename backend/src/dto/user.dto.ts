import { IUser } from '../models/IUser';

export class UserDto implements IUser {
  psw: string;
  cardNumber: string;
  login: string;
  email: string;
  id: string;
}
