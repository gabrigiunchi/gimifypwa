import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultPageComponent} from './result-page.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {MatCardModule, MatIconModule, MatProgressSpinnerModule, MatTabsModule, MatToolbarModule, NativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResultMapComponent} from './result-map/result-map.component';
import {ResultListComponent} from './result-list/result-list.component';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {ResultListItemComponent} from './result-list/result-list-item/result-list-item.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MessageComponent} from '../../layout/message/message.component';
import {AgmCoreModule} from '@agm/core';
import {MapComponent} from '../../layout/map/map.component';
import {AssetsToGymsPipe} from 'src/app/pipes/assets-to-gyms.pipe';
import {AvatarModule} from 'ngx-avatar';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {GymAvatarPipe} from 'src/app/pipes/gym-avatar.pipe';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {CityService} from 'src/app/services/server-communication/city.service';
import {of} from 'rxjs';
import {TestConstants} from 'src/app/test-constants';

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultPageComponent,
        ToolbarComponent,
        ResultListComponent,
        LoadingComponent,
        ResultMapComponent,
        MapComponent,
        ResultListItemComponent,
        AssetsToGymsPipe,
        MessageComponent,
        SafeUrlPipe,
        GymAvatarPipe,
        DateTimePipe,
        TimePipe,
        ToolbarComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        AvatarModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        ScrollingModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
        NativeDateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(CityService), 'getCityById').and.returnValue(of(TestConstants.mockCity));
    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back and set the clearCache to true', () => {
    component.clearCache = true;
    component.onBackClick();
    expect(component.clearCache).toBe(false);
  });
});
