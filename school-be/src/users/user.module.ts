import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { ProfileEntity } from '../profile/entity/profile.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, 
      ProfileEntity
    ])
  ],
  controllers: [ UserController ],
  providers: [ UserService ]
})
export class UserModule {}
