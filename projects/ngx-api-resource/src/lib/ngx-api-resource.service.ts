import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxApiClient } from './ngx-api-client.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CollectionResource, ResourceContract, ResourceId } from './ngx-api-resource.contract';
import { ApiQueryContract } from './ngx-api-query';

@Injectable({
  providedIn: 'root',
  deps: [NgxApiClient]
})
export abstract class NgxApiResourceService<T = any> implements ResourceContract<T> {
  protected abstract model: string;

  protected resources = 'resources';

  protected constructor(@Inject(NgxApiClient) protected ngxApiClient: NgxApiClient) {}

  protected resolveResourceResponse(resp: HttpResponse<any>): T {
    return resp.body.data;
  }

  protected resolveCollectionResponse(resp: HttpResponse<any>): CollectionResource<T> {
    const headers = resp.headers.keys().reduce((acc, val) => {
      acc[val] = resp.headers.get(val);
      return acc;
    }, {});

    return {
      ...resp.body,
      headers
    };
  }

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
    return this.ngxApiClient
      .get(this.resolveUrl(), query.apply())
      .pipe(map(resp => this.resolveCollectionResponse(resp)));
  }

  store(payload = {}): Observable<T> {
    return this.ngxApiClient
      .post(this.resolveUrl(), payload)
      .pipe(map(resp => this.resolveResourceResponse(resp)));
  }

  batchStore(payload: any[]): Observable<HttpResponse<any>> {
    return this.ngxApiClient.put(this.resolveUrl(), {
      [this.resources]: payload
    });
  }

  show(id: ResourceId, query?: ApiQueryContract): Observable<T> {
    return this.ngxApiClient
      .get(this.resolveUrl(id), query.apply())
      .pipe(map(resp => this.resolveResourceResponse(resp)));
  }

  update(id: ResourceId, payload = {}): Observable<T> {
    return this.ngxApiClient
      .put(this.resolveUrl(id), payload)
      .pipe(map(resp => this.resolveResourceResponse(resp)));
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
