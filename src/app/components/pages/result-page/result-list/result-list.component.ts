import {Component, OnInit, Input} from '@angular/core';
import {Asset} from 'src/app/model/entities/asset';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  @Input() result: Asset[];

  constructor() {}

  ngOnInit() {
    console.log(this.result);
  }

}
