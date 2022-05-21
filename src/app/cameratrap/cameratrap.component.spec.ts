import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameratrapComponent } from './cameratrap.component';

describe('CameratrapComponent', () => {
  let component: CameratrapComponent;
  let fixture: ComponentFixture<CameratrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameratrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameratrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
