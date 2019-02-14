import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  message = '';

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.greetings().subscribe(e => {
      console.log(e);
      this.message = e.message;
    });
  }

}
