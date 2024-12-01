import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags , PartialType} from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patchPostDto';
import { GetPostsDto } from './dtos/get-posts.dto';



@Controller('posts')
@ApiTags("Posts")
export class PostsController {
    constructor (private readonly postsService : PostsService){}

    @Get(":userId?")
    public getPosts (@Param("userId") userId : number , @Query() postsQuery : GetPostsDto){
        console.log(postsQuery);
        
     return this.postsService.findAll( postsQuery, userId);
    }

    @ApiOperation({
        summary: 'create a new post',
    })
    @ApiResponse({
        status: 201,
        description: 'you get 201 statue response if the Post created successfully',
        type: CreatePostDto,
 
    })
    @Post()
    public createPost (@Body() createPostDto : CreatePostDto) {
        return this.postsService.createPost(createPostDto)
    }

    @ApiOperation({
        summary: 'pdate anexisting blog post',
    })
    @ApiResponse({
        status: 200,
        description: 'you get 200 statue response if the Post updated successfully',
        type: CreatePostDto,
 
    })
    @Patch()
    public updatePost(@Body() patchPostDto : PatchPostDto) {
return this.postsService.updatePost(patchPostDto);

    }

    @Delete()
    public deletePost (@Query("id" , ParseIntPipe) id : number) {
        return this.postsService.deletePost(id);
    }
}
