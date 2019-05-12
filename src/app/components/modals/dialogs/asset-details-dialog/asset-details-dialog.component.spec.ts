import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssetDetailsDialogComponent} from './asset-details-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconModule} from '@angular/material';
import {TestConstants} from 'src/app/test-constants';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AssetDetailsDialogComponent', () => {
  let component: AssetDetailsDialogComponent;
  let fixture: ComponentFixture<AssetDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetDetailsDialogComponent],
      imports: [
        MatIconModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: TestConstants.mockAsset}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
