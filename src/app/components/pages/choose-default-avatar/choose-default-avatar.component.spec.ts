import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChooseDefaultAvatarComponent} from './choose-default-avatar.component';
import {of} from 'rxjs/internal/observable/of';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {MatProgressSpinnerModule} from '@angular/material';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {AvatarComponent} from '../../layout/avatar/avatar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';

describe('ChooseDefaultAvatarComponent', () => {
  let component: ChooseDefaultAvatarComponent;
  let fixture: ComponentFixture<ChooseDefaultAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseDefaultAvatarComponent, AvatarComponent, SafeUrlPipe],
      imports: [
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(AvatarService), 'presetAvatarMetadata', 'get').and.returnValue(of([]));
    fixture = TestBed.createComponent(ChooseDefaultAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
