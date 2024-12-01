import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
constructor(@InjectRepository(Tag) private readonly tagsRepositry : Repository<Tag>){}
    public async createTag (createTagDto : CreateTagDto) {
   const tag = this.tagsRepositry.create(createTagDto);
   return await this.tagsRepositry.save(tag);
    }

    public async findMultipleTags (tags : number[]) {
  let result = await this.tagsRepositry.find({
    where : {
         id : In(tags) 
        }
  })
  return result;
    }


    public async deleteTag(id : number) {
     await this.tagsRepositry.delete(id);
      return {deleted : true , id}
    }

    public async softDelete(id : number) {
      await this.tagsRepositry.softDelete(id);
       return {deleted : true , id}
     }

}
