import { Component } from '@angular/core';
// import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-picture-shower',
  templateUrl: './picture-shower.component.html'
})

export class PictureShower {
  formGroup: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      'datuh': ['', Validators.required]
    }, {updateOn: 'blur'})
  }

  public getImageData() {
    this.dataService.getPictureOfTheDay(new Date).then((data) => {
      console.warn( data );
    });
  }
}
