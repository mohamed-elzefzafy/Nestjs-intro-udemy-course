import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionDto } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(private readonly metaOptionsService : MetaOptionsService) {}

    @Post()
    public creaeMetaOption(@Body() createPostMetaOptionDto : CreatePostMetaOptionDto) {
        return this.metaOptionsService.creaeMetaOption(createPostMetaOptionDto)

    }
}
