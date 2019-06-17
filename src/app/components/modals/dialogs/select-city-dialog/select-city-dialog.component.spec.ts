import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectCityDialogComponent} from './select-city-dialog.component';
import {MatDialogRef, MatIconModule, MatProgressSpinnerModule, MatRadioModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {CityService} from 'src/app/services/server-communication/city.service';
import {of} from 'rxjs';

describe('SelectCityDialogComponent', () => {
  let component: SelectCityDialogComponent;
  let fixture: ComponentFixture<SelectCityDialogComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCityDialogComponent, LoadingComponent],
      imports: [
        MatIconModule,
        ScrollingModule,
        FormsModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(CityService), 'cities').and.returnValue(of([]));
    fixture = TestBed.createComponent(SelectCityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    const spyOnDialogRef = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.close();
    expect(spyOnDialogRef).toHaveBeenCalledWith();
  });

  it('should submit', () => {
    component.selected = TestConstants.mockCity;
    const spyOnDialogRef = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.submit();
    expect(spyOnDialogRef).toHaveBeenCalledWith(TestConstants.mockCity);
  });
});
