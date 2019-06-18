import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditAvatarBottomSheetComponent} from './edit-avatar-bottom-sheet.component';
import {MatBottomSheetModule, MatBottomSheetRef, MatIconModule, MatListModule, NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MockDialog} from 'src/app/test-constants';

describe('EditAvatarBottomSheetComponent', () => {
  let component: EditAvatarBottomSheetComponent;
  let fixture: ComponentFixture<EditAvatarBottomSheetComponent>;
  const dialogRef = new MockDialog();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAvatarBottomSheetComponent],
      imports: [
        MatListModule,
        MatBottomSheetModule,
        NativeDateModule,
        HttpClientModule,
        MatIconModule,
      ],
      providers: [
        {provide: MatBottomSheetRef, useValue: dialogRef}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAvatarBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select an action', () => {
    const action = component.actions[0];
    const spyOnDialogref = spyOn(dialogRef, 'dismiss').and.callThrough();
    component.onSelection(action);
    expect(spyOnDialogref).toHaveBeenCalledWith(action.action);
  });

  it('should open the gallery', () => {
    const action = component.actions[3];
    const spyOnDialogref = spyOn(dialogRef, 'dismiss').and.callThrough();
    const element = document.createElement('span');
    spyOn(document, 'getElementById').and.returnValue(element);
    const spyOnElement = spyOn(element, 'click').and.callFake(() => {});
    component.onSelection(action);
    expect(spyOnDialogref).toHaveBeenCalledWith(action.action);
    expect(spyOnElement).toHaveBeenCalled();
  });
});
