import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymDetailsComponent} from './gym-details.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RatingBarComponent} from 'src/app/components/layout/rating-bar/rating-bar.component';
import {
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
import {Gym} from 'src/app/model/entities/gym';
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
import {AssetKindNamePipe} from 'src/app/pipes/asset-kind-name.pipe';
import {TestConstants} from 'src/app/test-constants';

describe('GymDetailsComponent', () => {
  let component: GymDetailsComponent;
  let fixture: ComponentFixture<GymDetailsComponent>;

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
        AssetKindNamePipe,
        AvatarPipe,
        SafeUrlPipe,
        DataUrlPipe,
        CommentListComponent
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatTableModule,
        ScrollingModule,
        MatPaginatorModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
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
});
