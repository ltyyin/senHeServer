import { Injectable, Logger } from '@nestjs/common';
import { IResponse } from 'src/interface/response.interface';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

const logger = new Logger('auth.service');

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  private res: IResponse;

  /* 注册服务 */
  public async register(registerDto: RegisterDto) {
    const userPhoen = await this.prisma.userAccount.findUnique({
      where: {
        phone: registerDto.phone,
      },
      select: {
        phone: true,
      },
    });

    if (userPhoen) {
      this.res = {
        code: 400,
        msg: '该用户以注册',
      };

      return this.res;
    }

    try {
      await this.prisma.userAccount.create({
        data: {
          phone: registerDto.phone,
          userPassword: {
            create: {
              salt: registerDto.salt,
              password: registerDto.password,
            },
          },
        },
      });

      this.res = {
        code: 200,
        msg: '用户注册成功',
      };
    } catch (err) {
      logger.log(`用户注册失败:${err}`);
      this.res = {
        code: 400,
        msg: `用户注册失败`,
      };
    }

    return this.res;
  }
}
