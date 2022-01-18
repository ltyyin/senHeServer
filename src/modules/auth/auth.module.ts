import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashPasswordMiddleware } from 'src/middlewares/hash-password.middleware';
import { VerifyModule } from 'src/common/verify/verify.module';

@Module({
  imports: [VerifyModule],
  providers: [AuthService],
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
