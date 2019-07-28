import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangePasswordDialogComponent} from './change-password-dialog.component';
import {MockDialog} from 'src/app/test-constants';
import {MatDialogRef, MatInputModule, MatProgressSpinnerModule, MatIconModule, MatDialogModule} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ChangePasswordDialogComponent', () => {
  let component: ChangePasswordDialogComponent;
  let fixture: ComponentFixture<ChangePasswordDialogComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordDialogComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
