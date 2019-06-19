import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AvatarComponent} from './avatar.component';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarComponent, SafeUrlPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.avatar = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when the avatar is clicked', () => {
    const spy = spyOn(component.avatarClick, 'emit').and.callThrough();
    component.onAvatarClick();
    expect(spy).toHaveBeenCalled();
  });
});
