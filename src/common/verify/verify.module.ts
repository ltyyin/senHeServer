import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
        };
      },
    }),
  ],
  providers: [
    /* 这里使用了 local本地验证密码 和 jwt验证 的策略,记得注入一下*/
    /* jwt的模块在 prisma全局模块中引用了，并且进行了导出 */
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [JwtModule],
})
export class VerifyModule {}
