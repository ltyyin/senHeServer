import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { findAllParamsDto } from './dto/findAll-params.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}
  private timestamp: number = null;
  private skip: number = 0;

  public async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        cover: createArticleDto.cover,
        category: createArticleDto.category,
        comm_count: createArticleDto.comm_count,
        browse_count: createArticleDto.browse_count,
        is_top: createArticleDto.is_top,
        like_count: createArticleDto.like_count,
        channelID: createArticleDto.channelID,
        userID: createArticleDto.userID,
      },
    });
  }

  public async findAll(params: findAllParamsDto) {
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

    const promises = articles.map(async (article: any) => {
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
      // 如果座位不存在，抛出异常
      if (!user) {
        throw new Error(`ID为：${article.userID}的用户不存在`);
      }
      /* 文章的查询结果中加入author */
      article.author = user.userInfo.name;
      return article;
    });

    articles = await Promise.allSettled(promises)
      .then((articles) => {
        return articles
          .filter((article) => {
            return article.status === 'fulfilled';
          })
          .map((article: any) => {
            return article.value;
          });
      })
      .catch((err) => {
        return [];
      });

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
