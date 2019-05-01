import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url.service';
import {Observable} from 'rxjs';
import {Asset} from 'src/app/model/entities/asset';
import {CONSTANTS} from 'src/app/constants';
import {Gym} from 'src/app/model/entities/gym';
import {Page} from 'src/app/model/page';
import {AssetKind} from 'src/app/model/entities/asset-kind';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient, private urlService: UrlService) {}

  getAssets(page: number, size: number): Observable<Page<Asset>> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.ASSETS}/page/${page}/size/${size}`);
    return this.http.get<Page<Asset>>(this.urlService.getRestUrl(url), this.urlService.authenticationHeader);
  }

  getAssetById(id: number): Observable<Asset> {
    return this.http.get<Asset>(this.urlService.getRestUrl(`${CONSTANTS.ASSETS}/${id}`), this.urlService.authenticationHeader);
  }

  getAssetsByGym(gym: Gym, page: number, size: number): Observable<Page<Asset>> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.ASSETS}/by_gym/${gym.id}/page/${page}/size/${size}`);
    return this.http.get<Page<Asset>>(url, this.urlService.authenticationHeader);
  }

  getAssetsByKind(kind: AssetKind, page: number, size: number): Observable<Page<Asset>> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.ASSETS}/by_kind/${kind.id}/page/${page}/size/${size}`);
    return this.http.get<Page<Asset>>(url, this.urlService.authenticationHeader);
  }

  getAssetsByGymAndKind(gym: Gym, kind: AssetKind): Observable<Asset[]> {
    const url = this.urlService.getRestUrl(`${CONSTANTS.ASSETS}/by_gym/${gym.id}/by_kind/${kind.id}`);
    return this.http.get<Asset[]>(url, this.urlService.authenticationHeader);
  }
}
