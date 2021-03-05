import { Component, OnInit } from '@angular/core';
import { combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { UserResource, UserResourceService } from '@data/user-resource.service';
import { CollectionResource, Direction, NgxApiQuery } from 'ngx-api-resource';
import { FormControl } from '@angular/forms';
import { catchError, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<CollectionResource<UserResource>>;
  onSearch$ = new Subject<any>();

  nameControl: FormControl;
  emailControl: FormControl;

  constructor(
    private ngxApiQuery: NgxApiQuery,
    private userResourceService: UserResourceService) {
  }

  ngOnInit(): void {
    this.nameControl = new FormControl('');
    this.emailControl = new FormControl('');

    const source$ = [
      this.onSearch$.pipe(startWith(undefined as void))
    ];

    this.users$ = combineLatest(source$).pipe(
      switchMap(() => {

        this.ngxApiQuery
          .with('posts', 'author')
          .where('name', this.nameControl.value)
          .where('email', this.emailControl.value)
          .paginate(1, 20)
          .orderBy('name', Direction.DESC);

        return this.userResourceService.index(this.ngxApiQuery).pipe(catchError(() => EMPTY));
      })
    );
  }
}
