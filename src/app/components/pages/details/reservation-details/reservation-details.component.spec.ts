import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReservationDetailsComponent} from './reservation-details.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  NativeDateModule
} from '@angular/material';
import {ToolbarComponent} from 'src/app/components/layout/toolbar/toolbar.component';
import {MapComponent} from 'src/app/components/layout/map/map.component';
import {AssetKindNamePipe} from 'src/app/pipes/asset-kind-name.pipe';
import {TimePipe} from 'src/app/pipes/date/time.pipe';
import {DateTimePipe} from 'src/app/pipes/date/datetime.pipe';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';

describe('ReservationDetailsComponent', () => {
  let component: ReservationDetailsComponent;
  let fixture: ComponentFixture<ReservationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationDetailsComponent,
        ToolbarComponent,
        MapComponent,
        AssetKindNamePipe,
        TimePipe,
        DateTimePipe,
        LoadingComponent
      ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatListModule,
        MatProgressSpinnerModule,
        NativeDateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
