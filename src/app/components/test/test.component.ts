import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})

export class TestComponent implements OnInit {

    pictureData: any = null;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getPictureOfTheDay().then(data => {
      this.pictureData = data;
    });
  }

  get pictureDate(){
      return this.pictureData.date;
  }

  get pictureUrl(){
      return this.pictureData.url;
  }

  get pictureHdUrl(){
      return this.pictureData.hdurl;
  }

  get isImage(){
      return 'media_type' === this.pictureData.media_type;
  }
}
