import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultPageComponent} from './result-page.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {MatCardModule, MatIconModule, MatProgressSpinnerModule, MatTabsModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResultMapComponent} from './result-map/result-map.component';
import {ResultListComponent} from './result-list/result-list.component';
import {LoadingComponent} from '../../layout/loading/loading.component';
import {ResultListItemComponent} from './result-list/result-list-item/result-list-item.component';
import {AssetKindNamePipe} from 'src/app/pipes/asset-kind-name.pipe';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MessageComponent} from '../../layout/message/message.component';
import {AgmCoreModule} from '@agm/core';

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultPageComponent,
        ToolbarComponent,
        ResultListComponent,
        LoadingComponent,
        ResultMapComponent,
        ResultListItemComponent,
        AssetKindNamePipe,
        MessageComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        ScrollingModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBiClW-tzn_XUpFDNs6c5PjwGtE61xaW6A'
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
