import { Body, Controller, Delete, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TagsService } from './provider/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService : TagsService){}

    @Post()
    public createTag (@Body() createTagDto : CreateTagDto) {
        return this.tagsService.createTag(createTagDto);
    }

    @Delete()
    public deleteTag (@Query("id" , ParseIntPipe) id : number) {
     return this.tagsService.deleteTag(id);
    }

    @Delete("soft-delete")
    public softDeleteTag (@Query("id" , ParseIntPipe) id : number) {
     return this.tagsService.softDelete(id);
    }
}
