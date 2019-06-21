import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaMapsComponent } from './nasa-maps.component';

describe('NasaMapsComponent', () => {
  let component: NasaMapsComponent;
  let fixture: ComponentFixture<NasaMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasaMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasaMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
