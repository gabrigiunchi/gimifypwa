import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetListComponent} from './asset-list.component';
import {MatIconModule, MatListModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AssetKindNamePipe} from 'src/app/pipes/asset-kind-name.pipe';
import {KindIconPipe} from 'src/app/pipes/kind-icon.pipe';

describe('AssetListComponent', () => {
  let component: AssetListComponent;
  let fixture: ComponentFixture<AssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetListComponent, AssetKindNamePipe, KindIconPipe],
      imports: [
        ScrollingModule,
        MatListModule,
        MatIconModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
