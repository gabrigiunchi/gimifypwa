import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetListDialogComponent, AssetListDialogData} from './asset-list-dialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule, MatDialogRef, MAT_DIALOG_DATA, MatProgressSpinnerModule, MatDialogModule} from '@angular/material';
import {TestConstants} from 'src/app/test-constants';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AssetListDialogComponent', () => {
  let component: AssetListDialogComponent;
  let fixture: ComponentFixture<AssetListDialogComponent>;

  const mockDialogData: AssetListDialogData = {
    assets: [TestConstants.mockAsset],
    date: '2019-05-03',
    from: '10:00',
    to: '10:20'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetListDialogComponent, LoadingComponent],
      imports: [
        ScrollingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
