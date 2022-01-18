import { Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { findAllParamsDto } from './dto/findAll-params.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}
  private timestamp: number = null;
  private skip: number = 0;
  private channelID: string = null;

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  public async findAll(params: findAllParamsDto) {
    // if (params.channel_id !== this.channelID) {
    //   this.channelID = params.channel_id;
    //   this.skip = 0;
    // }

    this.skip = +params.skip;

    let articles = await this.prisma.article.findMany({
      where: {
        channelID: params.channel_id,
      },
      skip: this.skip,
      take: 15,
      orderBy: {
        pubdate: params.orderBy,
      },
    });

    if (+params.timestamp !== this.timestamp) {
      this.skip += 15;
    }

    if (+params.timestamp !== this.timestamp && articles.length < 15) {
      this.skip += articles.length - 15;
    }

    this.timestamp = Date.now();

    /* 文章的查询结果中加入author */
    articles = await Promise.all(
      articles.map(async (article: any) => {
        const user = await this.prisma.userAccount.findUnique({
          where: {
            id: article.userID,
          },
          select: {
            userInfo: {
              select: {
                name: true,
              },
            },
          },
        });

        article.author = user.userInfo.name;

        return article;
      }),
    );

    return {
      message: 'ok',
      pre_timestamp: this.timestamp,
      skip: this.skip,
      results: articles,
    };
  }

  public async findOne(id: number) {
    let articles: any = await this.prisma.article.findMany({
      where: {
        channelID: '1',
      },
    });

    articles = await Promise.all(
      articles.map(async (article: any) => {
        const user = await this.prisma.userAccount.findUnique({
          where: {
            id: article.userID,
          },
          select: {
            userInfo: {
              select: {
                name: true,
              },
            },
          },
        });

        article.userName = user.userInfo.name;

        return article;
      }),
    );

    return articles;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
