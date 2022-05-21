import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingsComponent } from './sightings.component';

describe('SightingsComponent', () => {
  let component: SightingsComponent;
  let fixture: ComponentFixture<SightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
