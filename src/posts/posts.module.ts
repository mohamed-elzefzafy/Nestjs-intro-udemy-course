import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersService } from 'src/users/providers/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostProvider],
  imports : [UsersModule ,  PaginationModule , TagsModule , TypeOrmModule.forFeature([Post , MetaOption])]
})
export class PostsModule {}
