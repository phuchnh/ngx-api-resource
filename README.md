# ngx-api-resource

## Getting started

### Installation

To install the package from npm - run `npm install ngx-api-resource`

### Setup

```typescript
import { NgxApiResourceModule } from 'ngx-api-resource';

@NgModule({
  imports: [
    ...
    NgxApiResourceModule.forRoot({
      baseUrl: 'http://l8-api.test/',
      prefix: '/api'
    })
  ],
})
export class AppModule {}
```

### Usage

| Verb      	| URI           	| Method  	| Summary                        	|
|-----------	|---------------	|---------	|--------------------------------	|
| GET       	| /users        	| index   	| Fetches the list of resources. 	|
| POST      	| /users        	| store   	| Creates new resources.         	|
| GET       	| /users/{user} 	| show    	| Fetches a resource.            	|
| PUT/PATCH 	| /users/{user} 	| update  	| Updates a resource.            	|
| DELETE    	| /users/{user} 	| destroy 	| Deletes a resource.            	|

### Create service

```typescript
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
  protected model = 'users'; // prefix url
}

```

Create component and inject service

```typescript
import { UserResource, UserResourceService } from './user-resource.service';
import { CollectionResource } from 'ngx-api-resource';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private userResourceService: UserResourceService) {}

  // Fetches the list of resources.
  index(): Observable<CollectionResource<UserResource>> {
    return this.userResourceService.index()
  }

  // Creates new resources.
  store(attributes: any): Observable<UserResource> {
    return this.userResourceService.store(attributes)
  }

  // Fetches a resource.
  show(id: string|number): Observable<UserResource> {
    return this.userResourceService.show(id)
  }

  // Updates a resource.
  update(id: string|number, attributes: any): Observable<UserResource> {
    return this.userResourceService.update(id,attributes)
  }

  // Deletes a resource.
  delete(id: string|number): Observable<HttpResponse<any>> {
    return this.userResourceService.destroy(id)
  }
}

```
