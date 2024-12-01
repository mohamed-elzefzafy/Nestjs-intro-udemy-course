import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
  public async paginatedQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const results = repository.find({
        skip : (paginationQuery.page - 1) * paginationQuery.limit ,
        take : paginationQuery.limit,
       });

       return results;
  }
}
