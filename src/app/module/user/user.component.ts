import { Component, OnInit } from '@angular/core';
import { UserResource, UserResourceService } from '@data/user-resource.service';
import { of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user!: UserResource;
  isLoading = true;
  onUpdate$ = new Subject<void>();

  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userResourceService: UserResourceService
  ) {}

  get userId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [''],
      name: ['']
    });

    this.activatedRoute.paramMap
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(param => {
          const userId = param.get('id');
          if (userId === 'new') {
            return of(null);
          }
          return this.userResourceService.show(userId).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          );
        }),
        untilDestroyed(this)
      )
      .subscribe(user => {
        this.user = user;
        this.userForm.patchValue(this.user);
      });

    this.onUpdate$
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(() => {
          return this.userResourceService.update(this.userId, this.userForm.value).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          );
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.router.navigate(['/users']);
      });
  }
}
