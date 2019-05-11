import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewCommentDialogComponent} from './new-comment-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSliderModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestConstants} from 'src/app/test-constants';

describe('NewCommentDialogComponent', () => {
  let component: NewCommentDialogComponent;
  let fixture: ComponentFixture<NewCommentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCommentDialogComponent],
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatSliderModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: TestConstants.mockGym}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
