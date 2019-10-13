import { Component, OnInit } from '@angular/core';
import {faWheelchair} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-euc-main',
  templateUrl: './euc-main.component.html',
  styleUrls: ['./euc-main.component.scss']
})
export class EucMainComponent implements OnInit {

  faWheel = faWheelchair;

  constructor() { }

  ngOnInit() {
  }

}
