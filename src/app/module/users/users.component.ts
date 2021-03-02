import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResource, UserResourceService } from '@data/user-resource.service';
import { CollectionResource } from 'ngx-api-resource';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<CollectionResource<UserResource>>;

  constructor(private userResourceService: UserResourceService) {}

  ngOnInit(): void {
    this.users$ = this.userResourceService.index();
  }
}
