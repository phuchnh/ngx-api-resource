import { Injectable } from '@angular/core';
import { NgxApiResourceService } from 'ngx-api-resource';

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
}
