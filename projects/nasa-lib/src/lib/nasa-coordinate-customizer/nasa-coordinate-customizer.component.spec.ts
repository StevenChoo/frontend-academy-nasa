import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaCoordinateCustomizerComponent } from './nasa-coordinate-customizer.component';

describe('NasaCoordinateCustomizerComponent', () => {
  let component: NasaCoordinateCustomizerComponent;
  let fixture: ComponentFixture<NasaCoordinateCustomizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasaCoordinateCustomizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasaCoordinateCustomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
