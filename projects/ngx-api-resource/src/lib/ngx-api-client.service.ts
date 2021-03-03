import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NGX_API_RESOURCE, NgxApiResourceConfig } from './ngx-api-resource.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})
export class NgxApiClient {
  private readonly baseUrl!: string;

  private readonly prefix!: string;

  constructor(@Inject(NGX_API_RESOURCE) config: NgxApiResourceConfig, private client: HttpClient) {
    this.baseUrl = config.baseUrl;
    this.prefix = config.prefix || '/api';
  }

  private buildUrl(path: string): string {
    return [this.baseUrl, this.prefix, path].join('/').replace(/([^:]\/)\/+/g, '$1');
  }

  get(
    path: string,
    params?: { [header: string]: string | string[] },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.client.get(this.buildUrl(path), {
      params,
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }

  post(
    path: string,
    body: any = null,
    params?: { [header: string]: string | string[] },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.client.post(this.buildUrl(path), body, {
      params,
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }

  put(
    path: string,
    body: any = null,
    params?: { [header: string]: string | string[] },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.client.put(this.buildUrl(path), body, {
      params,
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }

  patch(
    path: string,
    body: any = null,
    params?: { [header: string]: string | string[] },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.client.patch(this.buildUrl(path), body, {
      params,
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }

  delete(
    path: string,
    params?: { [header: string]: string | string[] },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.client.delete(this.buildUrl(path), {
      params,
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }
}
