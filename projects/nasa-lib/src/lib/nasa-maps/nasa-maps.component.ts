import { Component } from '@angular/core';
import { NasaLibService, Coordinates } from '../nasa-service/nasa-lib.service';

@Component({
  selector: 'nasa-maps',
  templateUrl: './nasa-maps.component.html',
  styles: []
})
export class NasaMapsComponent {

  constructor(
    private nasaService: NasaLibService
  ) { }

  get coordinates(): Coordinates {
    return this.nasaService.getCoordinates();
  }

}
