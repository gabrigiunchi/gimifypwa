import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultCityPickerComponent} from './default-city-picker.component';
import {MatDialog, MatDialogModule, MatIconModule} from '@angular/material';
import {SettingsService} from 'src/app/services/settings.service';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {of} from 'rxjs';

describe('DefaultCityPickerComponent', () => {
  let component: DefaultCityPickerComponent;
  let fixture: ComponentFixture<DefaultCityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultCityPickerComponent],
      imports: [
        MatIconModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should choose the default city', () => {
    const settingsService: SettingsService = TestBed.get(SettingsService);
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(TestConstants.mockCity));
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.pickCity();
    expect(component.city).toEqual(TestConstants.mockCity);
    expect(settingsService.defaultCity).toEqual(TestConstants.mockCity);
  });

  it('should abort the selection', () => {
    const settingsService: SettingsService = TestBed.get(SettingsService);
    settingsService.defaultCity = TestConstants.mockCity;
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRef);

    component.pickCity();
    expect(component.city).toEqual(TestConstants.mockCity);
    expect(settingsService.defaultCity).toEqual(TestConstants.mockCity);
  });
});
