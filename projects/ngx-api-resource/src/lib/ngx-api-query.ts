import { Injectable } from '@angular/core';
import { Directions } from './enums';
import { serialize } from './helpers';
import { ApiQueryContract } from './ngx-api-resource.contract';

@Injectable()
export class NgxApiQuery implements ApiQueryContract {
  protected filters = new Map();
  protected paging = new Map();
  protected sorts = new Map();
  protected includes = new Set<string>();

  with(...relations: string[]): NgxApiQuery {
    relations.forEach(val => this.includes.add(val));
    return this;
  }

  where(field: string, value: string, operator = '='): NgxApiQuery {
    this.filters.set(field, value);
    return this;
  }

  whereIn(field: string, value: string[]): NgxApiQuery {
    this.filters.set(field, value.join(',').trim());
    return this;
  }

  orderBy(field: string, direction: Directions): NgxApiQuery {
    this.sorts.set(field, direction);
    return this;
  }

  paginate(pageNumber: number, pageSize = 10): NgxApiQuery {
    this.paging.set('number', pageNumber);
    this.paging.set('size', pageSize);
    return this;
  }

  // @ts-ignore
  private mapToPlainObject(map: Map): any {
    return Array.from(map).reduce((obj, [key, value]) => {
      return Object.assign(obj, { [key]: value });
    }, {});
  }

  apply(): { [key: string]: any } {
    const params: any = {};
    params.filter = this.mapToPlainObject(this.filters);
    params.sort = this.mapToPlainObject(this.sorts);
    params.page = this.mapToPlainObject(this.paging);
    params.include = [...this.includes].join(',');

    return serialize(params);
  }

  clear(): ApiQueryContract {
    this.filters.clear();
    this.paging.clear();
    this.sorts.clear();
    this.includes.clear();
    return this;
  }
}
