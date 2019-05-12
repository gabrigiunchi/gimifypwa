import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LazySelectionDialogComponent, LazySelectionDialogData} from './lazy-selection-dialog.component';
import {of} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconModule, MatProgressSpinnerModule, MatRadioModule} from '@angular/material';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';

describe('LazySelectionDialogComponent', () => {
  let component: LazySelectionDialogComponent;
  let fixture: ComponentFixture<LazySelectionDialogComponent>;

  const mockDialogData: LazySelectionDialogData = {
    choices$: of([]),
    title: ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LazySelectionDialogComponent, LoadingComponent],
      imports: [
        MatProgressSpinnerModule,
        MatIconModule,
        ScrollingModule,
        MatRadioModule,
        FormsModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazySelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
