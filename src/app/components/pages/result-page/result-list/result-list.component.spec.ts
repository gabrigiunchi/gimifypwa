import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultListComponent} from './result-list.component';
import {ResultListItemComponent} from './result-list-item/result-list-item.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCardModule, MatProgressSpinnerModule, MatIconModule, MatDialogModule} from '@angular/material';
import {AssetKindNamePipe} from 'src/app/pipes/asset-kind-name.pipe';
import {LoadingComponent} from 'src/app/components/layout/loading/loading.component';
import {MessageComponent} from 'src/app/components/layout/message/message.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultListComponent,
         ResultListItemComponent,
         AssetKindNamePipe,
         LoadingComponent,
         MessageComponent
        ],
      imports: [
        ScrollingModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});