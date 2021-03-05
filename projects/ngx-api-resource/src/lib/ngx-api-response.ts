import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionResource, ApiResponseContract } from './ngx-api-resource.contract';

@Injectable()
export class NgxApiResponse<T = any> implements ApiResponseContract<T> {
  transform(resp: HttpResponse<any>): CollectionResource<T> | T {
    if (resp.body.data instanceof Array) {
      const headers = resp.headers.keys().reduce((acc, val) => {
        acc[val] = resp.headers.get(val);
        return acc;
      }, {});
      return {
        ...resp.body,
        headers
      } as CollectionResource<T>;
    }
    return resp.body.data as T;
  }
}
