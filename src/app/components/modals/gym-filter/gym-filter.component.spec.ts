import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GymFilterComponent, GymFilterResult} from './gym-filter.component';
import {MatDialog, MatDialogModule, MatDialogRef, MatIconModule, MatSliderModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {of} from 'rxjs';
import {CityService} from 'src/app/services/server-communication/city.service';

describe('GymFilterComponent', () => {
  let component: GymFilterComponent;
  let fixture: ComponentFixture<GymFilterComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GymFilterComponent],
      imports: [
        MatIconModule,
        MatSliderModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [{provide: MatDialogRef, useValue: dialogRef}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([]));
    fixture = TestBed.createComponent(GymFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel', () => {
    const spy = spyOn(dialogRef, 'close').and.callThrough();
    component.cancel();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should submit', () => {
    const result: GymFilterResult = {city:  TestConstants.mockCity, ratingGreaterThan: 3};
    component.result = result;
    const spy = spyOn(dialogRef, 'close').and.callThrough();
    component.submit();
    expect(spy).toHaveBeenCalledWith(result);
  });

  it('should select the city', () => {
    const result = TestConstants.mockCity;
    const dialog: MatDialog = TestBed.get(MatDialog);
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(result));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.pickCity();
    expect(component.result.city).toEqual(result);
  });

  it('should cancel the selection', () => {
    const dialog: MatDialog = TestBed.get(MatDialog);
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.pickCity();
    expect(component.result.city).toBe(undefined);
  });
});
