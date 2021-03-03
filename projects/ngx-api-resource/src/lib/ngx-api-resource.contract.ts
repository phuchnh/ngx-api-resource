import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

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
  index(query: any): Observable<CollectionResource<T>>;

  /**
   * Creates new resources.
   */
  store(body): Observable<T>;

  /**
   * Fetches a resource.
   */
  show(id: ResourceId): Observable<T>;

  /**
   * Updates a resource.
   */
  update(id: ResourceId, body: any): Observable<T>;

  /**
   * Deletes a resource.
   */
  destroy(id: ResourceId): Observable<HttpResponse<any>>;
}
