import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

// 默认Strategy名字是有什么策略决定的，passport-local，所以这个Strategy默认名就叫local
// 可以随便的改有意义的策略名
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      /* ExtractJwt 中有很多个方法，分别是从什么地方取出token */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  /**
   * 解除来的值就是之前this.jwtService.sign(String(req.user.phone))
   * 传进去的那个值
   */
  async validate(info) {
    return await this.prisma.userAccount.findUnique({
      where: {
        phone: info.phone,
      },
      select: {
        userInfo: {
          select: {
            name: true,
            photo: true,
            userID: true,
          },
        },
      },
    });
  }
}
