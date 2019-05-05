import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetsTabComponent} from './assets-tab.component';
import {AssetListComponent} from 'src/app/components/layout/asset-list/asset-list.component';
import {MatIconModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AssetsTabComponent', () => {
  let component: AssetsTabComponent;
  let fixture: ComponentFixture<AssetsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AssetsTabComponent,
        AssetListComponent,
        LoadingComponent,
      ],
      imports: [
        MatListModule,
        MatIconModule,
        MatPaginatorModule,
        ScrollingModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
