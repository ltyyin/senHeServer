import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class findAllParamsDto {
  @ApiProperty({ example: '2', description: '频道ID' })
  channel_id: string;
  @ApiPropertyOptional({ description: '分页查询' })
  skip: number;
  @ApiProperty({ description: '控制是否返回新数据' })
  timestamp: string;
  @ApiProperty({ example: 'asc', description: '文章排序' })
  orderBy: 'asc' | 'desc';
}
