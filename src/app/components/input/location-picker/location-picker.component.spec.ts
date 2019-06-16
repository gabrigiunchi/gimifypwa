import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LocationPickerComponent} from './location-picker.component';
import {MatDialogModule, MatIconModule, MatInputModule, MatDialog} from '@angular/material';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {of} from 'rxjs';
import {SelectLocationResult} from '../../modals/dialogs/select-location-dialog/select-location-dialog.component';

describe('LocationPickerComponent', () => {
  let component: LocationPickerComponent;
  let fixture: ComponentFixture<LocationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationPickerComponent],
      imports: [
        MatIconModule,
        MatDialogModule,
        MatInputModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should choose the default city', () => {
    const result: SelectLocationResult = {city: TestConstants.mockCity, gym: TestConstants.mockGym};
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.changeCity();
    expect(component.result).toEqual(result);
    component.changeGym();
    expect(component.result).toEqual(result);
  });

  it('should abort the selection', () => {
    const result: SelectLocationResult = {city: TestConstants.mockCity, gym: TestConstants.mockGym};
    component.result = result;
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.changeCity();
    expect(component.result).toEqual(result);
  });
});
