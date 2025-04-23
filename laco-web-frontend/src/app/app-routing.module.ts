import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';

const routes: Routes = [


  { path: '', loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule) },

  {
    path: 'private', loadChildren: () => import('./pages/private/private.module').then(m => m.PrivateModule),
    canActivate: [AuthGuard],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
