import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AddChannelDto } from './dto/add-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  public async add(addChannelDto: AddChannelDto) {
    return await this.prisma.userChannel.create({
      data: addChannelDto,
    });
  }

  public async findAll() {
    return await this.prisma.allChannel.findMany();
  }

  public async findOne(id: string) {
    const [userChannel, allChannel] = await this.prisma.$transaction([
      this.prisma.userChannel.findMany({
        where: {
          userID: id,
        },
        select: {
          channelID: true,
        },
        orderBy: {
          pubdate: 'asc',
        },
      }),
      this.prisma.allChannel.findMany(),
    ]);

    const result = userChannel.map((userChannel) => {
      return allChannel.find((channel) => {
        return channel.id === userChannel.channelID;
      });
    });

    return result;
  }

  public async remove(deleteChannelDto: AddChannelDto) {
    return await this.prisma.userChannel.delete({
      where: {
        channelID_userID: deleteChannelDto,
      },
    });
  }
}
