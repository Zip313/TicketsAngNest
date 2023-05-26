import { Injectable } from '@nestjs/common';
import { IUser } from '../../models/IUser';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { User } from '../../schemas/User';
import { UserDto } from "../../dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { use } from "passport";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
              ) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async getUserById(id): Promise<IUser> {
    return this.userModel.findById(id);
  }

  async sendUser(data): Promise<IUser> {
    const userData = new this.userModel(data);
    return userData.save();
  }

  async updateUsers(id: string, body): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(id, body);
  }

  async deleteUsers(): Promise<IUser> {
    return this.userModel.findById('').exec(); //remove();
  }

  async deleteUserById(id: string): Promise<IUser> {
    return this.userModel.findByIdAndRemove(id);
  }

  async checkAuthUser(login: string, psw: string): Promise<IUser> {
    const user = await this.userModel.findOne({ login: login, psw: psw });
    return user ? user : null;
  }

  async checkRegUser(login: string): Promise<IUser[]> {
    return this.userModel.find({ login: login });
  }

  async login(user: UserDto) {
    const userFromDb = await this.userModel.findOne({login:user.login})
    const payload = {_id:userFromDb._id, login: user.login, psw: user.psw};
    return {
      id: userFromDb._id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
