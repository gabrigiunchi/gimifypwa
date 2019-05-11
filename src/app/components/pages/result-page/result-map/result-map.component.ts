import {Asset} from 'src/app/model/entities/asset';
import {Gym} from 'src/app/model/entities/gym';
import {OnChanges, Input, Component, SimpleChanges, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {LatLngLiteral, AgmMap} from '@agm/core';
import {CONSTANTS} from 'src/app/constants';

@Component({
  selector: 'app-result-map',
  templateUrl: './result-map.component.html',
  styleUrls: ['./result-map.component.css']
})
export class ResultMapComponent implements OnChanges, AfterViewInit, OnDestroy {

  readonly myPositionIcon = CONSTANTS.MY_POSITION_ICON;
  readonly placeIcon = CONSTANTS.PLACE_ICON;

  @Input() result: Asset[] = [];
  @Input() date: string;
  @Input() from: string;
  @Input() to: string;

  gyms: Gym[] = [];
  @ViewChild(AgmMap) map: AgmMap;
  myPosition: LatLngLiteral;
  lat = 45.006273;
  lng = 10.603579;
  private watchId: number; // subscription to navigator.geolocation

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['result']) {
      this.gyms = this.getGyms(this.result);
    }
  }

  ngAfterViewInit() {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.updatePosition(position));
      this.watchId = navigator.geolocation.watchPosition(
        position => this.updatePosition(position),
        error => console.log('Error watching position: ', error),
        {
          maximumAge: 0,
          enableHighAccuracy: true,
          timeout: 5000 // 5 seconds
        });
    } else {
      console.log('Geolocator not available');
    }
  }

  ngOnDestroy() {
    if (this.watchId) {
      window.navigator.geolocation.clearWatch(this.watchId);
    }
  }

  onGymClick(gym: Gym) {
    const assetsInGym = this.result.filter(asset => asset.gym.id === gym.id);
    console.log(assetsInGym);
  }

  private centerMapToCurrentLocation() {
    if (this.myPosition) {
      this.lat = this.myPosition.lat;
      this.lng = this.myPosition.lng;
      this.map.triggerResize();
    } else {
      console.log('Could not locate user');
    }
  }

  private updatePosition(position: Position) {
    console.log('Current position: ', position);
    this.myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
  }

  private getGyms(assets: Asset[]): Gym[] {
    const map = new Map<number, Gym>();

    assets.map(a => a.gym).forEach(gym => {
      if (!map.has(gym.id)) {
        map.set(gym.id, gym);
      }
    });

    return Array.from(map.values());
  }
}
