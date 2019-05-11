import {Component, Input} from '@angular/core';
import {Asset} from 'src/app/model/entities/asset';

@Component({
  selector: 'app-result-map',
  templateUrl: './result-map.component.html',
  styleUrls: ['./result-map.component.css']
})
export class ResultMapComponent {

  @Input() result: Asset[] = [];
  @Input() date: string;
  @Input() from: string;
  @Input() to: string;

}
