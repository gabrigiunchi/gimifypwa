import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectLocationDialogComponent} from './select-location-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatStepperModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CityService} from 'src/app/services/server-communication/city.service';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CityNamePipe} from 'src/app/pipes/city-name.pipe';

describe('SelectLocationDialogComponent', () => {
  let component: SelectLocationDialogComponent;
  let fixture: ComponentFixture<SelectLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectLocationDialogComponent, CityNamePipe],
      imports: [
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        ScrollingModule,
        MatIconModule,
        MatStepperModule,
        MatRadioModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {gym: undefined, city: undefined}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([]));
    fixture = TestBed.createComponent(SelectLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
