import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultGymPickerComponent} from './default-gym-picker.component';
import {MatDialog, MatDialogModule, MatIconModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {of} from 'rxjs';
import {SelectLocationResult} from '../../modals/dialogs/select-location-dialog/select-location-dialog.component';

describe('DefaultGymPickerComponent', () => {
  let component: DefaultGymPickerComponent;
  let fixture: ComponentFixture<DefaultGymPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultGymPickerComponent],
      imports: [
        MatIconModule,
        MatDialogModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultGymPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pick the default gym', () => {
    const result: SelectLocationResult = {city: TestConstants.mockGym.city, gym: TestConstants.mockGym};
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.pickGym();
    expect(component.gym).toEqual(result.gym);
  });

  it('should cancel the selection of a default gym', () => {
    component.gym = undefined;
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.pickGym();
    expect(component.gym).toBe(undefined);
  });
});
