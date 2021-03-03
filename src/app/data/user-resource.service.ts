import { Injectable } from '@angular/core';
import { NgxApiResourceService } from 'ngx-api-resource';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

export interface UserResource {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class UserResourceService extends NgxApiResourceService<UserResource> {
  protected model = 'users';

  approve(userId: string | number): Observable<HttpResponse<any>> {
    return this.ngxApiClient.post(`/${this.model}/${userId}/approve`);
  }
}
