import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaPhotoViewer } from './nasa-photo-viewer.component';

describe('NasaPhotoViewer', () => {
  let component: NasaPhotoViewer;
  let fixture: ComponentFixture<NasaPhotoViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasaPhotoViewer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasaPhotoViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
