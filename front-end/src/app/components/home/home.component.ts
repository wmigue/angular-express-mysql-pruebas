import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-donacion-solicitud',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public totales: number;
  public totalesFinales: number;

  public donacionesTotales: number;
  constructor() {
  }

  ngOnInit() {

  }
}
