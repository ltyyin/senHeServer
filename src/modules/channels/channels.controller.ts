import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChannelsService } from './channels.service';
import { AddChannelDto } from './dto/add-channel.dto';

@Controller('channels')
@ApiTags('频道模块')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  @ApiOperation({ summary: '新增一个用户频道频道' })
  public async add(@Body() addChannelDto: AddChannelDto) {
    return await this.channelsService.add(addChannelDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有频道' })
  public async findAll() {
    return await this.channelsService.findAll();
  }

  /* 获取用户频道 */
  @Get(':id')
  @ApiOperation({ summary: '获取用户频道' })
  public async findOne(@Param('id') id: string) {
    return await this.channelsService.findOne(id);
  }

  @Delete(':id')
  public async remove(@Body() deleteChannelDto: AddChannelDto) {
    return await this.channelsService.remove(deleteChannelDto);
  }
}
