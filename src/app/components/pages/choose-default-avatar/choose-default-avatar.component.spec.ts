import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChooseDefaultAvatarComponent} from './choose-default-avatar.component';
import {of} from 'rxjs/internal/observable/of';
import {SafeUrlPipe} from 'src/app/pipes/safe-url.pipe';
import {MatIconModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {AvatarComponent} from '../../layout/avatar/avatar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule, Router} from '@angular/router';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {TestConstants} from 'src/app/test-constants';
import {AvatarModule} from 'ngx-avatar';

describe('ChooseDefaultAvatarComponent', () => {
  let component: ChooseDefaultAvatarComponent;
  let fixture: ComponentFixture<ChooseDefaultAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChooseDefaultAvatarComponent,
        AvatarComponent,
        ToolbarComponent,
        SafeUrlPipe
      ],
      imports: [
        MatProgressSpinnerModule,
        AvatarModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatIconModule,
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

  it('should download a default avatar', () => {
    const metadata = TestConstants.mockImageMetadata[0];
    const binary = TestConstants.str2ab('ciao');
    const spy = spyOn(TestBed.get(AvatarService), 'downloadAvatar').and.returnValue(of(binary));
    component.download(metadata);
    expect(spy).toHaveBeenCalledWith(metadata.id);
    expect(component.binaries.get(metadata.id)).toEqual(binary);
  });

  it('should select an avatar', () => {
    const spy = spyOn(TestBed.get(AvatarService), 'changeAvatar').and.returnValue(of({}));
    const spyOnRouter = spyOn(TestBed.get(Router), 'navigate').and.callFake(() => {});
    component.isLoading = true;
    const binary = TestConstants.str2ab('ciao');
    component.binaries.set('1', binary);
    component.avatarSelected('1');
    expect(spy).toHaveBeenCalledWith(binary);
    expect(spyOnRouter).toHaveBeenCalledWith(['/profile/avatar']);
  });
});
