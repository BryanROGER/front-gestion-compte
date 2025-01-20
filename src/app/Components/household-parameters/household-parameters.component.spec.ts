import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdParametersComponent } from './household-parameters.component';

describe('HouseholdParametersComponent', () => {
  let component: HouseholdParametersComponent;
  let fixture: ComponentFixture<HouseholdParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseholdParametersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
