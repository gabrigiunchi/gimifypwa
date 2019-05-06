import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './components/pages/homepage/homepage.component';
import {ProfilePageComponent} from './components/pages/profile-page/profile-page.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/pages/login/login.component';
import {LoginGuard} from './guards/login.guard';
import {SearchPageComponent} from './components/pages/search-page/search-page.component';
import {ReservationsPageComponent} from './components/pages/reservations-page/reservations-page.component';
import {GymsPageComponent} from './components/pages/gyms-page/gyms-page.component';
import {GymDetailsComponent} from './components/pages/details/gym-details/gym-details.component';
import {ReservationDetailsComponent} from './components/pages/details/reservation-details/reservation-details.component';
import {PlaygroundComponent} from './components/pages/playground/playground.component';

const routes: Routes = [
  {path: 'home', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'gyms', component: GymsPageComponent, canActivate: [AuthGuard]},
  {path: 'gyms/:id', component: GymDetailsComponent, canActivate: [AuthGuard]},
  {path: 'assets', component: PlaygroundComponent, canActivate: [AuthGuard]},
  {path: 'assets/:id', component: PlaygroundComponent, canActivate: [AuthGuard]},
  {path: 'reservations/:id', component: ReservationDetailsComponent, canActivate: [AuthGuard]},
  {path: 'reservations', component: ReservationsPageComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchPageComponent, canActivate: [AuthGuard]},
  {path: 'playground', component: PlaygroundComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
