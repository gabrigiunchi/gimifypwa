import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetListDialogComponent, AssetListDialogData} from './asset-list-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  NativeDateModule
} from '@angular/material';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {Router, RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {KindIconPipe} from 'src/app/pipes/kind-icon.pipe';
import {of} from 'rxjs';
import {ReservationService} from 'src/app/services/server-communication/reservation.service';

describe('AssetListDialogComponent', () => {
  let component: AssetListDialogComponent;
  let fixture: ComponentFixture<AssetListDialogComponent>;

  const mockDialogData: AssetListDialogData = {
    assets: [TestConstants.mockAsset],
    date: '2019-05-03',
    from: '10:00',
    to: '10:20'
  };
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AssetListDialogComponent,
        LoadingComponent,
        KindIconPipe
      ],
      imports: [
        ScrollingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        MatDialogModule,
        MatDividerModule,
        MatListModule,
        NativeDateModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should book an asset', () => {
    const spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    spyOn(TestBed.get(ReservationService), 'addReservation').and.returnValue(of({}));

    const dialog: MatDialog = TestBed.get(MatDialog);
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(true));
    spyOn(component, 'dismiss').and.callFake(() => {});
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.onBookingClick(TestConstants.mockAsset);
    expect(spyOnRouter).toHaveBeenCalledWith(['/reservations']);
  });

  it('should cancel the booking', () => {
    const spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    spyOn(TestBed.get(ReservationService), 'addReservation').and.returnValue(of({}));

    const dialog: MatDialog = TestBed.get(MatDialog);
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(false));
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.onBookingClick(TestConstants.mockAsset);
    expect(spyOnRouter).not.toHaveBeenCalled();
  });

  it('should be dismissed', () => {
    const spy = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.dismiss();
    expect(spy).toHaveBeenCalled();
  });
});
