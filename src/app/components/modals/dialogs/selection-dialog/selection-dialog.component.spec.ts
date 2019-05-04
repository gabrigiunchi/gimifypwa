import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectionDialogComponent, SelectionDialogData} from './selection-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDividerModule, MatIconModule, NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';

describe('SelectionDialogComponent', () => {
  let component: SelectionDialogComponent;
  let fixture: ComponentFixture<SelectionDialogComponent>;

  const mockDialogData: SelectionDialogData = {
    choices: [],
    title: ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionDialogComponent],
      imports: [
        MatRadioModule,
        FormsModule,
        NativeDateModule,
        HttpClientModule,
        MatDividerModule,
        ScrollingModule,
        MatIconModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the custom toString if provided', () => {
    component.data = {
      choices: [1, 2, 3, 4],
      title: 'Select numbers',
      toStringFunction: n => `number${n}`
    };

    expect(component.toString(1)).toBe('number1');
  });

  it('should call the default toString if not provided', () => {
    component.data = {
      choices: [1, 2, 3, 4],
      title: 'Select numbers',
    };

    expect(component.toString(1)).toBe('1');
  });
});
