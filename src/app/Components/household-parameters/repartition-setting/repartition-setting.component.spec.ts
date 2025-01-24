import { ComponentFixture, TestBed } from '@angular/core/testing';

import { repartitionSettingComponent } from './repartition-setting.component';

describe('GapSettingComponent', () => {
  let component: repartitionSettingComponent;
  let fixture: ComponentFixture<repartitionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [repartitionSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(repartitionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
