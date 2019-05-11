import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultListComponent} from './result-list.component';
import {ResultListItemComponent} from './result-list-item/result-list-item.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCardModule} from '@angular/material';
import {AssetKindNamePipe} from 'src/app/pipes/asset-kind-name.pipe';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultListComponent,
         ResultListItemComponent,
         AssetKindNamePipe
        ],
      imports: [
        ScrollingModule,
        MatCardModule
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
