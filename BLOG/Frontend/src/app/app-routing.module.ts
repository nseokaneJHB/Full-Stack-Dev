import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';
import { ProtectRoutesGuard } from './protect-routes.guard';
import { ProtectLoginRegisterGuard } from './protect-login-register.guard'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', component: DashboardComponent, canActivate: [ProtectRoutesGuard]  },
  { path: 'login', component: LoginComponent, canActivate: [ProtectLoginRegisterGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [ProtectLoginRegisterGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [ProtectRoutesGuard]  },
  { path: 'post/:id', component: PostComponent, canActivate: [ProtectRoutesGuard]  },
  { path: 'user/:id', component: UserComponent, canActivate: [ProtectRoutesGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
