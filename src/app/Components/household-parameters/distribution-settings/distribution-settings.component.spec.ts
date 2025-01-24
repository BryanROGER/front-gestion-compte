import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionSettingsComponent } from './distribution-settings.component';

describe('DistributionSettingsComponent', () => {
  let component: DistributionSettingsComponent;
  let fixture: ComponentFixture<DistributionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributionSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
