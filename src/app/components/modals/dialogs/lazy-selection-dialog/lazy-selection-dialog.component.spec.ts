import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LazySelectionDialogComponent, LazySelectionDialogData} from './lazy-selection-dialog.component';
import {of} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconModule, MatProgressSpinnerModule, MatRadioModule} from '@angular/material';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {MockDialog} from 'src/app/test-constants';

describe('LazySelectionDialogComponent', () => {
  let component: LazySelectionDialogComponent;
  let fixture: ComponentFixture<LazySelectionDialogComponent>;

  const mockDialogData: LazySelectionDialogData = {
    choices$: of([]),
    title: '',
    toStringFunction: n => `number${n}`
  };

  const dialogRef = new MockDialog();

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
        {provide: MatDialogRef, useValue: dialogRef},
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

  it('should call the custom toString if provided', () => {
    expect(component.toString(1)).toBe('number1');
  });

  it('should call the default toString if not provided', () => {
    component.data.toStringFunction = undefined;
    expect(component.toString(1)).toBe('1');
  });

  it('should cancel', () => {
    const spyOnDialog = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.cancel();
    expect(spyOnDialog).toHaveBeenCalledWith();
  });

  it('should confirm', () => {
    const spyOnDialog = spyOn(dialogRef, 'close').and.callFake(() => {});
    component.selected = 2;
    component.submit();
    expect(spyOnDialog).toHaveBeenCalledWith(2);
  });
});
