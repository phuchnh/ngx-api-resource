import { Injectable } from '@angular/core';

function serialize(obj: any, prefix?: string): any {
  const params = {};
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p;
      const v = obj[p];
      Object.assign(params, v !== null && typeof v === 'object' ? serialize(v, k) : { [k]: v });
    }
  }
  return params;
}


export enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

// @ts-ignore
export interface ApiQueryContract {
  with(relation: string): ApiQueryContract;

  where(field: string, value: string): ApiQueryContract;

  whereIn(field: string, value: string[]): ApiQueryContract;

  paginate(pageNumber: number, pageSize: number): ApiQueryContract;

  orderBy(field: string, direction: Direction): ApiQueryContract;

  apply(): { [key: string]: any };

  clear(): ApiQueryContract;
}

@Injectable()
export class NgxApiQuery implements ApiQueryContract {
  protected filters: any = {};
  protected paging: any = {};
  protected sorts: any = {};
  protected includes = new Set<string>();

  with(...relations: string[]): NgxApiQuery {
    relations.forEach(val => this.includes.add(val));
    return this;
  }

  where(field: string, value: string, operator = '='): NgxApiQuery {
    this.filters[field] = value.trim();
    return this;
  }

  whereIn(field: string, value: string[]): NgxApiQuery {
    this.filters[field] = value.join(',').trim();
    return this;
  }

  orderBy(field: string, direction: Direction): NgxApiQuery {
    this.sorts[field] = direction;
    return this;
  }

  paginate(pageNumber: number, pageSize = 10): NgxApiQuery {
    this.paging['page'] = pageNumber;
    this.paging['size'] = pageSize;
    return this;
  }

  apply(): { [key: string]: any; } {
    const params: any = {};
    params.filter = {};
    params.sort = {};
    params.page = {};
    params.include = [...this.includes].join(',');

    for (const property in this.filters) {
      if (this.filters.hasOwnProperty(property)) {
        params.filter[property] = this.filters[property];
      }
    }
    for (const property in this.paging) {
      if (this.paging.hasOwnProperty(property)) {
        params.page[property] = this.paging[property];
      }
    }
    for (const property in this.sorts) {
      if (this.sorts.hasOwnProperty(property)) {
        params.sort[property] = this.sorts[property];
      }
    }

    return serialize(params);
  }

  clear(): ApiQueryContract {
    this.filters = {};
    this.paging = {};
    this.sorts = {};
    this.includes.clear();
    return this;
  }

}
