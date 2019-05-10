import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditAvatarBottomSheetComponent} from './edit-avatar-bottom-sheet.component';
import {MatBottomSheetModule, MatBottomSheetRef, MatIconModule, MatListModule, NativeDateModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

describe('EditAvatarBottomSheetComponent', () => {
  let component: EditAvatarBottomSheetComponent;
  let fixture: ComponentFixture<EditAvatarBottomSheetComponent>;

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
        {provide: MatBottomSheetRef, useValue: {}}
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
});
