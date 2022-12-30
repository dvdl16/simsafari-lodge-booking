import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailsMapComponent } from './trailsmap.component';

describe('TrailsMapComponent', () => {
  let component: TrailsMapComponent;
  let fixture: ComponentFixture<TrailsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
