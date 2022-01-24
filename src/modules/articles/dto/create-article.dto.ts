import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  title: string;

  @ApiPropertyOptional({
    description: '文章封面图',
    example:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13e02cc7f656436bb9848b8b4ef63282~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?',
  })
  cover?: string;

  @ApiProperty({ description: '文章分类' })
  @IsNotEmpty({ message: '文章分类不能为空' })
  category: string;

  @ApiPropertyOptional({ description: '文章评论数量' })
  comm_count?: number;

  @ApiPropertyOptional({ description: '文章浏览数量' })
  browse_count?: number;

  @ApiPropertyOptional({ description: '文章是否置顶(默认0为不置顶,1为置顶)' })
  is_top?: number;

  @ApiPropertyOptional({ description: '文章喜欢数量' })
  like_count?: number;

  @ApiProperty({ description: '所属的频道ID' })
  @IsNotEmpty({ message: '文章所属频道ID不能为空' })
  channelID: string;

  @ApiProperty({ description: '文章作者ID' })
  @IsNotEmpty({ message: '文章作者ID不能为空' })
  userID: string;
}
