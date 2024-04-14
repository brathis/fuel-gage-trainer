import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelGageComponent } from './fuel-gage.component';

describe('FuelGageComponent', () => {
  let component: FuelGageComponent;
  let fixture: ComponentFixture<FuelGageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelGageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelGageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
