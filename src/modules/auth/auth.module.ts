import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { HashPasswordMiddleware } from 'src/middlewares/hash-password.middleware';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule],
  /* 这里使用了 local本地验证密码 和 jwt验证 的策略,记得注入一下*/
  /* jwt的模块在 prisma全局模块中引用了，并且进行了导出 */
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  /**
   * 使用中间件
   * 接收一个参数，来实现中间件的。
   */
  configure(consumer: MiddlewareConsumer) {
    /* 使用EncryptMiddleware这个中间件，并表明在哪个constructor中使用(控制器中的参数路由) */
    consumer.apply(HashPasswordMiddleware).forRoutes('auth/register');
  }
}
