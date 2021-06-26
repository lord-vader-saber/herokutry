import { AuthGuard } from './auth/auth.guard';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'edit-registration',
    component: EditRegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-component',
    component: AdminComponent,
    children:[
      {
        path: 'admin-login',
        component: AdminLoginComponent
      },
      {
        path: 'admin-dashboard',

        component: AdminDashboardComponent
      }
    ]
  },
  {
    path: '',
    redirectTo:'/registration',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
