import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetsTabComponent} from './assets-tab.component';
import {AssetListComponent} from 'src/app/components/layout/asset-list/asset-list.component';
import {MatDialogModule, MatIconModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatDialog} from '@angular/material';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessageComponent} from 'src/app/components/layout/message/message.component';
import {KindIconPipe} from 'src/app/pipes/kind-icon.pipe';
import {MockDialog, TestConstants} from 'src/app/test-constants';
import {Page} from 'src/app/model/page';
import {AssetService} from 'src/app/services/server-communication/asset.service';
import {of} from 'rxjs';
import {AssetDTO} from 'src/app/model/dto/assetDTO';

describe('AssetsTabComponent', () => {
  let component: AssetsTabComponent;
  let fixture: ComponentFixture<AssetsTabComponent>;

  const mockPage: Page<AssetDTO> = {
    content: [],
    empty: false,
    first: true,
    last: false,
    number: 1,
    totalElements: 1,
    totalPages: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AssetsTabComponent,
        AssetListComponent,
        LoadingComponent,
        MessageComponent,
        KindIconPipe
      ],
      imports: [
        MatListModule,
        MatIconModule,
        MatPaginatorModule,
        ScrollingModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        MatDialogModule
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

  it('should download the first page if the gym is present', () => {
    const spy = spyOn(TestBed.get(AssetService), 'getAssetsByGym').and.returnValue(of(mockPage));
    component.gym = TestConstants.mockGym;
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.currentPage).toEqual(mockPage);
  });

  it('should unsubscribe from the previous subscription ', () => {
    component.currentDownload = of(1).subscribe();
    const spyOnGetAssets = spyOn(TestBed.get(AssetService), 'getAssetsByGym').and.returnValue(of(mockPage));
    const spyOnUnsubscribe = spyOn(component.currentDownload, 'unsubscribe').and.callThrough();
    component.gym = TestConstants.mockGym;
    component.ngOnChanges();
    expect(spyOnGetAssets).toHaveBeenCalled();
    expect(component.currentPage).toEqual(mockPage);
    expect(spyOnUnsubscribe).toHaveBeenCalled();
  });

  it('should not download the first page if the gym is undefined', () => {
    const spy = spyOn(component, 'downloadPage').and.callFake(() => {});
    component.gym = undefined;
    component.ngOnChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should select an asset', () => {
    const dialog: MatDialog = TestBed.get(MatDialog);
    const spy = spyOn(dialog, 'open').and.returnValue(new MockDialog());
    component.onAssetSelected({gymId: 1, gymName: '', id: 1, kind: TestConstants.mockAsset.kind, name: ''});
    expect(spy).toHaveBeenCalled();
  });

  it('should return the length of the elements', () => {
    component.currentPage = undefined;
    expect(component.length).toBe(0);
    component.currentPage = mockPage;
    expect(component.length).toBe(mockPage.totalElements);
  });

  it('should change page', () => {
    const spy = spyOn(component, 'downloadPage').and.callFake(() => {});
    component.pageChange(1);
    expect(spy).toHaveBeenCalledWith(1);
    component.pageChange(2);
    expect(spy).toHaveBeenCalledWith(2);
    component.pageChange(3);
    expect(spy).toHaveBeenCalledWith(3);
  });
});
