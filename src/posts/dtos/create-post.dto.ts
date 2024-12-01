import { IsArray, IsDate, IsEnum, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { PostStatus } from "../enums/postStatus.enum";
import { PostType } from "../enums/postType.enum";
import { CreatePostMetaOptionDto } from "../../meta-options/dtos/create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example : "this is a title" , description : "the title of the post creation"})
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(512)
    title: string;

    @ApiProperty({enum : PostType, description : "available post types are (post| page | story | series)"})
    @IsEnum(PostType)
    @IsNotEmpty()
    postType : PostType;

    @ApiProperty({
        description : "for example  'my-url' ",
        example : "my-blog-post"
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ ,
    {message : 'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"'})
    slug : string;

    @ApiProperty({enum : PostStatus, description : "available post status are (draft| scheduled | review | published)"})
    @IsEnum(PostStatus)
    @IsNotEmpty()
    status : PostStatus;

    @ApiPropertyOptional({
        description: 'This is the content of the post',
        example: 'The post content',
      })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description:
          'Serialize your JSON object else a validation error will be thrown',
        example:
          '{\r\n "@context": "https://schema.org",\r\n "@type": "Person"\r\n }',
      })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'Featured image for your blog post',
        example: 'http://localhost.com/images/image1.jpg',
      })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: 'The date on which the blog post is published',
        example: '2024-03-16T07:46:32+0000',
      })
    @IsISO8601()
    @IsOptional()
    publishedOn ?: Date;

    @ApiPropertyOptional({
        description: 'Array of ids of tags',
        example: [1, 2],
      })
    @IsOptional()
    @IsArray()
    @IsInt({each : true})
    // @MinLength(3 ,{each : true})
    tags? : number[];

    @ApiPropertyOptional({
        type: 'object',
        required: false,
        items: {
          type: 'object',
          properties: {
            metavalue: {
              type: 'json',
              description: 'The metaValue is a JSON string',
              example: '{"sidebarEnabled": true}',
            },
          },
        },
      })
    @IsOptional()
    @ValidateNested({each : true})
    @Type(() => CreatePostMetaOptionDto)
    metaOPtions?: CreatePostMetaOptionDto | null;

    @ApiProperty({
      type : "integer",
      required :true,
      example : 1,
    })
    @IsNotEmpty()
    @IsInt()
    autherId : number;
}