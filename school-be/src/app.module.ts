import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { AuthModule } from './auth/auth.module';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ ormConfig ],
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd
    }),
    UserModule,
    AuthModule,
    ClassroomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
