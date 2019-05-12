import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectCityDialogComponent} from './select-city-dialog.component';
import {MatDialogRef, MatIconModule, MatProgressSpinnerModule, MatRadioModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SelectCityDialogComponent', () => {
  let component: SelectCityDialogComponent;
  let fixture: ComponentFixture<SelectCityDialogComponent>;

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
        {provide: MatDialogRef, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
