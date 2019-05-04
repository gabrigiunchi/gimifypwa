import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {AssetKind} from 'src/app/model/entities/asset-kind';
import {CONSTANTS} from 'src/app/constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetKindService {

  constructor(private http: HttpClient, private urlService: UrlService) {}

  get assetKinds(): Observable<AssetKind[]> {
    return this.http.get<AssetKind[]>(this.urlService.getRestUrl(CONSTANTS.ASSET_KINDS), this.urlService.authenticationHeader);
  }
}
