import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymDetailsComponent} from './gym-details.component';
import {HttpClientModule} from '@angular/common/http';
import {Router, RouterModule} from '@angular/router';
import {RatingBarComponent} from 'src/app/components/layout/rating-bar/rating-bar.component';
import {
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {GymService} from 'src/app/services/server-communication/gym.service';
import {of} from 'rxjs';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {TimetableDetailsComponent} from 'src/app/components/layout/timetable-details/timetable-details.component';
import {DetailsTabComponent} from './details-tab/details-tab.component';
import {AssetsTabComponent} from './assets-tab/assets-tab.component';
import {CommentsTabComponent} from './comments-tab/comments-tab.component';
import {CommentListComponent} from 'src/app/components/layout/comment-list/comment-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AssetListComponent} from 'src/app/components/layout/asset-list/asset-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MessageComponent} from 'src/app/components/layout/message/message.component';
import {PhotosTabComponent} from './photos-tab/photos-tab.component';
import {FabButtonComponent} from 'src/app/components/layout/fab-button/fab-button.component';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';
import {AvatarPipe} from 'src/app/pipes/avatar.pipe';
import {TestConstants} from 'src/app/test-constants';
import {KindIconPipe} from 'src/app/pipes/kind-icon.pipe';
import {AgmCoreModule} from '@agm/core';
import {MapComponent} from 'src/app/components/layout/map/map.component';
import {GroupIntervalsByDayOfWeekPipe} from 'src/app/pipes/group-intervals-by-day-of-week.pipe';
import {DayOfWeekNamePipe} from 'src/app/pipes/date/day-of-week-name.pipe';
import {AvatarModule} from 'ngx-avatar';
import {GymImageService} from 'src/app/services/server-communication/gym-image-service';
import {CommentService} from 'src/app/services/server-communication/comment.service';
import {TimetableService} from 'src/app/services/server-communication/timetable.service';
import {Page} from 'src/app/model/page';
import {Comment} from 'src/app/model/entities/comment';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';

describe('GymDetailsComponent', () => {
  let component: GymDetailsComponent;
  let fixture: ComponentFixture<GymDetailsComponent>;
  const mockPage: Page<Comment> = {
    content: TestConstants.mockComments.slice(0, 1),
    empty: false,
    first: false, last: false,
    number: 1,
    totalElements: 20,
    totalPages: 4
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GymDetailsComponent,
        FabButtonComponent,
        LoadingComponent,
        TimePipe,
        TimetableDetailsComponent,
        DetailsTabComponent,
        RatingBarComponent,
        AssetListComponent,
        AssetsTabComponent,
        PhotosTabComponent,
        MessageComponent,
        CommentsTabComponent,
        AvatarPipe,
        DateTimePipe,
        SafeUrlPipe,
        KindIconPipe,
        DataUrlPipe,
        CommentListComponent,
        MapComponent,
        GroupIntervalsByDayOfWeekPipe,
        DayOfWeekNamePipe,
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
        RouterModule.forRoot([]),
        MatIconModule,
        MatListModule,
        MatGridListModule,
        AvatarModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatTableModule,
        ScrollingModule,
        MatDialogModule,
        MatPaginatorModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const avatarService: AvatarService = TestBed.get(AvatarService);
    const mockResult = of(of(new ArrayBuffer(200)));
    spyOn(avatarService, 'downloadAvatarOfUser').and.returnValue(mockResult);
    spyOn(avatarService, 'getMetadataOfUser').and.returnValue(of(TestConstants.mockImageMetadata[0]));

    spyOn(TestBed.get(GymImageService), 'getPhotoOfGym').and.returnValue(of(''));
    spyOn(TestBed.get(CommentService), 'getCommentsByGym').and.returnValue(of(mockPage));
    spyOn(TestBed.get(TimetableService), 'getTimetableOfGym').and.returnValue(of(TestConstants.mockTimetable));
    const gymService: GymService = TestBed.get(GymService);
    spyOn(gymService, 'getRatingOfGym').and.returnValue(of(1));
    spyOn(gymService, 'getGymById').and.returnValue(of(TestConstants.mockGym));
    fixture = TestBed.createComponent(GymDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back and not clear the cache', () => {
    const spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    const spyOnClearCache = spyOn(TestBed.get(GymService), 'clear').and.callFake(() => {});
    component.back();
    expect(component.clearCache).toBe(false);
    expect(spyOnClearCache).not.toHaveBeenCalled();
    expect(spyOnRouter).toHaveBeenCalledWith(['/gyms']);
  });

  it('should destroy clear the cache', () => {
    component.clearCache = true;
    const spyOnClearCache = spyOn(TestBed.get(GymService), 'clear').and.callFake(() => {});
    component.ngOnDestroy();
    expect(spyOnClearCache).toHaveBeenCalled();
  });
});
