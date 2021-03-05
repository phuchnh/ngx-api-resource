import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxApiClient } from './ngx-api-client.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CollectionResource, ResourceContract, ResourceId } from './ngx-api-resource.contract';
import { ApiQueryContract } from './ngx-api-query';
import { NgxApiResponse } from './ngx-api-response';

@Injectable()
export abstract class NgxApiResourceService<T = any> implements ResourceContract<T> {
  protected abstract model: string;

  protected resources = 'resources';

  protected constructor(
    protected ngxApiClient: NgxApiClient,
    protected ngxApiResponse: NgxApiResponse<T>
  ) {}

  protected resolveModel(): string {
    return this.model;
  }

  protected resolveUrl(id?: ResourceId): string {
    if (!id) {
      return `/${this.resolveModel()}`;
    }
    return `/${this.resolveModel()}/${id}`;
  }

  index(query?: ApiQueryContract): Observable<CollectionResource<T>> {
    return this.ngxApiClient.get(this.resolveUrl(), query.apply()).pipe(
      map(resp => {
        return this.ngxApiResponse.transform(resp) as CollectionResource<T>;
      })
    );
  }

  store(payload = {}): Observable<T> {
    return this.ngxApiClient.post(this.resolveUrl(), payload).pipe(
      map(resp => {
        return this.ngxApiResponse.transform(resp) as T;
      })
    );
  }

  batchStore(payload: any[]): Observable<HttpResponse<any>> {
    return this.ngxApiClient.put(this.resolveUrl(), {
      [this.resources]: payload
    });
  }

  show(id: ResourceId, query?: ApiQueryContract): Observable<T> {
    return this.ngxApiClient.get(this.resolveUrl(id), query?.apply()).pipe(
      map(resp => {
        return this.ngxApiResponse.transform(resp) as T;
      })
    );
  }

  update(id: ResourceId, payload = {}): Observable<T> {
    return this.ngxApiClient.put(this.resolveUrl(id), payload).pipe(
      map(resp => {
        return this.ngxApiResponse.transform(resp) as T;
      })
    );
  }

  batchUpdate(payload: any[], primaryKey = 'id'): Observable<HttpResponse<any>> {
    return this.ngxApiClient.put(this.resolveUrl(), {
      [this.resources]: payload.reduce((acc, val) => {
        const resourceId = val[primaryKey];
        delete val[primaryKey];
        acc[resourceId] = val;
        return acc;
      }, {})
    });
  }

  destroy(id: ResourceId): Observable<HttpResponse<any>> {
    return this.ngxApiClient.delete(this.resolveUrl(id));
  }
}
