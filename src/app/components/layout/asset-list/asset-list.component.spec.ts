import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetListComponent} from './asset-list.component';
import {MatIconModule, MatListModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AssetListComponent', () => {
  let component: AssetListComponent;
  let fixture: ComponentFixture<AssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetListComponent],
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
