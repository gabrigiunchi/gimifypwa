import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
