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
  DESC = 'desc'
}

export interface ApiQueryContract {
  with(...relation: string[]): ApiQueryContract;

  where(field: string, value: string): ApiQueryContract;

  whereIn(field: string, value: string[]): ApiQueryContract;

  paginate(pageNumber: number, pageSize: number): ApiQueryContract;

  orderBy(field: string, direction: Direction): ApiQueryContract;

  apply(): { [key: string]: any };

  clear(): ApiQueryContract;
}

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

  orderBy(field: string, direction: Direction): NgxApiQuery {
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
