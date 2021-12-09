import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { encript } from 'src/utils/Encryption';
import { PrismaService } from '../prisma/prisma.service';

// 默认Strategy名字是有什么策略决定的，passport-local，所以这个Strategy默认名就叫local
// 可以随便的改有意义的策略名
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly prisma: PrismaService) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(phone: string, password: string) {
    const userDb = await this.prisma.userAccount.findUnique({
      where: {
        phone: phone,
      },
      include: {
        userPassword: {
          select: {
            password: true,
            salt: true,
          },
        },
      },
    });

    if (!userDb) {
      throw new BadRequestException('账号不正确');
    }

    const pass = encript(password, userDb.userPassword.salt);
    if (pass !== userDb.userPassword.password) {
      throw new BadRequestException('密码不正确');
    }

    return userDb;
  }
}
