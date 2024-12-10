import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PaginationProvider {
    constructor(@Inject(REQUEST) private readonly request : Request) {}
  public async paginatedQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) : Promise<Paginated<T>> {
    const results =await repository.find({
        skip : (paginationQuery.page - 1) * paginationQuery.limit ,
        take : paginationQuery.limit,
       });

const baseUrl = this.request.protocol + '://' + this.request.headers.host + "/";

const newUrl = new URL(this.request.url , baseUrl);
// console.log(newUrl);

const totalItems = await repository.count(); 
const totalPages = Math.ceil(totalItems / paginationQuery.limit);

const next = paginationQuery.page === totalPages ? paginationQuery.page : paginationQuery.page + 1;
const previous = paginationQuery.page === 1 ? paginationQuery.page : paginationQuery.page - 1;


       const finalResponse : Paginated<T> = {
data: results,
 meta : {
    currentPage : paginationQuery.page,
    itemsPerPage : paginationQuery.limit,
    totalItems,
    totalPages,
 },
 links : {
  current  :`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
  first :`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`, 
  last :`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalItems}`,  
  next :`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${next}`,  
  previous  :`${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previous}`,  
  }
 
       }

       return finalResponse;
  }
}
