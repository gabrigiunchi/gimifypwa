import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultListItemComponent} from './result-list-item.component';
import {AssetKindNamePipe} from 'src/app/pipes/asset-kind-name.pipe';
import {MatCardModule, MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {TestConstants} from 'src/app/test-constants';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';

describe('ResultListItemComponent', () => {
  let component: ResultListItemComponent;
  let fixture: ComponentFixture<ResultListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultListItemComponent, AssetKindNamePipe, LoadingComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListItemComponent);
    component = fixture.componentInstance;
    component.asset = TestConstants.mockAsset;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
