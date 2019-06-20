import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetListComponent} from './asset-list.component';
import {MatIconModule, MatListModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {KindIconPipe} from 'src/app/pipes/kind-icon.pipe';
import {TestConstants} from 'src/app/test-constants';
import {AssetDTO} from 'src/app/model/dto/assetDTO';

describe('AssetListComponent', () => {
  let component: AssetListComponent;
  let fixture: ComponentFixture<AssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetListComponent, KindIconPipe],
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

  it('should select an asset', () => {
    const asset: AssetDTO = {
      gymId: 1,
      gymName: '',
      id: 1,
      kind: {id: 1, maxReservationTime: 20, name: ''},
      name: ''
    };
    const spy = spyOn(component.assetSelected, 'emit').and.callThrough();
    component.onAssetClick(asset);
    expect(spy).toHaveBeenCalledWith(asset);
  });
});
