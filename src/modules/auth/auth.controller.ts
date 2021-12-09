import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './current-user.decorator';
import { Prisma, UserAccount } from '@prisma/client';

@Controller('auth')
@ApiTags('auth模块')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    /**
     * 注意：jwtService在auth模块中没有引用JwtModule的就能使用的原因是
     * 因为 在prismaModule中进行了引用和导出(prismaModule是全局模块无需另外导入)
     * local本地验证策略就没有它的Service
     */
    private readonly jwtService: JwtService,
  ) {}

  /* 用户注册路由 */
  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  public register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /* 用户登录路由 */
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local'))
  public login(@Body() loginDto: LoginDto, @Req() req) {
    return {
      msg: '登录成功',
      token: this.jwtService.sign(String(req.user.phone)),
    };
  }

  /* 获取用户信息路由 */
  @Get('user')
  @ApiOperation({ summary: '获取用户信息' })
  /* 如果想需要使用正确的token才能获取信息的话，要加上一个守卫 */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() // 表示这个接口可以传递token(在接口文档上面)
  /* 如果这个token对的话，在JwtStrategy文件下validate函数中处理 */
  /* 那个函数的处理就是根据解析出的token里面的phone找出该用户 */
  /* 如果找到的话，会赋值到req上面 */
  public async user(
    @CurrentUser()
    user: UserAccount & {
      userPassword: {
        password: string;
        salt: string;
      };
    },
  ) {
    return user;
  }
}
