import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './components/pages/homepage/homepage.component';
import {ProfilePageComponent} from './components/pages/profile-page/profile-page.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/pages/login/login.component';

const routes: Routes = [
  {path: 'home', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
