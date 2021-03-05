import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiQueryContract } from './ngx-api-query';

export type ResourceId = string | number;

export interface CollectionResource<T = any> {
  data: T[];
  meta?: any;
  headers?: any;
}

export interface ResourceContract<T = any> {
  /**
   * Fetches the list of resources.
   */
  index(query?: ApiQueryContract): Observable<CollectionResource<T>>;

  /**
   * Creates new resources.
   */
  store(payload: any): Observable<T>;

  /**
   * Batch creates the list of resources.
   */
  batchStore(payload: any[]): Observable<HttpResponse<any>>;

  /**
   * Fetches a resource.
   */
  show(id: ResourceId, query?: ApiQueryContract): Observable<T>;

  /**
   * Updates a resource.
   */
  update(id: ResourceId, payload: any): Observable<T>;

  /**
   * Batch updates the list of resources.
   */
  batchUpdate(payload: any[], primaryKey?: string): Observable<HttpResponse<any>>;

  /**
   * Deletes a resource.
   */
  destroy(id: ResourceId): Observable<HttpResponse<any>>;
}
