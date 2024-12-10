import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/provider/tags.service';
import { PatchPostDto } from '../dtos/patchPostDto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post) private postRepositry: Repository<Post>,
    @InjectRepository(MetaOption)
    private metaOptionRepositry: Repository<MetaOption>,
    private readonly paginationProvider: PaginationProvider,
    private readonly createPostProvider : CreatePostProvider,
  ) {}

  public async createPost(createPostDto: CreatePostDto , user : ActiveUserData) {
    // const auther = await this.usersService.findOneById(createPostDto.autherId);
    // const tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    // const post = this.postRepositry.create({ ...createPostDto, auther, tags });
    // return await this.postRepositry.save(post);
    return await this.createPostProvider.createPost(createPostDto , user)
  }

  public async findAll(postQuery: GetPostsDto, userId: number) : Promise<Paginated<Post>> {
    const posts = await this.paginationProvider.paginatedQuery(
      { limit: postQuery.limit, page: postQuery.page },
      this.postRepositry,
    );
    return posts;
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;

    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process your request at moment please try again',
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException('please check your tags ids');
    }

    try {
      post = await this.postRepositry.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process your request at moment please try again',
      );
    }

    if (!post) {
      throw new BadRequestException('No post was found');
    }

    let postExists = undefined;

    try {
      postExists = await this.postRepositry.findOneBy({
        slug: patchPostDto.slug,
      });
    } catch (error) {}

    if (postExists) {
      throw new BadRequestException('the post already exists');
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;

    post.tags = [...post.tags, ...tags];

    try {
      await this.postRepositry.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process your request at moment please try again 44',
      );
    }

    return post;
  }

  public async deletePost(id: number) {
    await this.postRepositry.delete(id);

    return { deleted: true, id };
  }
}
