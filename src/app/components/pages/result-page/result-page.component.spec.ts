import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultPageComponent} from './result-page.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {MatIconModule, MatTabsModule, MatToolbarModule, MatProgressSpinnerModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResultMapComponent} from './result-map/result-map.component';
import {ResultListComponent} from './result-list/result-list.component';
import {LoadingComponent} from '../../layout/loading/loading.component';

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
        ResultMapComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule
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
