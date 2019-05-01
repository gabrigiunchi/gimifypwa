import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InfoDialogComponent} from './info-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef, NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('InfoDialogComponent', () => {
  let component: InfoDialogComponent;
  let fixture: ComponentFixture<InfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoDialogComponent],
      imports: [
        NativeDateModule,
        HttpClientModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {title: '', message: ''}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
