import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PhoneRegisterDto } from './dto/phone-register.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(dto) {
    return await this.prisma.userAccount.findUnique({
      where: {
        phone: dto.phone,
      },
      select: {
        phone: true,
        userInfo: true,
      },
    });
  }

  public async verifyCodeRegister(phoneCreateDto: PhoneRegisterDto) {
    const account = await this.findOne(phoneCreateDto);

    if (account === null) {
      const hs = crypto.pseudoRandomBytes(10).toString('hex');

      const createAccount = await this.prisma.userAccount.create({
        data: {
          phone: phoneCreateDto.phone,
          userInfo: {
            create: {
              name: `用户_${hs}`,
              photo:
                'https://senhe-mobile.oss-cn-guangzhou.aliyuncs.com/images/IMG_default_34u9ajfjalu39874.jpg',
            },
          },
        },
      });

      return await this.findOne(createAccount);
    }

    return account;
  }

  public async getChannels(id: string) {
    return await this.prisma.userChannel.findMany({
      where: { userID: id },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
