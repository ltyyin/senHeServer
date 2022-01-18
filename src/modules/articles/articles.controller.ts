import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { channel } from 'diagnostics_channel';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { findAllParamsDto } from './dto/findAll-params.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
@ApiTags('文章模块')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所用文章' })
  findAll(@Query() params: findAllParamsDto) {
    return this.articlesService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取对应的channel文章' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
