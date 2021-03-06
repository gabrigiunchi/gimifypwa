import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultListItemComponent} from './result-list-item.component';
import {MatCardModule, MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {TestConstants} from 'src/app/test-constants';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {GymAvatarPipe} from 'src/app/pipes/gym-avatar.pipe';
import {AvatarModule} from 'ngx-avatar';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GymImageService} from 'src/app/services/server-communication/gym-image-service';
import {of} from 'rxjs';

describe('ResultListItemComponent', () => {
  let component: ResultListItemComponent;
  let fixture: ComponentFixture<ResultListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultListItemComponent,
        LoadingComponent,
        SafeUrlPipe,
        GymAvatarPipe,
        DateTimePipe,
        TimePipe
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        HttpClientTestingModule,
        AvatarModule,
        MatProgressSpinnerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(GymImageService), 'getAvatarMetadataOfGym').and.returnValue(of([]));
    fixture = TestBed.createComponent(ResultListItemComponent);
    component = fixture.componentInstance;
    component.asset = TestConstants.mockAsset;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the booking', () => {
    const spy = spyOn(component.bookingClick, 'emit').and.callThrough();
    component.onBookingClick();
    expect(spy).toHaveBeenCalledWith(TestConstants.mockAsset);
  });
});
