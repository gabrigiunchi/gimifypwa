import {Component, Input} from '@angular/core';
import {Asset} from 'src/app/model/entities/asset';

@Component({
  selector: 'app-result-list-item',
  templateUrl: './result-list-item.component.html',
  styleUrls: ['./result-list-item.component.css']
})
export class ResultListItemComponent {

  @Input() asset: Asset;
}
