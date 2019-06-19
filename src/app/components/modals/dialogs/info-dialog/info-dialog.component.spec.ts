import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InfoDialogComponent} from './info-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef, NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MockDialog} from 'src/app/test-constants';

describe('InfoDialogComponent', () => {
  let component: InfoDialogComponent;
  let fixture: ComponentFixture<InfoDialogComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoDialogComponent],
      imports: [
        NativeDateModule,
        HttpClientModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
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

  it('should be dismissed', () => {
    const spy = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.dismiss();
    expect(spy).toHaveBeenCalled();
  });
});
