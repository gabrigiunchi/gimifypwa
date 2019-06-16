import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AssetKindPickerComponent} from './asset-kind-picker.component';
import {MatDialogModule, MatIconModule, MatInputModule, MatDialog} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {AssetKindService} from 'src/app/services/server-communication/asset-kind.service';
import {MockDialog, TestConstants} from 'src/app/test-constants';

describe('AssetKindPickerComponent', () => {
  let component: AssetKindPickerComponent;
  let fixture: ComponentFixture<AssetKindPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetKindPickerComponent],
      imports: [
        MatIconModule,
        MatInputModule,
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOnProperty(TestBed.get(AssetKindService), 'assetKinds', 'get').and.returnValue(of([]));
    fixture = TestBed.createComponent(AssetKindPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select an asset kind', () => {
    const kindResult = TestConstants.mockAsset.kind;
    const dialog: MatDialog = TestBed.get(MatDialog);
    const dialogRef = new MockDialog();
    spyOn(dialogRef, 'afterClosed').and.returnValue(of(kindResult));
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    component.openDialog();
    expect(component.result.id).toBe(kindResult.id);
    expect(component.result.name).toBe(kindResult.name);
    expect(component.result.maxReservationTime).toBe(kindResult.maxReservationTime);
  });
});
