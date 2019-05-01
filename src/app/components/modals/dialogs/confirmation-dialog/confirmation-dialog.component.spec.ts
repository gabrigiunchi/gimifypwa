import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationDialogComponent, ConfirmationDialogData} from './confirmation-dialog.component';
import {MAT_DIALOG_DATA, MatButtonModule, MatDialogRef, NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  const mockDialogData: ConfirmationDialogData = ConfirmationDialogComponent.DEFAULT_DATA;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [
        MatButtonModule,
        NativeDateModule,
        HttpClientModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});