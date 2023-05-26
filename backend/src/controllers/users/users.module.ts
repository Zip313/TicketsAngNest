import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from '../../services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/User';
import { PassportModule } from "@nestjs/passport";
import { AuthGuard } from "../../services/authentication/auth/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../../services/authentication/jwt-strategy/jwt-strategy";
import { jwtConfig } from "../../config/jwt.config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, Logger, JwtStrategy],
})
export class UsersModule {}
