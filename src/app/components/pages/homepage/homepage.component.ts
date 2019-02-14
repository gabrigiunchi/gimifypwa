import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  message = '';
  readonly version = CONSTANTS.VERSION;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.greetings().subscribe(e => {
      console.log(e);
      this.message = e.message;
    });
  }

}
