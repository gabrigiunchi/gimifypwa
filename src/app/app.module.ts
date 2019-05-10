import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomepageComponent} from './components/pages/homepage/homepage.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProfilePageComponent} from './components/pages/profile-page/profile-page.component';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoginComponent} from './components/pages/login/login.component';
import {WaitingPageComponent} from './components/pages/waiting-page/waiting-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToolbarComponent} from './components/layout/toolbar/toolbar.component';
import {DateTimePipe} from './pipes/date/datetime.pipe';
import {FooterComponent} from './components/layout/footer/footer.component';
import {SearchPageComponent} from './components/pages/search-page/search-page.component';
import {GymsPageComponent} from './components/pages/gyms-page/gyms-page.component';
import {ReservationsPageComponent} from './components/pages/reservations-page/reservations-page.component';
import {GymDetailsComponent} from './components/pages/details/gym-details/gym-details.component';
import {ReservationDetailsComponent} from './components/pages/details/reservation-details/reservation-details.component';
import {InfoDialogComponent} from './components/modals/dialogs/info-dialog/info-dialog.component';
import {ConfirmationDialogComponent} from './components/modals/dialogs/confirmation-dialog/confirmation-dialog.component';
import {MessageComponent} from './components/layout/message/message.component';
import {LoadingComponent} from './components/layout/loading/loading.component';
import {PlaygroundComponent} from './components/pages/playground/playground.component';
import {SelectionDialogComponent} from './components/modals/dialogs/selection-dialog/selection-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DatepickerComponent} from './components/input/datepicker/datepicker.component';
import {TimePipe} from './pipes/date/time.pipe';
import {SelectLocationComponent} from './components/modals/dialogs/select-location/select-location.component';
import {TimePeriodPickerComponent} from './components/input/time-period-picker/time-period-picker.component';
import {LocationPickerComponent} from './components/input/select-location-form/location-picker.component';
import {AssetKindPickerComponent} from './components/input/asset-kind-picker/asset-kind-picker.component';
import {GymFilterComponent} from './components/modals/gym-filter/gym-filter.component';
import {SearchbarComponent} from './components/input/searchbar/searchbar.component';
import {RatingBarComponent} from './components/layout/rating-bar/rating-bar.component';
import {DetailsTabComponent} from './components/pages/details/gym-details/details-tab/details-tab.component';
import {AssetsTabComponent} from './components/pages/details/gym-details/assets-tab/assets-tab.component';
import {PhotosTabComponent} from './components/pages/details/gym-details/photos-tab/photos-tab.component';
import {CommentsTabComponent} from './components/pages/details/gym-details/comments-tab/comments-tab.component';
import {TimetableDetailsComponent} from './components/layout/timetable-details/timetable-details.component';
import {CommentListComponent} from './components/layout/comment-list/comment-list.component';
import {AssetListComponent} from './components/layout/asset-list/asset-list.component';
import {NewCommentDialogComponent} from './components/modals/dialogs/new-comment-dialog/new-comment-dialog.component';
import {FabButtonComponent} from './components/layout/fab-button/fab-button.component';
import {DataUrlPipe} from './pipes/data-url.pipe';
import {SafeUrlPipe} from './pipes/safe-url.pipe';
import { AvatarPipe } from './pipes/avatar.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProfilePageComponent,
    LoginComponent,
    WaitingPageComponent,
    ToolbarComponent,
    DateTimePipe,
    FooterComponent,
    SearchPageComponent,
    GymsPageComponent,
    ReservationsPageComponent,
    GymDetailsComponent,
    ReservationDetailsComponent,
    InfoDialogComponent,
    ConfirmationDialogComponent,
    MessageComponent,
    LoadingComponent,
    PlaygroundComponent,
    SelectionDialogComponent,
    DatepickerComponent,
    TimePipe,
    SelectLocationComponent,
    TimePeriodPickerComponent,
    LocationPickerComponent,
    AssetKindPickerComponent,
    GymFilterComponent,
    SearchbarComponent,
    RatingBarComponent,
    DetailsTabComponent,
    AssetsTabComponent,
    PhotosTabComponent,
    CommentsTabComponent,
    TimetableDetailsComponent,
    CommentListComponent,
    AssetListComponent,
    NewCommentDialogComponent,
    FabButtonComponent,
    DataUrlPipe,
    SafeUrlPipe,
    AvatarPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    ScrollingModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    DragDropModule,
    MatTreeModule,
    FlexLayoutModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    InfoDialogComponent,
    SelectionDialogComponent,
    SelectLocationComponent,
    GymFilterComponent,
    GymDetailsComponent,
    NewCommentDialogComponent,
  ]
})
export class AppModule {
}
