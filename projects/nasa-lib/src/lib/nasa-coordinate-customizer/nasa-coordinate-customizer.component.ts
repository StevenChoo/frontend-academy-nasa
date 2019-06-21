import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NasaLibService } from '../nasa-service/nasa-lib.service';

@Component({
  selector: 'nasa-coordinate-customizer',
  templateUrl: './nasa-coordinate-customizer.component.html',
  styles: []
})
export class NasaCoordinateCustomizerComponent implements OnInit {
  formGroup: FormGroup;

  @Input() latitude: number;
  @Input() longitude: number;

  constructor(private nasaService: NasaLibService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      latitude: new FormControl(this.latitude),
      longitude: new FormControl(this.longitude)
    });
  }

  locate(): void {
    this.nasaService.updateCoordinates(this.formGroup.value);
  }
}
