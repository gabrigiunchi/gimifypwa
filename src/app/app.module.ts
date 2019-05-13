import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
  NativeDateModule,
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
import {SelectLocationDialogComponent} from './components/modals/dialogs/select-location-dialog/select-location-dialog.component';
import {TimePeriodPickerComponent} from './components/input/time-period-picker/time-period-picker.component';
import {LocationPickerComponent} from './components/input/location-picker/location-picker.component';
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
import {AvatarPipe} from './pipes/avatar.pipe';
import {AvatarComponent} from './components/layout/avatar/avatar.component';
import {AvatarPageComponent} from './components/pages/avatar-page/avatar-page.component';
import {EditAvatarBottomSheetComponent} from './components/modals/edit-avatar-bottom-sheet/edit-avatar-bottom-sheet.component';
import {ChooseDefaultAvatarComponent} from './components/pages/choose-default-avatar/choose-default-avatar.component';
import {AvatarEditorComponent} from './components/pages/avatar-editor/avatar-editor.component';
import {ImageCropperComponent} from './components/input/image-cropper/image-cropper.component';
import {NgxCropperjsModule} from 'ngx-cropperjs';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MaxEndTimePipe} from './pipes/date/max-end-time.pipe';
import {MinEndTimePipe} from './pipes/date/min-end-time.pipe';
import {ResultPageComponent} from './components/pages/result-page/result-page.component';
import {ResultListComponent} from './components/pages/result-page/result-list/result-list.component';
import {ResultMapComponent} from './components/pages/result-page/result-map/result-map.component';
import {ResultListItemComponent} from './components/pages/result-page/result-list/result-list-item/result-list-item.component';
import {AssetKindNamePipe} from './pipes/asset-kind-name.pipe';
import {MyCommentsComponent} from './components/pages/my-comments/my-comments.component';
import {AgmCoreModule} from '@agm/core';
// tslint:disable-next-line: max-line-length
import {ConfirmReservationDialogComponent} from './components/modals/dialogs/confirm-reservation-dialog/confirm-reservation-dialog.component';
import {AssetListDialogComponent} from './components/modals/dialogs/asset-list-dialog/asset-list-dialog.component';
import {KindIconPipe} from './pipes/kind-icon.pipe';
import {ReservationListComponent} from './components/layout/reservation-list/reservation-list.component';
import {ReservationsByDayPipe} from './pipes/reservations-by-day.pipe';
import {AssetDetailsDialogComponent} from './components/modals/dialogs/asset-details-dialog/asset-details-dialog.component';
import {SelectCityDialogComponent} from './components/modals/dialogs/select-city-dialog/select-city-dialog.component';
import {FooterSectionColorPipe} from './pipes/footer-section-color.pipe';
import {MapComponent} from './components/layout/map/map.component';
import {ErrorDialogComponent} from './components/modals/dialogs/error-dialog/error-dialog.component';
import {LazySelectionDialogComponent} from './components/modals/dialogs/lazy-selection-dialog/lazy-selection-dialog.component';
import {DefaultCityPickerComponent} from './components/input/default-city-picker/default-city-picker.component';
import {DefaultGymPickerComponent} from './components/input/default-gym-picker/default-gym-picker.component';
import {MinStartTimePipe} from './pipes/date/min-start-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
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
    SelectLocationDialogComponent,
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
    AvatarComponent,
    AvatarPageComponent,
    EditAvatarBottomSheetComponent,
    ChooseDefaultAvatarComponent,
    AvatarEditorComponent,
    ImageCropperComponent,
    MaxEndTimePipe,
    MinEndTimePipe,
    ResultPageComponent,
    ResultListComponent,
    ResultMapComponent,
    ResultListItemComponent,
    AssetKindNamePipe,
    MyCommentsComponent,
    ConfirmReservationDialogComponent,
    AssetListDialogComponent,
    KindIconPipe,
    ReservationListComponent,
    ReservationsByDayPipe,
    AssetDetailsDialogComponent,
    SelectCityDialogComponent,
    FooterSectionColorPipe,
    MapComponent,
    ErrorDialogComponent,
    LazySelectionDialogComponent,
    DefaultCityPickerComponent,
    DefaultGymPickerComponent,
    MinStartTimePipe,
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
    NgxCropperjsModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    ScrollingModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    NativeDateModule,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
    }),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    InfoDialogComponent,
    SelectionDialogComponent,
    SelectLocationDialogComponent,
    GymFilterComponent,
    GymDetailsComponent,
    NewCommentDialogComponent,
    EditAvatarBottomSheetComponent,
    ConfirmReservationDialogComponent,
    AssetListDialogComponent,
    AssetDetailsDialogComponent,
    SelectCityDialogComponent,
    ErrorDialogComponent,
    LazySelectionDialogComponent
  ]
})
export class AppModule {
}
