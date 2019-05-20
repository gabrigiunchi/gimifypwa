import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {AgmMap, LatLngLiteral} from '@agm/core';
import {CONSTANTS} from 'src/app/constants';
import {Gym} from 'src/app/model/entities/gym';
import {Reservation} from 'src/app/model/entities/reservation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnDestroy, AfterViewInit {

  readonly myPositionIcon = CONSTANTS.MY_POSITION_ICON;

  @Input() gyms: Gym[] = [];
  @Output() gymClick = new EventEmitter<Gym>();
  @Input() gymIcon = CONSTANTS.PLACE_ICON;

  @Input() reservations: Reservation[] = [];
  @Output() reservationClick = new EventEmitter<Reservation>();
  @Input() reservationIcon = CONSTANTS.PLACE_ICON;

  @Input() height = '100%';
  @Input() showMyPositionControl = true;
  @Input() fitBounds = true;
  @ViewChild(AgmMap) map: AgmMap;
  myPosition: LatLngLiteral;
  @Input() lat = 45.006273;
  @Input() lng = 10.603579;
  private watchId: number; // subscription to navigator.geolocation

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

  onGymCLick(gym: Gym) {
    this.gymClick.emit(gym);
  }

  onReservationCLick(reservation: Reservation) {
    this.reservationClick.emit(reservation);
  }

  centerMapToCurrentLocation() {
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
}
