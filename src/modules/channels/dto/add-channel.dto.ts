import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddChannelDto {
  @ApiProperty({ description: '频道ID' })
  @IsNotEmpty()
  channelID: string;

  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty()
  userID: string;
}
