import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url: string): SafeUrl {
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/')) : '';
  }

}
