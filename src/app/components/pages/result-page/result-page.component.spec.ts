import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultPageComponent} from './result-page.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolbarComponent} from '../../layout/toolbar/toolbar.component';
import {MatIconModule, MatTabsModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultPageComponent, ToolbarComponent],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        MatToolbarModule,
        MatIconModule,
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
