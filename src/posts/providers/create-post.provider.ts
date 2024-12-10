import { BadRequestException, ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/provider/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreatePostProvider {
    constructor(
        private readonly usersService: UsersService,
        private readonly tagsService: TagsService,
       @InjectRepository(Post) private readonly postRepositry: Repository<Post>
    ){}
    public async createPost(createPostDto: CreatePostDto , user : ActiveUserData) {
        let auther = undefined;
         let tags = undefined;
        try {
             auther = await this.usersService.findOneById(user.sub);
             tags = await this.tagsService.findMultipleTags(createPostDto.tags);
        } catch (error) {
            throw new ConflictException(error);
        }

        if (createPostDto.tags.length !== tags.length) {
            throw new BadRequestException("pleasr check your tags ids");
        }
      
        const post = this.postRepositry.create({ ...createPostDto, auther, tags });
       

        try {
            return await this.postRepositry.save(post);
        } catch (error) {
            throw new ConflictException(error, {description : "ensure tag must be unique and not duplicate"});
        }
    }
}
