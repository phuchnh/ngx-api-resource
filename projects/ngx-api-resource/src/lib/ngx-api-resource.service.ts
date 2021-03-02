import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxApiClient } from './ngx-api-client.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CollectionResource, ResourceContract, ResourceId } from './ngx-api-resource.contract';

@Injectable({
  providedIn: 'root',
  deps: [NgxApiClient]
})
export abstract class NgxApiResourceService<T = any> implements ResourceContract<T> {
  protected abstract model: string;

  protected constructor(@Inject(NgxApiClient) private ngxApiClient: NgxApiClient) {}

  protected resolveResource(resp: HttpResponse<any>): T {
    return resp.body.data;
  }

  protected resolveCollectionResource(resp: HttpResponse<any>): CollectionResource<T> {
    return resp.body;
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

  index(): Observable<CollectionResource<T>> {
    return this.ngxApiClient
      .get(this.resolveUrl())
      .pipe(map(resp => this.resolveCollectionResource(resp)));
  }

  store(body = {}): Observable<T> {
    return this.ngxApiClient
      .post(this.resolveUrl(), body)
      .pipe(map(resp => this.resolveResource(resp)));
  }

  show(id: ResourceId): Observable<T> {
    return this.ngxApiClient.get(this.resolveUrl(id)).pipe(map(resp => this.resolveResource(resp)));
  }

  update(id: ResourceId, body = {}): Observable<T> {
    return this.ngxApiClient
      .put(this.resolveUrl(id), body)
      .pipe(map(resp => this.resolveResource(resp)));
  }

  destroy(id: ResourceId): Observable<HttpResponse<any>> {
    return this.ngxApiClient.delete(this.resolveUrl(id));
  }
}
