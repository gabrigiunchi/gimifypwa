import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectLocationComponent} from './select-location.component';
import {MatProgressSpinnerModule, MatIconModule, MatStepperModule, MatRadioModule, MatDialogModule, MatDialogRef} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CityService} from 'src/app/services/server-communication/city.service';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SelectLocationComponent', () => {
  let component: SelectLocationComponent;
  let fixture: ComponentFixture<SelectLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectLocationComponent],
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
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(CityService), 'cities', 'get').and.returnValue(of([]));
    fixture = TestBed.createComponent(SelectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
