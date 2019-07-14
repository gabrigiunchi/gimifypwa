import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {AvatarPageComponent} from './components/pages/avatar-page/avatar-page.component';
import {ChooseDefaultAvatarComponent} from './components/pages/choose-default-avatar/choose-default-avatar.component';
import {AvatarEditorComponent} from './components/pages/avatar-editor/avatar-editor.component';
import {ResultPageComponent} from './components/pages/result-page/result-page.component';
import {MyCommentsComponent} from './components/pages/my-comments/my-comments.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'profile/comments', component: MyCommentsComponent, canActivate: [AuthGuard]},
  {path: 'profile/avatar', component: AvatarPageComponent, canActivate: [AuthGuard]},
  {path: 'profile/avatar/modify', component: AvatarEditorComponent, canActivate: [AuthGuard]},
  {path: 'profile/avatar/defaults', component: ChooseDefaultAvatarComponent, canActivate: [AuthGuard]},
  {path: 'gyms', component: GymsPageComponent, canActivate: [AuthGuard]},
  {path: 'gyms/:id', component: GymDetailsComponent, canActivate: [AuthGuard]},
  {path: 'assets', component: PlaygroundComponent, canActivate: [AuthGuard]},
  {path: 'reservations/:id', component: ReservationDetailsComponent, canActivate: [AuthGuard]},
  {path: 'reservations', component: ReservationsPageComponent, canActivate: [AuthGuard]},
  {path: 'search/kind/:kind/date/:date/from/:from/to/:to/city/:city', component: ResultPageComponent, canActivate: [AuthGuard]},
  {path: 'search/kind/:kind/date/:date/from/:from/to/:to/city/:city/gym/:gym', component: ResultPageComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchPageComponent, canActivate: [AuthGuard]},
  {path: 'playground', component: PlaygroundComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/reservations', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
