import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSummary } from './month-summary';

describe('RecapitulatifDuMoisComponent', () => {
  let component: MonthSummary;
  let fixture: ComponentFixture<MonthSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
