import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  subject = new Subject<boolean>();
  layoutChange = this.subject.asObservable();
  isDesktop: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isDesktop = false;
    this.breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.TabletLandscape
    ]).subscribe(result => {

      this.isDesktop = result.matches;
      this.subject.next(result.matches);

    });
  }
}
