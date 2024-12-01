import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { CreatePostMetaOptionDto } from '../dtos/create-post-meta-options.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
    constructor(@InjectRepository(MetaOption) private metaOptionsRepository: Repository<MetaOption>){}

     public async creaeMetaOption(createPostMetaOptionDto : CreatePostMetaOptionDto) {
     const metaOption = this.metaOptionsRepository.create(createPostMetaOptionDto);
     return await this.metaOptionsRepository.save(metaOption);;
    }
}
