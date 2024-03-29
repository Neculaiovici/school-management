import { ClassSerializerInterceptor, Controller, Get, Logger, Post, Res, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { Response } from 'express';
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorator/current-user.decorators";
import { UserEntity } from "src/users/entity/user.entity";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import JwtAuthGuard  from "./guard/jwt-auth.guard";

@Controller('auth')
@SerializeOptions({strategy: 'excludeAll'})
export class AuthController {

  constructor(
      private readonly authService: AuthService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  public async login(@CurrentUser() user: UserEntity, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(user, response);
    response.send(user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  public isAutheticated() {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public async logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    response.json({message: 'Logout successful!'});
  }
}