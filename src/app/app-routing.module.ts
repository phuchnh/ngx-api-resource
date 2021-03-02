import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users/:id',
    loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./module/users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
